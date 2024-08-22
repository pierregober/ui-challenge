/** Custom Components */
import GalleryList from "../cards/GalleryList";

import { Box, Flex } from "@radix-ui/themes";

/** Types*/
import type { IMovieDetails } from "@/src/types";

export default function Gallery({
  loading,
  movies,
}: {
  loading: boolean;
  movies: IMovieDetails[];
}) {
  return (
    <>
      <GalleryList movies={movies} />
    </>
  );
}
