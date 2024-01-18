import CreateNews from "@/components/modals/CreateNews";
import SideBar from "@/components/sidebar/SideBar";
import Header from "@/components/ui/Header";
import { useCreateNews } from "@/hooks/useCreateNews";
import { useSideBar } from "@/hooks/useSideBar";
import React from "react";
import { BiAddToQueue, BiSidebar } from "react-icons/bi";

const NewsAdminPage = () => {
  const SideBarModal = useSideBar();
  const createNewsModal = useCreateNews();
  return (
    <>
      <Header
        title="Series"
        callBack
        actions={[
          {
            icon: BiSidebar,
            id: 0,
            onClick: () => SideBarModal.onOpen(),
          },
          {
            icon: BiAddToQueue,
            id: 1,
            onClick: () =>
              createNewsModal.onOpen({ id: undefined, type: "create" }),
          },
        ]}
      />
      <SideBar isOpen={SideBarModal.isOpen} onClose={SideBarModal.onClose} />
      <CreateNews />
    </>
  );
};

export default NewsAdminPage;
