/** Vendors */
import { Flex } from "@radix-ui/themes";

/** Custom Components */
import GalleryCard from "./GalleryCard";

/** Types*/
import { IMovieDetails } from "@/src/types";

export default function List({ movies }: { movies: IMovieDetails[] }) {
  return (
    <Flex wrap="wrap" gap="5" align="center" justify="center">
      {movies?.map((movie) => {
        return <GalleryCard key={movie.slug} movie={movie} />;
      })}
    </Flex>
  );
}
