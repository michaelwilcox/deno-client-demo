import { Router } from "https://deno.land/x/oak/mod.ts";

import landing from './handlers/landing.ts';
import search from './handlers/search.ts';

const router = new Router();

router
    .get("/", landing)
    .get("/search/:query", search);

export default router;