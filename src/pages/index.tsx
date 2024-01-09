import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Navbar from "@/components/navbar/Navbar";
import Billboard from "@/components/ui/Billboard";
import MovieList from "@/components/lists/MovieList";
import useMovies from "@/hooks/useMovies";
import useFavorites from "@/hooks/useFavorites";
import InfoModal from "@/components/modals/InfoModal";

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
  const { favorites } = useFavorites();
  return (
    <>
      <InfoModal />
      <Navbar />
      <Billboard />
      <MovieList data={movies || []} title="Trending now" />
      <MovieList data={favorites || []} title="Favorites" />
    </>
  );
}
