import { Game } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime";
import Link from "next/link";
import Stars from "./Stars";
import { trpc } from "utils/trpc";
import { useSession } from "next-auth/react";

type Props = {
  review: {
    user: {
      name: string | null;
      image: string | null;
    };
    id: string;
    body: string;
    rating: Decimal;
    created_at: Date;
    updated_at: Date;
    userId: string;
    gameId: string;
    game: Game;
  };
};

const ReviewCard = ({ review }: Props) => {
  const context = trpc.useContext();
  const { data } = useSession();
  const { mutate } = trpc.review.deleteReview.useMutation({
    onSuccess() {
      context.review.userReviews.invalidate();
    },
  });

  return (
    <div className="card-compact card bg-base-100 shadow-xl sm:w-48 md:w-52 lg:w-56">
      <figure>
        <img src={review.game.img || ""} alt={review.game.name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          <Link href={`/game/${review.gameId}`}>{review.game.name}</Link>
        </h2>
        <p>
          by:{" "}
          <Link className="text-primary" href={`/user/${review.userId}`}>
            {review.user.name}
          </Link>
        </p>
        <Stars rating={Number(review.rating)} />
        <div className="card-actions mt-5">
          <Link
            href={`/review/${review.id}`}
            className="btn-outline btn-primary btn-xs btn"
          >
            Review
          </Link>
          {data?.user?.id === review.userId && (
            <button
              onClick={() => mutate(review.id)}
              className="btn-outline btn-error btn-xs btn"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
