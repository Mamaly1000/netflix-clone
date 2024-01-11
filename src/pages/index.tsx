import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Navbar from "@/components/navbar/Navbar";
import Billboard from "@/components/ui/Billboard";
import MovieList from "@/components/lists/MovieList";
import useMovies from "@/hooks/useMovies";
import useFavorites from "@/hooks/useFavorites";
import InfoModal from "@/components/modals/InfoModal";
import ProfileModal from "@/components/modals/ProfileModal";
import useSeries from "@/hooks/useSeries";
import SeriesList from "@/components/lists/SeriesList";
import SeriesInfoModal from "@/components/modals/SeriesInfoModal";

export const getServerSideProps = async (ctx: NextPageContext) => {
  const session = await getSession(ctx);
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default function Home() {
  const { movies } = useMovies();
  const { series } = useSeries();
  const { favorites } = useFavorites();
  return (
    <>
      <InfoModal />
      <ProfileModal />
      <SeriesInfoModal />
      <Navbar />
      <Billboard />
      <MovieList data={movies || []} title="Trending Movies" />
      <SeriesList data={series || []} title="Trending Series" />
      <MovieList
        data={favorites?.favoriteMovies || []}
        title="Favorite movies"
      />
      <SeriesList
        data={favorites?.favoriteSeries || []}
        title="Favorite series"
      />
    </>
  );
}
