import { IRoutes } from "./interface";
import { lazy } from "react";

// layout
const Default = lazy(() => import("src/base/layout/Default"));
const SuperAdmin = lazy(() => import("src/base/layout/SuperAdmin"));
const Blank = lazy(() => import("src/base/layout/Blank"));

// page
const Dev = lazy(() => import("src/base/page/Dev"));
const Home = lazy(() => import("src/base/page/Home"));
const Login = lazy(() => import("src/base/page/Login"));

// page superadmin
const IndexSuperAdmin = lazy(() => import("src/base/page/superadmin/Index"));
// const EditExample = lazy(() => import("src/base/page/example/EditExample"));
// const ShowExample = lazy(() => import("src/base/page/example/ShowExample"));

const routes = [
  {
    layout: <Default />,
    pages: [{ path: "/", element: <Home /> }],
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
