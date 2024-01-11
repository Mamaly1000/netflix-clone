import SeriesList from "@/components/lists/SeriesList";
import CreateSeries from "@/components/modals/CreateSeries";
import SeriesInfoModal from "@/components/modals/SeriesInfoModal";
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
      <CreateSeries />
      <SeriesInfoModal adminMode />
      <CustomBillBoard billboard={billboard} onOpen={onOpen} type="series" />
      <SeriesList adminMode data={series || []} title="Trending Series" />
    </>
  );
};

export default SeriesPage;
