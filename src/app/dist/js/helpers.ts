/** Types */
import type { IMovieDetails } from "@/types/movie"

const getBySlug = (slug: string, data: IMovieDetails[]) => {
  const foundMovie = data.filter((item) => {
    return item.slug === slug
  })
  if (!foundMovie.length) return null;
  return foundMovie[0]
}

const formatDateToLong = (date: string) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export {
  formatDateToLong,
  getBySlug
}
