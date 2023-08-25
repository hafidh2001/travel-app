import { FC } from "react";

// components

export const NavDesktop: FC<{}> = ({}) => {
  return (
    <div className="h-[50px] w-full sticky top-0 z-50">
      <p>nav</p>
    </div>
  );
};

export const NavMobile: FC<{}> = ({}) => {
  return (
    <div className="h-[50px] w-full sticky top-0 z-50">
      <p>nav mobile</p>
    </div>
  );
};
