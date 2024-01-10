import { series } from "@prisma/client";
import { without } from "lodash";
import React from "react";
import SeriesCard from "../cards/SeriesCard";

const SeriesList = ({ data }: { data: series[] | null }) => {
  if (without(data)) {
    return null;
  }
  return (
    <div>
      {data?.map((series) => (
        <SeriesCard key={series.id} series={series} />
      ))}
    </div>
  );
};

export default SeriesList;
