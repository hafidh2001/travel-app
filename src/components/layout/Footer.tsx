import { FC } from "react";

// components

export const FooterDesktop: FC<{}> = ({}) => {
  return (
    <div className="py-7 px-x-desktop flex items-center justify-between bg-white dark:bg-black dark:duration-300">
      <p>footer desktop</p>
    </div>
  );
};

export const FooterMobile: FC<{}> = ({}) => {
  return (
    <div className="py-7 px-x-mobile flex flex-col justify-start space-y-4 bg-white dark:bg-black dark:duration-300">
      <p>footer mobile</p>
    </div>
  );
};
