import {lazy} from "react";
const Home = lazy(() => import("./pages/home/home"));

const routes = [
  {
    exact: true,
    name: "Home",
    path: "/",
    component: Home,
  },
];

export default routes;
