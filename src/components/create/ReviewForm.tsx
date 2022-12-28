import { useForm } from "react-hook-form";

type Props = {
  createReviewHandler: (body: string, rating: number) => void;
};

const ReviewForm = ({ createReviewHandler }: Props) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    values: {
      body: "",
      rating: "0",
    },
  });
  const submitHandler = (values: { body: string; rating: string }) => {
    if (!values.body.trim()) {
      setError("body", { message: "review is empty", type: "required" });
      return;
    }
    createReviewHandler(values.body, parseFloat(values.rating));
  };

  return (
    <form
      className="my-8 mx-auto max-w-xl  text-center"
      onSubmit={handleSubmit(submitHandler)}
    >
      <div className="mb-4">
        <textarea
          className="textarea-primary textarea w-full resize-none"
          rows={15}
          placeholder="write your review!"
          {...register("body", {
            required: {
              value: true,
              message: "review is empty!",
            },
            minLength: {
              value: 3,
              message: "review should be between 3-5000 characters",
            },
            maxLength: {
              value: 5000,
              message: "review should be between 3-5000 characters",
            },
            onChange(event) {},
          })}
        ></textarea>
        {errors.body && (
          <p className="my-4 font-semibold text-error">
            - {errors.body.message}
          </p>
        )}
      </div>
      <div className="rating rating-md rating-half mb-8">
        <input
          type="radio"
          {...register("rating")}
          className="rating-hidden"
          value={0}
        />
        <input
          type="radio"
          {...register("rating")}
          className="mask mask-half-1 mask-star-2 bg-accent"
          value={0.5}
        />
        <input
          type="radio"
          {...register("rating")}
          className="mask mask-half-2 mask-star-2 bg-accent"
          value={1}
        />
        <input
          type="radio"
          {...register("rating")}
          className="mask mask-half-1 mask-star-2 bg-accent"
          value={1.5}
        />
        <input
          type="radio"
          {...register("rating")}
          className="mask mask-half-2 mask-star-2 bg-accent"
          value={2}
        />
        <input
          type="radio"
          {...register("rating")}
          className="mask mask-half-1 mask-star-2 bg-accent"
          value={2.5}
        />
        <input
          type="radio"
          {...register("rating")}
          className="mask mask-half-2 mask-star-2 bg-accent"
          value={3}
        />
        <input
          type="radio"
          {...register("rating")}
          className="mask mask-half-1 mask-star-2 bg-accent"
          value={3.5}
        />
        <input
          type="radio"
          {...register("rating")}
          className="mask mask-half-2 mask-star-2 bg-accent"
          value={4}
        />
        <input
          type="radio"
          {...register("rating")}
          className="mask mask-half-1 mask-star-2 bg-accent"
          value={4.5}
        />
        <input
          type="radio"
          {...register("rating")}
          className="mask mask-half-2 mask-star-2 bg-accent"
          value={5}
        />
      </div>
      <div>
        <button className="btn-outline btn-primary btn w-full">
          submit review!
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
