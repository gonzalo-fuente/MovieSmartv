import { Home, Boot, Details, NotFound } from "../pages";

export default {
  root: "home",

  routes: [
    {
      path: "home",
      component: Home,
    },
    {
      path: "details",
      component: Details,
    },
    {
      path: "*",
      component: NotFound,
    },
    {
      path: "$",
      component: Boot,
    },
  ],
};
