"use client";

import React, { useEffect, useState } from "react";

/** Vendors */
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Skeleton,
  Text,
} from "@radix-ui/themes";

/** Helpers */
import { formatDateToLong, getBySlug } from "@/src/app/dist/js/helpers";

/** Custom Hooks */
import useWindowSize from "@/hooks/useWindowSize";

/** Types */
import type { IMovieDetails } from "@/src/types";

/** Mock Values */
import data from "@/mock/data";

export default function MovieDetails(): React.ReactElement {
  const [movie, setMovie] = useState<IMovieDetails | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const { height, width } = useWindowSize();

  const isLarge = width && width >= 1250;

  useEffect(() => {
    const location = pathname.split("/")[1];
    const details = getBySlug(location, data().items);

    if (details) {
      setMovie(details);
    } else {
      throw new Error(
        "404: We're having a hard time finding that particular movie!"
      );
    }
  }, [pathname]);

  const handleError = () => {
    if (typeof window !== "undefined") {
      throw new Error(
        "404: We're having a hard time finding that particular movie!"
      );
    }
  };

  return (
    <Container size={isLarge ? "4" : "3"} height={`calc(${height}px - 63px)`}>
      <Flex
        direction={width && width < 930 ? "column" : "row"}
        p="9"
        gap="6"
        width="100%"
        justify="center"
        align="center"
      >
        <Box>
          <div style={{ position: "relative", height: 530, width: 400 }}>
            {movie ? (
              <Image
                alt={movie.title}
                className="movie-detail-image"
                fill
                loading="lazy"
                onError={handleError}
                src={`/${movie.image}`}
                style={{ borderRadius: "4px", maxHeight: 800, maxWidth: 530 }}
              />
            ) : (
              <Skeleton height="100%" width="100%" />
            )}
          </div>
        </Box>
        <Box
          className="movie-detail-image"
          style={{
            borderRadius: "4px",
            minWidth: 400,
            width: 400,
          }}
          p="3"
        >
          {movie ? (
            <Flex direction="column" gap="3">
              <Heading>{movie.title}</Heading>
              <Flex gap="1">
                <Text weight="bold">Slug:</Text>
                <Text>{movie.slug}</Text>
              </Flex>
              <Flex gap="1">
                <Text weight="bold">Release Date:</Text>
                <Text>{formatDateToLong(movie.date)}</Text>
              </Flex>
              <Flex gap="1">
                <Text weight="bold">Rating:</Text>
                <Text>{movie.rating.toUpperCase()}</Text>
              </Flex>
              <Flex gap="1">
                <Text weight="bold">Length:</Text>
                <Text>{Math.ceil(movie.run_time / 60)} minutes</Text>
              </Flex>
            </Flex>
          ) : null}
        </Box>
      </Flex>
      <Flex align="center" justify="center">
        <Button
          variant="solid"
          radius="full"
          size="3"
          onClick={() => router.push("/")}
        >
          Go Back
        </Button>
      </Flex>
    </Container>
  );
}
