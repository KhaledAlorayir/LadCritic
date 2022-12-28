import ReviewForm from "components/create/ReviewForm";
import SelectGame from "components/create/SelectGame";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { RawgGame } from "utils/types";
import { trpc } from "utils/trpc";

type Props = {};

const create = (props: Props) => {
  const { status } = useSession({ required: true });
  const [selectedGame, setSelectedGame] = useState<RawgGame>();
  const { mutate, isLoading, isSuccess } =
    trpc.review.createReview.useMutation();

  const createReviewHandler = (body: string, rating: number) => {
    if (selectedGame) {
      mutate({
        game: selectedGame,
        review: {
          body,
          rating,
        },
      });
    }
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <progress className="progress progress-primary w-1/2"></progress>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <h3 className="text-3xl">Review has been created!</h3>
      </div>
    );
  }

  return (
    <div className="flex flex-1 items-center justify-center">
      <div className="w-full">
        <SelectGame setSelectedGame={setSelectedGame} />
        {selectedGame && (
          <ReviewForm createReviewHandler={createReviewHandler} />
        )}
      </div>
    </div>
  );
};

export default create;
