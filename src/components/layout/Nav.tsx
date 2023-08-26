import { FC } from "react";
import { configs } from "src/base/global/global";
import { IconChevron } from "../ui/Icon";
import { contexLayout } from "../../base/contex/LayoutContext";
import { menu } from "../../utils/global/menu";

// components

export const NavDesktop: FC<{}> = ({}) => {
  const logout = async () => {
    localStorage.removeItem(configs.storage_user);
    (window as any).user = {};
    setTimeout(() => {
      window.location.href = "/login";
    }, 100);
  };
  return (
    <div className="h-[60px] w-full sticky top-0 z-50 bg-white shadow-xl px-10 flex items-center justify-between box-border">
      <div className="flex items-center space-x-2">
        <img
          src="https://datacakra.com/wp-content/uploads/2020/08/cropped-Datacakra_Logo-192x192.png"
          alt="travel-app datacakra"
          className="w-12"
        />
        <span className="font-Montserrat text-xl font-bold">Travel App</span>
      </div>
      <div className="h-full flex items-center space-x-14 text-base font-medium text-black">
        <div className="flex items-center space-x-6">
          {menu.map((item: { title: string; href: string }, idx: number) => (
            <span
              key={idx}
              className={`cursor-pointer outline-none scale-110 ${
                window.location.pathname === item.href
                  ? "scale-110 text-[#4336ff] font-semibold"
                  : ""
              }`}
              onClick={() => {
                window.location.href = item.href;
              }}
            >
              {item.title}
            </span>
          ))}
        </div>
        <div className="h-full flex justify-center items-center space-x-4 cursor-pointer outline-none relative group">
          <div className="flex justify-center items-center space-x-4">
            <div className="w-[45px] rounded-full box-border overflow-hidden">
              <img src="/images/user.webp" alt="user" className="w-[45px]" />
            </div>
            <span>{(window as any).user.name}</span>
            <IconChevron className="w-3 h-3 rotate-180 group-hover:rotate-0" />
          </div>
          <div className="absolute top-[60px] right-0 w-[200px] hidden group-hover:block">
            <div className="mt-2 flex flex-col space-y-1">
              <button
                className="px-5 py-2 bg-white shadow-xl rounded-lg hover:bg-slate-200"
                onClick={logout}
              >
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const NavMobile: FC<{}> = ({}) => {
  const { globalLayout, setGlobalLayout } = contexLayout();
  const logout = async () => {
    localStorage.removeItem(configs.storage_user);
    (window as any).user = {};
    setTimeout(() => {
      window.location.href = "/login";
    }, 100);
  };

  return (
    <div className="h-[60px] w-full sticky top-0 z-50 bg-white shadow-xl px-5 flex items-center justify-between box-border">
      <div className="flex items-center space-x-2">
        <img
          src="https://datacakra.com/wp-content/uploads/2020/08/cropped-Datacakra_Logo-192x192.png"
          alt="travel-app datacakra"
          className="w-8"
        />
        <span className="font-Montserrat text-base font-bold">Travel App</span>
      </div>
      <div
        className="h-full flex justify-center items-center space-x-4 cursor-pointer outline-none relative"
        onClick={() => {
          setGlobalLayout({
            ...globalLayout,
            showMenu: !globalLayout.showMenu,
          });
        }}
      >
        <img src="/icons/hamburger-icon.webp" alt="hamburger-icon" />
        <div
          className={`absolute top-[60px] right-0 w-[200px] ${
            !!globalLayout.showMenu ? "block" : "hidden"
          }`}
        >
          <div className="mt-2 flex flex-col space-y-1">
            <button
              className="px-5 py-2 bg-white shadow-xl rounded-lg hover:bg-slate-200"
              onClick={() => {
                window.location.href = "/profile";
              }}
            >
              <span>Profile</span>
            </button>

            <button
              className="px-5 py-2 bg-white shadow-xl rounded-lg hover:bg-slate-200"
              onClick={logout}
            >
              <span>Logout</span>
            </button>
          </div>
          Ioim
        </div>
      </div>
    </div>
  );
};
