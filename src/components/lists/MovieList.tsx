import React from "react";
import { Movie } from "@prisma/client";
import { isEmpty } from "lodash";
import MovieCard from "../cards/MovieCard";
import { useCreateMovieModal } from "@/hooks/useCreateMovieModal";
import { PlusIcon } from "@heroicons/react/24/outline";

const MovieList = ({
  data,
  title,
  adminMode = false,
}: {
  adminMode?: boolean;
  data: Movie[];
  title?: string;
}) => {
  const { onOpen } = useCreateMovieModal();
  if (isEmpty(data)) {
    return null;
  }
  return (
    <section className="px-4 md:px-12 mt-4 space-y-8  pb-40  min-w-full">
      <p className="text-white text-base md:text-lg lg:text-2xl font-semibold mb-4  capitalize">
        {title}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {data.map((movie) => {
          return <MovieCard key={movie.id} movie={movie} />;
        })}
        {adminMode && (
          <div
            className="cursor-pointer group hover:border-red-700 col-span-1 min-h-[150px] border-[1px] border-white border-dotted rounded-lg  flex items-center justify-center "
            onClick={() => onOpen()}
          >
            <button className="p-5 rounded-full flex items-center justify-center drop-shadow-2xl transition-all bg-transparent  group-hover:bg-red-700 border-[1px] border-white group-hover:border-red-700 w-20 h-20 max-h-20 max-w-20 m-auto">
              <PlusIcon className="text-white" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default MovieList;
