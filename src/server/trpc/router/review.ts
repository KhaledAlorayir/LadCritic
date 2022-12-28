import { router, publicProcedure, protectedProcedure } from "../trpc";
import { createReviewSchema } from "utils/schemas";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

const PER_PAGE = 10;

export const reviewRouter = router({
  createReview: protectedProcedure
    .input(createReviewSchema)
    .mutation(async ({ input, ctx }) => {
      const { name, id, slug, background_image, released, genres } = input.game;
      const { body, rating } = input.review;

      const review = await ctx.prisma.review.findFirst({
        where: {
          userId: ctx.session.user.id,
          game: {
            rawgId: id,
          },
        },
      });

      if (review) {
        throw new TRPCError({
          message: "game has been reviewd",
          code: "BAD_REQUEST",
        });
      }

      const genresdb = await ctx.prisma.genre.findMany({
        where: {
          rawgId: {
            in: genres.map((g) => g.id),
          },
        },
        select: {
          id: true,
        },
      });

      const game = await ctx.prisma.game.upsert({
        create: {
          name,
          rawgId: id,
          slug,
          img: background_image,
          released,
          genres: { create: genresdb.map((g) => ({ genreId: g.id })) },
        },
        update: {},
        where: {
          rawgId: input.game.id,
        },
      });

      return ctx.prisma.review.create({
        data: {
          body,
          rating,
          gameId: game.id,
          userId: ctx.session.user.id,
        },
      });
    }),

  userReviews: publicProcedure
    .input(
      z.object({ userId: z.string().cuid(), page: z.number().nonnegative() })
    )
    .query(async ({ ctx, input }) => {
      const { userId, page } = input;
      const user = await ctx.prisma.user
        .findUniqueOrThrow({
          where: {
            id: userId,
          },
          include: {
            reviews: {
              take: PER_PAGE,
              skip: page * PER_PAGE,
              orderBy: {
                created_at: "desc",
              },
              include: {
                game: true,
              },
            },
            _count: {
              select: {
                reviews: true,
              },
            },
          },
        })
        .catch(() => {
          throw new TRPCError({
            message: "invalid user id",
            code: "BAD_REQUEST",
          });
        });

      const parsedUser = { name: user.name, image: user.image };
      const parsedReviews = user.reviews.map((r) => ({
        ...r,
        user: parsedUser,
      }));
      return {
        page,
        reviews: parsedReviews,
        total_pages: Math.ceil(user._count.reviews / PER_PAGE),
      };
    }),
});
