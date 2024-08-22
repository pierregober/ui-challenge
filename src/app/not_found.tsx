"use client";
import React from "react";

/** Vendors*/
import { useRouter } from "next/navigation";
import { Link, Container, Flex, Heading } from "@radix-ui/themes";

/** Custom Hooks */
import useWindowSize from "@/hooks/useWindowSize";

export default function NotFound({
  error,
}: {
  error: Error;
}): React.ReactElement {
  const router = useRouter();
  const { height, width } = useWindowSize();
  const isLarge = width >= 1250;

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
        <Link href="/" style={{ border: "2px solid #000", color: "#000" }}>
          Go Home
        </Link>
      </Flex>
    </Container>
  );
}
