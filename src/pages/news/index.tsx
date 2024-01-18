import NewsList from "@/components/lists/NewsList";
import ProfileModal from "@/components/modals/ProfileModal";
import Navbar from "@/components/navbar/Navbar";
import useNewses from "@/hooks/useNewses";
import React from "react";

const NewsPage = () => {
  const { news, favoritesNews } = useNewses();
  return (
    <>
      <Navbar />
      <ProfileModal />
      <NewsList news={news || []} title="recent News" />
      <NewsList news={favoritesNews || []} title="your favorite news" />
    </>
  );
};

export default NewsPage;
