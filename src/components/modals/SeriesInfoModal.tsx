import { useSeriesInfoModal } from "@/hooks/useSeriesInfoModal";
import useSingleSeries from "@/hooks/useSingleSeries";
import React from "react";
import Modal from "./Modal";
import PlayButton from "../inputs/PlayButton";
import FavoriteSeriesButton from "../inputs/FavoriteSeriesButton";
import DeleteButton from "../inputs/DeleteButton";
import EditButton from "../inputs/EditButton";

const SeriesInfoModal = ({ adminMode = false }: { adminMode?: boolean }) => {
  const { isOpen, onClose, seriesId } = useSeriesInfoModal();
  const { series } = useSingleSeries(seriesId);
  return (
    <Modal onClose={onClose} isVisible={isOpen}>
      {series && (
        <div className="relative h-96">
          <video
            poster={series?.thumbnailUrl}
            autoPlay
            muted
            loop
            src={series?.videoUrl}
            className="w-full brightness-[60%] object-cover h-full"
          />
          <div className="absolute bottom-[10%] left-10">
            <p className="capitalize text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-8">
              {series?.title}
            </p>
            <div className="flex flex-row gap-4 items-center">
              <PlayButton type="series" id={series?.id} />
              <FavoriteSeriesButton seriesId={series?.id} />
              {adminMode && (
                <>
                  <DeleteButton type="series" id={series?.id} />
                  <EditButton type="series" id={series?.id} />
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {series && (
        <div className="px-12 py-8">
          <div className="flex flex-row items-center gap-2 mb-8">
            <p className="text-green-400 font-semibold text-lg">New</p>
            <p className="text-white text-lg">
              {series?.duration} - {series?.seasons} seasons -{" "}
              {series?.epizodes} epizodes -{" "}
            </p>
            <p className="text-white text-lg">{series?.genre}</p>
          </div>
          <p className="text-white text-lg">{series?.description}</p>
        </div>
      )}
    </Modal>
  );
};

export default SeriesInfoModal;
