import { RawgGame } from "utils/types";
import { resize } from "utils/helpers";
import Image from "next/image";

type Props = {
  game: RawgGame;
};

const SelectGameCard = ({
  game: { name, background_image, released },
}: Props) => {
  const year = released?.split("-")[0];

  return (
    <div className="flex items-center gap-2 bg-base-300 px-2 py-3">
      {background_image && (
        <div className="relative h-10 w-16 overflow-hidden rounded-md">
          <Image
            src={resize(background_image, 640)}
            alt={name}
            fill={true}
            sizes=""
          />
        </div>
      )}
      <p>
        <span className="font-semibold">{name} </span>
        {year && <span>({year})</span>}
      </p>
    </div>
  );
};

export default SelectGameCard;
