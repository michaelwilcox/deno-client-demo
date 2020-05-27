import { Router } from "https://deno.land/x/oak/mod.ts";

import staticPage from "./handlers/static.ts";
import symbol from "./handlers/symbol.ts";
import rss from "./handlers/rss.ts";
import historical from "./handlers/historical.ts";

const router = new Router();

router
  // UI
  .get("/", staticPage)
  .get("/chart/:symbol", staticPage)

  // API
  .get("/symbol/:symbol", symbol)
  .get("/charts/:symbol", historical)
  .get("/rss", rss);

export default router;
