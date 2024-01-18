import MovieList from "@/components/lists/MovieList";
import SeriesList from "@/components/lists/SeriesList";
import InfoModal from "@/components/modals/InfoModal";
import ProfileModal from "@/components/modals/ProfileModal";
import SeriesInfoModal from "@/components/modals/SeriesInfoModal";
import Navbar from "@/components/navbar/Navbar";
import Billboard from "@/components/ui/Billboard";
import useFavorites from "@/hooks/useFavorites";
import React from "react";

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <>
      <Navbar />
      <Billboard />

      <MovieList
        data={favorites?.favoriteMovies || []}
        title="Favorite movies"
      />
      <SeriesList
        data={favorites?.favoriteSeries || []}
        title="Favorite series"
      />
      <ProfileModal />
      <InfoModal />
      <SeriesInfoModal />
    </>
  );
};

export default Favorites;
