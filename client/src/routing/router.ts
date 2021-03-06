/**
 * Code copied from Dan Abramov
 * Annotated for TypeScript
 *
 * https://github.com/gaearon/suspense-experimental-github-demo
 */

import createRouter from "./createRouter";
import prepareNewsPage from "../pages/News/News.data";
import prepareStockPage from "../pages/StockChart/StockChart.data";

const { RouterContext, Router, Link } = createRouter([
  {
    match: "/",
    loadData: prepareNewsPage,
    loadCode: () => import("../pages/News"),
  },
  {
    match: "/chart/:symbol",
    loadData: prepareStockPage,
    loadCode: () => import("../pages/StockChart"),
  },
]);

export { RouterContext, Router, Link };
