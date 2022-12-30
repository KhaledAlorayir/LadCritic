import { GetServerSideProps } from "next";
import { prisma } from "server/db/client";
import { z } from "zod";
import { Review, Game, GameGenre, Genre } from "@prisma/client";
import Link from "next/link";
import Stars from "components/shared/Stars";
import Genres from "components/shared/Genres";

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const validated = z.object({ rid: z.string().cuid() }).safeParse(query);

  if (!validated.success) {
    return {
      notFound: true,
    };
  }

  const review = await prisma.review.findUnique({
    where: {
      id: validated.data.rid,
    },
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
      game: {
        include: {
          genres: {
            include: {
              genre: true,
            },
          },
        },
      },
    },
  });

  if (!review) {
    return {
      notFound: true,
    };
  }
  return { props: { review: JSON.parse(JSON.stringify(review)) } };
};

type Props = {
  review: Review & {
    user: {
      name: string | null;
      image: string | null;
    };
    game: Game & {
      genres: (GameGenre & {
        genre: Genre;
      })[];
    };
  };
};

const Review = ({ review }: Props) => {
  return (
    <div className="py-12">
      <div className="space-y-1 text-center">
        <h4 className="text-2xl font-bold">{review.game.name}</h4>
        <p className="text-gray-300">({review.game.released})</p>
        <div className="py-4">
          <Genres genres={review.game.genres} />
        </div>
      </div>
      <div className="mx-auto my-8 max-w-xl space-y-2 overflow-hidden rounded-lg">
        <img
          alt={review.game.name}
          src={review.game.img || ""}
          className="h-full w-full"
        />
        <div className="flex justify-between">
          <p>
            by:{" "}
            <Link className="text-primary" href={`/user/${review.userId}`}>
              {review.user.name}
            </Link>
          </p>
          <Stars rating={Number(review.rating)} />
        </div>
      </div>
      <p className="my-12 mx-auto max-w-xl">{review.body}</p>
    </div>
  );
};

export default Review;
