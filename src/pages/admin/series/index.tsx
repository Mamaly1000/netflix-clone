import SeriesList from "@/components/lists/SeriesList";
import CreateSeries from "@/components/modals/CreateSeries";
import SeriesInfoModal from "@/components/modals/SeriesInfoModal";
import SideBar from "@/components/sidebar/SideBar";
import CustomBillBoard from "@/components/ui/CustomBillBoard";
import Header from "@/components/ui/Header";
import useBillboard from "@/hooks/useBillboard";
import useSeries from "@/hooks/useSeries";
import { useSeriesInfoModal } from "@/hooks/useSeriesInfoModal";
import { useSideBar } from "@/hooks/useSideBar";
import React from "react";
import { BiSidebar } from "react-icons/bi";

const SeriesPage = () => {
  const { billboard } = useBillboard({ type: "series" });
  const { series } = useSeries();
  const { onOpen } = useSeriesInfoModal();
  const SideBarModal = useSideBar();

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
        ]}
      />
      <CreateSeries />
      <SeriesInfoModal adminMode />
      <CustomBillBoard billboard={billboard} onOpen={onOpen} type="series" />
      <SideBar isOpen={SideBarModal.isOpen} onClose={SideBarModal.onClose} />
      <SeriesList adminMode data={series || []} title="Trending Series" />
    </>
  );
};

export default SeriesPage;
