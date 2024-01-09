import React from "react";
import { Movie } from "@prisma/client";
import { isEmpty } from "lodash";
import MovieCard from "../cards/MovieCard";

const MovieList = ({ data, title }: { data: Movie[]; title?: string }) => {
  if (isEmpty(data)) {
    return null;
  }
  return (
    <section className="px-4 md:px-12 mt-4 space-y-8  pb-40  ">
      <p className="text-white text-base md:text-lg lg:text-2xl font-semibold mb-4  capitalize">
        {title}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {data.map((movie) => {
          return <MovieCard key={movie.id} movie={movie} />;
        })}
      </div>
    </section>
  );
};

export default MovieList;
