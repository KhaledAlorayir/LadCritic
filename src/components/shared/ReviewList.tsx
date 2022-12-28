import { Game } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime";
import ReviewCard from "./ReviewCard";

type Props = {
  isSuccess: boolean;
  isLoading: boolean;
  data:
    | {
        page: number;
        reviews: {
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
        }[];
        total_pages: number;
      }
    | undefined;
};

const ReviewList = ({ isLoading, isSuccess, data }: Props) => {
  if (isLoading) {
    return (
      <div className="py-10 text-center">
        <progress className="progress progress-primary w-1/2"></progress>
      </div>
    );
  }

  return (
    <>
      {isSuccess && (
        <div className="py-20">
          <div className="grid grid-cols-1 content-center justify-items-center gap-y-8  gap-x-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {data!.reviews.map((r) => (
              <ReviewCard review={r} key={r.id} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewList;
