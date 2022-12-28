import React from "react";

type Props = {
  rating: number;
};

const Stars = ({ rating }: Props) => {
  console.log(rating);
  return (
    <div className="rating rating-xs rating-half">
      <input type="radio" className="rating-hidden" checked={rating === 0} />
      <input
        type="radio"
        className="mask mask-half-1 mask-star-2 bg-accent"
        checked={rating === 0.5}
      />
      <input
        type="radio"
        className="mask mask-half-2 mask-star-2 bg-accent"
        checked={rating === 1}
      />
      <input
        type="radio"
        className="mask mask-half-1 mask-star-2 bg-accent"
        checked={rating === 1.5}
      />
      <input
        type="radio"
        className="mask mask-half-2 mask-star-2 bg-accent"
        checked={rating === 2}
      />
      <input
        type="radio"
        className="mask mask-half-1 mask-star-2 bg-accent"
        checked={rating === 2.5}
      />
      <input
        type="radio"
        className="mask mask-half-2 mask-star-2 bg-accent"
        checked={rating === 3}
      />
      <input
        type="radio"
        className="mask mask-half-1 mask-star-2 bg-accent"
        checked={rating === 3.5}
      />
      <input
        type="radio"
        className="mask mask-half-2 mask-star-2 bg-accent"
        checked={rating === 4}
      />
      <input
        type="radio"
        className="mask mask-half-1 mask-star-2 bg-accent"
        checked={rating === 4.5}
      />
      <input
        type="radio"
        className="mask mask-half-2 mask-star-2 bg-accent"
        checked={rating === 5}
      />
    </div>
  );
};

export default Stars;
