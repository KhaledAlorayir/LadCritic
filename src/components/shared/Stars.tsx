import React from "react";

type Props = {
  rating: number;
};

const Stars = ({ rating }: Props) => {
  return (
    <div className="rating rating-sm rating-half">
      <input
        type="radio"
        className="rating-hidden"
        checked={rating === 0}
        readOnly
      />
      <input
        type="radio"
        className="mask mask-half-1 mask-star-2 bg-accent"
        checked={rating === 0.5}
        readOnly
      />
      <input
        type="radio"
        className="mask mask-half-2 mask-star-2 bg-accent"
        checked={rating === 1}
        readOnly
      />
      <input
        type="radio"
        className="mask mask-half-1 mask-star-2 bg-accent"
        checked={rating === 1.5}
        readOnly
      />
      <input
        type="radio"
        className="mask mask-half-2 mask-star-2 bg-accent"
        checked={rating === 2}
        readOnly
      />
      <input
        type="radio"
        className="mask mask-half-1 mask-star-2 bg-accent"
        checked={rating === 2.5}
        readOnly
      />
      <input
        type="radio"
        className="mask mask-half-2 mask-star-2 bg-accent"
        checked={rating === 3}
        readOnly
      />
      <input
        type="radio"
        className="mask mask-half-1 mask-star-2 bg-accent"
        checked={rating === 3.5}
        readOnly
      />
      <input
        type="radio"
        className="mask mask-half-2 mask-star-2 bg-accent"
        checked={rating === 4}
        readOnly
      />
      <input
        type="radio"
        className="mask mask-half-1 mask-star-2 bg-accent"
        checked={rating === 4.5}
        readOnly
      />
      <input
        type="radio"
        className="mask mask-half-2 mask-star-2 bg-accent"
        checked={rating === 5}
        readOnly
      />
    </div>
  );
};

export default Stars;
