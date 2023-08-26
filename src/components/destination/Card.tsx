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
        <div className="w-full flex items-center space-x-1 justify-end">
          <img src="/icons/star-icon.webp" alt="star" className="w-8 h-8" />
          <span className="mt-1">{!!average_rating ? average_rating : 0}</span>
        </div>
        <h3 className="font-bold text-xl">{title}</h3>
        <p className="">{description}</p>
      </div>
    </div>
  );
};
