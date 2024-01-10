import { useSeriesInfoModal } from "@/hooks/useSeriesInfoModal";
import useSingleSeries from "@/hooks/useSingleSeries";
import React from "react";
import Modal from "./Modal";
import PlayButton from "../inputs/PlayButton";
import FavoriteButton from "../inputs/FavoriteButton";

const SeriesInfoModal = () => {
  const { isOpen, onClose, seriesId } = useSeriesInfoModal();
  const { series } = useSingleSeries(seriesId);
  return (
    <Modal onClose={onClose} isVisible={isOpen}>
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
          <p className="text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-8">
            {series?.title}
          </p>
          <div className="flex flex-row gap-4 items-center">
            <PlayButton id={series?.id} />
            <FavoriteButton movieId={series?.id} />
          </div>
        </div>
      </div>

      <div className="px-12 py-8">
        <div className="flex flex-row items-center gap-2 mb-8">
          <p className="text-green-400 font-semibold text-lg">New</p>
          <p className="text-white text-lg">{series?.duration}</p>
          <p className="text-white text-lg">{series?.genre}</p>
        </div>
        <p className="text-white text-lg">{series?.description}</p>
      </div>
    </Modal>
  );
};

export default SeriesInfoModal;
