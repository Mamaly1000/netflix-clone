import React from "react";
import Modal from "./Modal";
import { useInfoModal } from "@/hooks/useInfoModal";
import useMovie from "@/hooks/useMovie";
import PlayButton from "../inputs/PlayButton";
import FavoriteButton from "../inputs/FavoriteButton"; 
import DeleteButton from "../inputs/DeleteButton";
import EditButton from "../inputs/EditButton";

const InfoModal = ({ adminMode = false }: { adminMode?: boolean }) => {
  const { isOpen, onClose, movieId } = useInfoModal();
  const { movie } = useMovie(movieId);

  return (
    <Modal onClose={onClose} isVisible={isOpen}>
      {movie && (
        <div className="relative h-96">
          <video
            poster={movie?.thumbnailUrl}
            autoPlay
            muted
            loop
            src={movie?.videoUrl}
            className="w-full brightness-[60%] object-cover h-full"
          />
          <div className="absolute bottom-[10%] left-10">
            <p className="text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-8 capitalize">
              {movie?.title}
            </p>
            <div className="flex flex-row gap-4 items-center">
              <PlayButton id={movie?.id} />
              <FavoriteButton movieId={movie?.id} />
              {adminMode && (
                <>
                  <DeleteButton type="movie" id={movie?.id} />
                  <EditButton type="movie" id={movie?.id} />
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {movie && (
        <div className="px-12 py-8">
          <div className="flex flex-row items-center gap-2 mb-8">
            <p className="text-green-400 font-semibold text-lg">New</p>
            <p className="text-white text-lg">{movie?.duration}</p>
            <p className="text-white text-lg">{movie?.genre}</p>
          </div>
          <p className="text-white text-lg">{movie?.description}</p>
        </div>
      )}
    </Modal>
  );
};

export default InfoModal;
