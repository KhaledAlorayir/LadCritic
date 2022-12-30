import { Game } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime";
import { Dispatch, SetStateAction } from "react";
import ReviewCard from "./ReviewCard";

type Props = {
  isSuccess: boolean;
  isLoading: boolean;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
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

const ReviewList = ({ isLoading, isSuccess, data, page, setPage }: Props) => {
  if (isLoading) {
    return (
      <div className="py-10 text-center">
        <progress className="progress progress-primary w-1/2"></progress>
      </div>
    );
  }

  return (
    <>
      {isSuccess && data && (
        <div className="py-20">
          <div className="mb-10 grid grid-cols-1 content-center justify-items-center gap-y-8 gap-x-2 sm:grid-cols-2 md:mb-16 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {data.reviews.map((r) => (
              <ReviewCard review={r} key={r.id} />
            ))}
          </div>
          <div className="btn-group mx-auto grid max-w-xl grid-cols-2">
            <button
              onClick={() => setPage((p) => p - 1)}
              className={`btn-outline btn ${page === 0 ? "btn-disabled" : ""}`}
            >
              Previous page
            </button>
            <button
              onClick={() => setPage((p) => p + 1)}
              className={`btn-outline btn ${
                page >= data.total_pages - 1 ? "btn-disabled" : ""
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewList;
