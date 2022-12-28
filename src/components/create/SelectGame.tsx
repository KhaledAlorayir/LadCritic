import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import { Dispatch, SetStateAction, useState } from "react";
import useSearchGames from "utils/hooks/useSearchGames";
import { RawgGame } from "utils/types";
import SelectGameCard from "./SelectGameCard";

type Props = {
  setSelectedGame: Dispatch<SetStateAction<RawgGame | undefined>>;
};

const SelectGame = ({ setSelectedGame }: Props) => {
  const [query, setQuery] = useState<string>("");
  const { data, isSuccess, isFetching } = useSearchGames(query);

  const selectHandler = (name: string) => {
    if (isSuccess) {
      const game = data.find((game) => game.name === name);
      setSelectedGame(game);
    }
  };

  return (
    <div>
      <Combobox onSelect={selectHandler} className="text-center">
        <div className="indicator w-full max-w-xl">
          {isFetching && (
            <span className="badge indicator-center  indicator-item indicator-top">
              Loading...
            </span>
          )}
          <ComboboxInput
            className="input-bordered input-primary input w-full"
            placeholder="Select the game"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <ComboboxPopover>
          {isSuccess && (
            <ComboboxList>
              {data.map((game) => (
                <ComboboxOption key={game.id} value={game.name}>
                  <SelectGameCard game={game} />
                </ComboboxOption>
              ))}
            </ComboboxList>
          )}
        </ComboboxPopover>
      </Combobox>
    </div>
  );
};

export default SelectGame;
