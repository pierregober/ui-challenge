"use client";
import { useState } from "react";

/** Vendors */
import Link from "next/link";
import Image from "next/image";

/** Types*/
import type { IMovieDetails } from "@/src/types";

export default function Card({ movie }: { movie: IMovieDetails }) {
  const [loaded, setLoaded] = useState<boolean>(false);
  return (
    <Link href={`/${movie.slug}`}>
      <Image
        alt={movie.title}
        className="gallery-movie-image"
        height={330}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        src={`/${movie.image}`}
        style={{ borderRadius: "4px" }}
        width={230}
      />
    </Link>
  );
}
