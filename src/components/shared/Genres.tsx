import { GameGenre, Genre } from "@prisma/client";

type Props = {
  genres: (GameGenre & {
    genre: Genre;
  })[];
};

const Genres = ({ genres }: Props) => {
  return (
    <div className="flex flex-wrap justify-center gap-y-2 space-x-2">
      {genres.map((g) => (
        <p
          key={g.genreId}
          className="w-24 rounded bg-primary-focus py-1 font-semibold"
        >
          {g.genre.name}
        </p>
      ))}
    </div>
  );
};

export default Genres;
