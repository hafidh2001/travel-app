import { IRoutes } from "./interface";
import { lazy } from "react";

// layout
const Default = lazy(() => import("src/base/layout/Default"));
const Blank = lazy(() => import("src/base/layout/Blank"));

// page
const Dev = lazy(() => import("src/base/page/Dev"));
const Home = lazy(() => import("src/base/page/Home"));
const Login = lazy(() => import("src/base/page/Login"));

const routes = [
  {
    layout: <Default />,
    pages: [{ path: "/", element: <Home /> }],
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
