import { Router } from "https://deno.land/x/oak/mod.ts";

import staticPage from "./handlers/static.ts";
import symbol from "./handlers/symbol.ts";
import rss from "./handlers/rss.ts";

const router = new Router();

router
  .get("/", staticPage)
  .get("/chart/:symbol", staticPage)
  .get("/symbol/:symbol", symbol)
  .get("/rss", rss);

export default router;
