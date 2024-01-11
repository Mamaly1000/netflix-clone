import { series } from "@prisma/client";
import { isEmpty } from "lodash";
import React from "react";
import SeriesCard from "../cards/SeriesCard";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useCreateSeriesModal } from "@/hooks/useCreateSeriesModal";

const SeriesList = ({
  data,
  title,
  adminMode = false,
}: {
  adminMode?: boolean;
  title?: string;
  data: series[];
}) => {
  const { onOpen } = useCreateSeriesModal();

  if (isEmpty(data)) {
    return null;
  }

  return (
    <section className="px-4 md:px-12 mt-4 space-y-8  pb-40  ">
      <p className="text-white text-base md:text-lg lg:text-2xl font-semibold mb-4  capitalize">
        {title}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {data.map((series) => {
          return <SeriesCard key={series.id} series={series} />;
        })}
        {adminMode && (
          <div
            className="cursor-pointer group hover:border-red-700 col-span-1 min-h-[150px] border-[1px] border-white border-dotted rounded-lg  flex items-center justify-center "
            onClick={onOpen}
          >
            <button className="p-5 rounded-full flex items-center justify-center drop-shadow-2xl transition-all bg-transparent  group-hover:bg-red-700 border-[1px] border-white group-hover:border-red-700 w-20 h-20 max-h-20 max-w-20 m-auto">
              <PlusIcon className="text-white" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default SeriesList;
