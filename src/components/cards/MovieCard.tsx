import { Movie } from "@prisma/client";
import Image from "next/image";
import React from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import FavoriteButton from "../inputs/FavoriteButton";
import PlayButton from "../inputs/PlayButton";
import { useInfoModal } from "@/hooks/useInfoModal";
const MovieCard = ({
  movie: { duration, genre, id, thumbnailUrl, title },
}: {
  movie: Movie;
}) => {
  const infoModal = useInfoModal();
  return (
    <article className="group bg-zinc-900 col-span relative h-[12vw]">
      <div className="cursor-pointer object-cover transition-all duration shadow-xl rounded-md relative group-hover:opacity-90 sm:group-hover:opacity-0 delay-300 w-full h-[12vw]">
        <Image fill src={thumbnailUrl} alt={title} className="object-cover " />
      </div>
      <div
        className="
        opacity-0
        absolute
        top-0
        transition
        duration-200
        z-10
        invisible
        sm:visible
        delay-300
        w-full
        scale-0
        group-hover:scale-110
        group-hover:-translate-y-[6vw]
        group-hover:translate-x-[2vw]
        group-hover:opacity-100
      "
      >
        <div className="relative object-cover aspect-video cursor-pointer transition-all duration shadow-xl rounded-t-md overflow-hidden w-full h-[12vw] ">
          <Image
            alt={title}
            src={thumbnailUrl}
            className="object-cover max-w-full min-w-full"
            fill
          />
        </div>
        <div
          className="
          z-10
          bg-zinc-800
          p-2
          lg:p-4
          absolute
          w-full
          transition
          shadow-md
          rounded-b-md
          "
        >
          <div className="flex flex-row items-center gap-3">
            <PlayButton small id={id} />
            <FavoriteButton movieId={id} />
            <div
              onClick={() => infoModal.onOpen(id)}
              className="cursor-pointer ml-auto group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
            >
              <ChevronDownIcon className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6" />
            </div>
          </div>
          <p className="text-green-400 font-semibold mt-4">
            New <span className="text-white">2023</span>
          </p>
          <div className="flex flex-row mt-4 gap-2 items-center">
            <p className="text-white text-[10px] lg:text-sm">{duration}</p>
          </div>
          <div className="flex flex-row items-center gap-2 mt-4 text-[8px] text-white lg:text-sm">
            <p>{genre}</p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default MovieCard;
