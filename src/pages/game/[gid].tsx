import { GetServerSideProps } from "next";
import { z } from "zod";
import { prisma } from "server/db/client";
import { Game } from "@prisma/client";
import { useState } from "react";
import { trpc } from "utils/trpc";
import ReviewList from "components/shared/ReviewList";

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  const validated = z.object({ gid: z.string().cuid() }).safeParse(query);

  if (!validated.success) {
    return {
      notFound: true,
    };
  }

  const game = await prisma.game.findUnique({
    where: {
      id: validated.data.gid,
    },
  });

  if (!game) {
    return {
      notFound: true,
    };
  }
  return {
    props: { game: JSON.parse(JSON.stringify(game)) },
  };
};

type Props = {
  game: Game;
};

const Game = ({ game }: Props) => {
  const [page, setPage] = useState(0);
  const { data, isLoading, isSuccess } = trpc.review.gameReviews.useQuery({
    gameId: game.id,
    page,
  });

  return (
    <div className="py-12">
      <div className="space-y-1 text-center">
        <h4 className="text-2xl font-bold">{game.name}</h4>
        <p className="text-gray-300">({game.released})</p>
      </div>
      <ReviewList
        data={data}
        isLoading={isLoading}
        isSuccess={isSuccess}
        page={page}
        setPage={setPage}
      />
    </div>
  );
};

export default Game;
