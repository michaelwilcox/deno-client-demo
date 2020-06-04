import { Router } from "https://deno.land/x/oak/mod.ts";

import staticPage from "./handlers/static.ts";
import search from "./handlers/search.ts";
import symbol from "./handlers/symbol.ts";
import rss from "./handlers/rss.ts";
import historical from "./handlers/historical.ts";

const router = new Router();

router
  // UI
  .get("/", staticPage)
  .get("/chart/:symbol", staticPage)

  // API
  .get("/search/:symbol", search)
  .get("/symbol/:symbol", symbol)
  .get("/chart-data/:symbol", historical)
  .get("/rss", rss);

export default router;
