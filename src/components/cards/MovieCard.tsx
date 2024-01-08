import { Movie } from "@prisma/client";
import React from "react";

const MovieCard = ({
  movie: { description, duration, genre, id, thumbnailUrl, title, videoUrl },
}: {
  movie: Movie;
}) => {
  return <div>{title}</div>;
};

export default MovieCard;
