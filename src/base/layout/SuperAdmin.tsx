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

const SuperAdmin = () => {
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

  if (!!w.user) {
    if (
      w.user.role === "superadmin" &&
      globalLayout.role_superadmin.findIndex(
        (e) => window.location.pathname.search(e) >= 0
      ) < 0
    ) {
      setTimeout(() => {
        window.location.href = `${window.location.origin}/superadmin`;
      }, 100);
      return <></>;
    }

    if (
      w.user.role === "admin" &&
      globalLayout.role_admin.findIndex(
        (e) => window.location.pathname.search(e) >= 0
      ) < 0
    ) {
      setTimeout(() => {
        window.location.href = `${window.location.origin}/destination`;
      }, 100);
      return <></>;
    }

    if (
      w.user.role === "user" &&
      globalLayout.role_user.findIndex(
        (e) => window.location.pathname.search(e) >= 0
      ) < 0
    ) {
      setTimeout(() => {
        window.location.href = `${window.location.origin}/destination`;
      }, 100);
      return <></>;
    }
  }

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
        className="w-full min-h-screen"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default SuperAdmin;
