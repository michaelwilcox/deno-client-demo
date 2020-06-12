/**
 * Code copied from Dan Abramov
 * Annotated for TypeScript
 * https://github.com/gaearon/suspense-experimental-github-demo
 *
 */

import createRouter from "./createRouter";

type Route = {
  match: string;
  loadData: Function;
  loadCode: () => Promise<{ default: React.ComponentType<any> }>;
  component?: React.LazyExoticComponent<React.ComponentType<any>>;
};

type Routes = Array<Route>;

const { Router, Link } = createRouter([
  {
    match: "/",
    loadData: () => {},
    loadCode: () => import("../pages/Home"),
  },
  {
    match: "/chart/:symbol",
    loadData: () => {},
    loadCode: () => import("../pages/StockChart"),
  },
]);

export { Routes, Router, Link };
