import { Game } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime";
import Stars from "./Stars";

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
  return (
    <div className="card-compact card bg-base-100 shadow-xl sm:w-48 md:w-52 lg:w-56">
      <figure>
        <img src={review.game.img || ""} alt={review.game.name} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{review.game.name}</h2>
        <p>by: {review.user.name}</p>
        <Stars rating={Number(review.rating)} />
        <div className="card-actions mt-2">
          <button className="btn-primary btn-sm btn">Review</button>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
