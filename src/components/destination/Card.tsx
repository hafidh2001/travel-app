import { FC } from "react";
import { IDataDestination } from "src/base/global/interface";

export const Card: FC<{
  data: IDataDestination;
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
        <h3 className="mt-3 font-bold text-base md:text-xl">{title}</h3>
        <p
          className="mt-2 text-justify text-xs md:text-base"
          style={{
            maxHeight: "3.75em", // Adjust the height to the desired number of lines
            overflow: "hidden",
            lineHeight: 1.25, // Adjust the line height to control spacing between lines
            display: "-webkit-box",
            WebkitLineClamp: 3, // Adjust the number of lines
            WebkitBoxOrient: "vertical",
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
};
