import { FC } from "react";

// components

export const Footer: FC<{}> = ({}) => {
  return (
    <div
      className="py-3 flex justify-center items-center bg-gray-400 box-border
     overflow-hidden"
    >
      <p className="text-sm text-gray-50">
        &copy; 2023 Travel App. All Right Reserved.
      </p>
    </div>
  );
};
