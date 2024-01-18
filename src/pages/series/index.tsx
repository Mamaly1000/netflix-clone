import SeriesList from "@/components/lists/SeriesList"; 
import SeriesInfoModal from "@/components/modals/SeriesInfoModal";
import Navbar from "@/components/navbar/Navbar"; 
import CustomBillBoard from "@/components/ui/CustomBillBoard"; 
import useBillboard from "@/hooks/useBillboard";
import useSeries from "@/hooks/useSeries";
import { useSeriesInfoModal } from "@/hooks/useSeriesInfoModal"; 
import React from "react"; 

const SeriesPage = () => {
  const { billboard } = useBillboard({ type: "series" });
  const { series } = useSeries();
  const { onOpen } = useSeriesInfoModal();

  return (
    <>
      <Navbar />
      <SeriesInfoModal />
      <CustomBillBoard billboard={billboard} onOpen={onOpen} type="series" />
      <SeriesList data={series || []} title="Trending Series" />
    </>
  );
};

export default SeriesPage;
