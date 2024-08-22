"use client";

import { useEffect, useState } from "react";

/** Vendors */
import {
  Box,
  Button,
  Container,
  Flex,
  Separator,
  Text,
  TextField,
} from "@radix-ui/themes";

/** Custom Components */
import Gallery from "./components/gallery/views/Gallery";

/** Icons */
import {
  ArrowUpIcon,
  ArrowDownIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";

/** Custom Hooks */
import useWindowSize from "@/hooks/useWindowSize";

/** Mock */
import data from "@/mock/data";

/** Types*/
import type { IMovieDetails } from "../types";

interface IHomeSettings {
  date: "asc" | "desc" | null;
  name: "asc" | "desc" | null;
}

const DirectionIcon = ({
  type,
  settings,
}: {
  type: "date" | "name";
  settings: IHomeSettings;
}) => {
  if (!settings[type]) return null;
  return settings[type] === "asc" ? <ArrowUpIcon /> : <ArrowDownIcon />;
};

// Made it so you could adjust later with size but there is no ui that controls it, yet
const chunkArray = (array: IMovieDetails[], size: number) => {
  const chunkedArr = [];
  for (let i = 0; i < array.length; i += size) {
    chunkedArr.push(array.slice(i, i + size));
  }
  return chunkedArr;
};

export default function Home() {
  const [movies, setMovies] = useState<IMovieDetails[]>(data().items);
  const [filteredMovies, setFilteredMovies] = useState<IMovieDetails[][]>([]);
  const [displayedChunks, setDisplayedChunks] = useState<number>(1);
  const [settings, setSettings] = useState<IHomeSettings>({
    date: null,
    name: null,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const { height, width } = useWindowSize();
  const isLarge = width >= 1250;
  const [loading, setLoading] = useState(true);

  const sortMovies = (movies: IMovieDetails[], settings: IHomeSettings) => {
    let sortedMovies = [...movies];

    if (settings.name) {
      sortedMovies.sort((a, b) => {
        if (a.title < b.title) return settings.name === "asc" ? -1 : 1;
        if (a.title > b.title) return settings.name === "asc" ? 1 : -1;
        return 0;
      });
    } else if (settings.date) {
      sortedMovies.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return settings.date === "asc" ? dateA - dateB : dateB - dateA;
      });
    }

    return sortedMovies;
  };

  const filterMovies = (movies: IMovieDetails[], query: string) => {
    if (!query) return movies;
    return movies.filter((movie) =>
      movie.title.toLowerCase().includes(query.toLowerCase())
    );
  };

  const actions = {
    toggleSetting: (type: "name" | "date") => {
      setSettings((prev) => {
        const newState: IHomeSettings = {
          name: null,
          date: null,
        };

        let nextState;
        if (prev[type] === null) {
          nextState = "asc";
        } else if (prev[type] === "asc") {
          nextState = "desc";
        } else if (prev[type] === "desc") {
          nextState = null;
        }

        const updatedSettings = {
          ...newState,
          [type]: nextState,
        };

        localStorage.setItem("homeSettings", JSON.stringify(updatedSettings));

        const sortedMovies = sortMovies(data().items, updatedSettings);
        const filteredSortedMovies = filterMovies(sortedMovies, searchQuery);
        const chunkedMovies = chunkArray(filteredSortedMovies, 8);
        setMovies(sortedMovies);
        setFilteredMovies(chunkedMovies);
        setDisplayedChunks(1);

        return updatedSettings;
      });
    },
    handleSearch: (query: string) => {
      setSearchQuery(query);
      const filteredMovies = filterMovies(
        sortMovies(data().items, settings),
        query
      );
      const chunkedMovies = chunkArray(filteredMovies, 8);
      setFilteredMovies(chunkedMovies);
      setDisplayedChunks(1);
    },
    loadMore: () => {
      setDisplayedChunks((prev) => prev + 1);
    },
  };

  useEffect(() => {
    const homeSettings = localStorage.getItem("homeSettings");

    if (homeSettings) {
      const parsedSettings = JSON.parse(homeSettings);
      setSettings(parsedSettings);
      const sortedMovies = sortMovies(data().items, parsedSettings);

      // The reason I chunked on the client side is to stimulate what it would look like for show more/ pagination feature
      // The dataset didn't have many items (14) so I opted to show the first 8 onload and then you grab the next 8.
      // Typically I would do server sided rendering of the data with it would have the offset in as a query params
      // Every time you adjust the criteria (sorting and or search by a keyword) it will reset the view to go with those conditions
      const chunkedMovies = chunkArray(sortedMovies, 8);
      setMovies(sortedMovies);
      setFilteredMovies(chunkedMovies);
      setLoading(false);
    }
  }, []);

  return (
    <Container
      size={isLarge ? "4" : "3"}
      height={`calc(${height}px - 63px)`}
      width="100%"
    >
      <Flex direction="column" p="9" height="100%" width="100%" gap="6">
        <Text size="8">All Movies</Text>

        <Flex
          align="center"
          direction={!loading && width && width <= 600 ? "column" : "row"}
          gap="3"
          width="100%"
        >
          <Flex gap="2">
            <Flex align="center">Sort By</Flex>
            <Button
              onClick={() => actions.toggleSetting("name")}
              variant={settings["name"] ? "solid" : "soft"}
            >
              Name <DirectionIcon settings={settings} type="name" />
            </Button>

            <Button
              onClick={() => actions.toggleSetting("date")}
              variant={settings["date"] ? "solid" : "soft"}
            >
              Date <DirectionIcon settings={settings} type="date" />
            </Button>
          </Flex>
          {width && width >= 600 ? (
            <Separator orientation="vertical" size="4" />
          ) : null}
          <Flex style={{ flex: 1 }}>
            <TextField.Root
              onChange={(e) => actions.handleSearch(e.target.value)}
              placeholder="Search"
              value={searchQuery}
            >
              <TextField.Slot>
                <MagnifyingGlassIcon height="16" width="16" />
              </TextField.Slot>
            </TextField.Root>
          </Flex>
        </Flex>
        <Flex
          align="center"
          direction="column"
          gap="4"
          height="100%"
          width="100%"
        >
          {loading ? (
            <Flex wrap="wrap" height="100%" width="100%" gap="5">
              {new Array(8).fill(null).map((_, i) => (
                <Box
                  className="skeleton-loader gallery-movie-image"
                  style={{ height: 330, width: 230, borderRadius: 4 }}
                ></Box>
              ))}
            </Flex>
          ) : (
            <>
              {filteredMovies.slice(0, displayedChunks).map((chunk, index) => (
                <Gallery key={index} loading={loading} movies={chunk} />
              ))}
              {displayedChunks < filteredMovies.length && (
                <Button
                  onClick={actions.loadMore}
                  radius="full"
                  size="3"
                  variant="solid"
                >
                  SHOW MORE
                </Button>
              )}
            </>
          )}
        </Flex>
      </Flex>
    </Container>
  );
}
