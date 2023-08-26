import { useState } from "react";
import { Outlet } from "react-router-dom";
import { contexLayout } from "src/base/contex/LayoutContext";

// components
import {
  configs,
  useScrollWindow,
  useSizeWindow,
} from "src/base/global/global";
import { Skeleton } from "antd";
import { NavDesktop, NavMobile } from "src/components/layout/Nav";
import { Footer } from "src/components/layout/Footer";

const Default = () => {
  const [loading, setLoading] = useState(false);
  const { globalLayout, setGlobalLayout } = contexLayout();

  // re-assign value scrollPos & Width [re-assigns value without changing any changes to the components]
  globalLayout.scrollPos = useScrollWindow();
  globalLayout.width = useSizeWindow();

  // assign value global window
  const w = window as any;
  const storage_user = localStorage.getItem(configs.storage_user);
  const user = !!storage_user && JSON.parse(atob(storage_user));
  w.user = user;

  if (!w.user) {
    setTimeout(() => {
      window.location.href = `${window.location.origin}/login?redirect=${window.location.pathname}`;
    }, 100);
    return <></>;
  }

  // template
  // if (!!w.user) {
  //   if (
  //     w.user.role === "superadmin" &&
  //     globalLayout.role_superadmin.findIndex(
  //       (e) => window.location.pathname.search(e) >= 0
  //     ) < 0
  //   ) {
  //     setTimeout(() => {
  //       window.location.href = `${window.location.origin}/competence`;
  //     }, 100);
  //     return <></>;
  //   }

  //   if (
  //     w.user.role === "administrator" &&
  //     globalLayout.role_administrator.findIndex(
  //       (e) => window.location.pathname.search(e) >= 0
  //     ) < 0
  //   ) {
  //     setTimeout(() => {
  //       window.location.href = `${window.location.origin}/participant`;
  //     }, 100);
  //     return <></>;
  //   }

  //   if (
  //     w.user.role === "user" &&
  //     globalLayout.role_user.findIndex(
  //       (e) => window.location.pathname.search(e) >= 0
  //     ) < 0 &&
  //     window.location.pathname !== "/"
  //   ) {
  //     setTimeout(() => {
  //       window.location.href = `${window.location.origin}/`;
  //     }, 100);
  //     return <></>;
  //   }
  // }
  // template

  if (loading)
    return (
      <div className="flex flex-col justify-center h-screen space-y-2 w-1/3 m-auto">
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
    );

  return (
    <div className={`w-full flex flex-col overflow-x-clip`}>
      {globalLayout.width < 768 ? <NavMobile /> : <NavDesktop />}
      <div
        className="w-full min-h-screen bg-[url('/public/images/bg.webp')] bg-cover bg-center bg-no-repeat"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

export default Default;
