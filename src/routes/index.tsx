import { DestinationProvider } from "../base/contex/DestinationContex";
import { IRoutes } from "./interface";
import { lazy } from "react";

// layout
const Default = lazy(() => import("src/base/layout/Default"));
const SuperAdmin = lazy(() => import("src/base/layout/SuperAdmin"));
const Blank = lazy(() => import("src/base/layout/Blank"));

// page
const Dev = lazy(() => import("src/base/page/Dev"));
const Login = lazy(() => import("src/base/page/Login"));

const Home = lazy(() => import("src/base/page/Home"));
const Destination = lazy(() => import("src/base/page/Destination"));

// page superadmin
const IndexSuperAdmin = lazy(() => import("src/base/page/superadmin/Index"));

const routes = [
  {
    layout: <Default />,
    pages: [
      { path: "/", element: <Home /> },
      {
        path: "/destination",
        element: (
          <DestinationProvider>
            <Destination />
          </DestinationProvider>
        ),
      },
    ],
  },
  {
    layout: <SuperAdmin />,
    pages: [{ path: "/superadmin", element: <IndexSuperAdmin /> }],
  },
  {
    layout: <Blank />,
    pages: [
      { path: "/login", element: <Login /> },
      { path: "/dev", element: <Dev /> },
    ],
  },
] as Array<IRoutes>;

export default routes;
