import { Router } from "https://deno.land/x/oak/mod.ts";

import landing from './handlers/landing.ts';
import symbol from './handlers/symbol.ts';
import rss from './handlers/rss.ts';

const router = new Router();

router
    .get("/", landing)
    .get("/symbol/:symbol", symbol)
    .get("/rss", rss);

export default router;