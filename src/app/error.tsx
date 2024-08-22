"use client";
import React, { useEffect } from "react";

/** Vendors*/
import { useRouter } from "next/navigation";
import { Button, Container, Flex, Heading } from "@radix-ui/themes";

/** Custom Hooks */
import useWindowSize from "@/hooks/useWindowSize";

export default function NotFound({
  error,
}: {
  error: Error;
}): React.ReactElement {
  const { height, width } = useWindowSize();
  const isLarge = width && width >= 1250;
  const router = useRouter();

  const actions = {
    goHome: () => {
      if (typeof window !== "undefined") {
        router.push("/");
      }
    },
  };

  return (
    <Container size={isLarge ? "4" : "3"} height={`calc(${height}px - 63px)`}>
      <Flex p="9" height="100%" gap="3" width="100%" direction="column">
        <video
          className="disney-404"
          autoPlay={true}
          muted
          height="465"
          playsInline
          src="https://static-mh.content.disney.io/matterhorn/assets/errors/e404_main_video-eac5362f8f95.mp4"
        />
        <Heading size="5" align="center">
          You didn’t break the internet, but we can’t find what you are looking
          for.
          <br /> Let's go back to home.
        </Heading>
        <Button
          radius="full"
          variant="outline"
          onClick={() => actions.goHome}
          style={{ border: "2px solid #000", color: "#000" }}
        >
          Go Home
        </Button>
      </Flex>
    </Container>
  );
}
