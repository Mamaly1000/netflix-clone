import MovieList from "@/components/lists/MovieList";
import CreateMovie from "@/components/modals/CreateMovie";
import InfoModal from "@/components/modals/InfoModal";
import CustomBillBoard from "@/components/ui/CustomBillBoard";
import useBillboard from "@/hooks/useBillboard";
import { useInfoModal } from "@/hooks/useInfoModal";
import useMovies from "@/hooks/useMovies";
import React from "react";

const MoviesPage = () => {
  const { billboard } = useBillboard({ type: "movie" });
  const { movies } = useMovies();
  const { onOpen } = useInfoModal();
  return (
    <>
      <CreateMovie />
      <InfoModal adminMode  />
      <CustomBillBoard billboard={billboard} onOpen={onOpen} type="movie" />
      <MovieList adminMode data={movies || []} title="Trending Movies" />
    </>
  );
};

export default MoviesPage;
