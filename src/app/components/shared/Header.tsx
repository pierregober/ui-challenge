"use client";

/** Vendors */
import Image from "next/image";
import Link from "next/link";
import { Container, Flex } from "@radix-ui/themes";

/** Custom Hooks */
import useWindowSize from "@/hooks/useWindowSize";

export default function Header() {
  const { width } = useWindowSize();
  const isLarge = width >= 1250;

  return (
    <Container size={isLarge ? "4" : "3"}>
      <Flex height="63px" px="9" py="2" align="center">
        <Link href="/">
          <Image
            alt="disney_logo"
            height="40"
            src="/disney-logo.png"
            width="95"
            loading="lazy"
          />
        </Link>
      </Flex>
    </Container>
  );
}
