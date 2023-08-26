import { FC } from "react";
import { IDestination } from "src/base/global/interface";

export const Card: FC<{
  data: IDestination;
}> = ({ data }) => {
  const { id, title, thumbnail, description, average_rating, reviews } = data;

  return (
    <div className="bg-white box-border overflow-hidden rounded-xl shadow-xl">
      <img src={thumbnail} alt={title} className="w-full" />
      <div className="w-full p-5">
        <h3 className="font-bold text-xl">{title}</h3>
        <p className="">{description}</p>
      </div>
    </div>
  );
};
