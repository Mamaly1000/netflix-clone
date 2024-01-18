import MovieList from "@/components/lists/MovieList"; 
import InfoModal from "@/components/modals/InfoModal";
import ProfileModal from "@/components/modals/ProfileModal";
import Navbar from "@/components/navbar/Navbar"; 
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
      <Navbar />
      <InfoModal />
      <CustomBillBoard billboard={billboard} onOpen={onOpen} type="movie" />
      <MovieList data={movies || []} title="Trending Movies" />
      <ProfileModal />
    </>
  );
};

export default MoviesPage;
