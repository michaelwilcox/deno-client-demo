import {
    bold,
    yellow,
  } from "https://deno.land/std@0.51.0/fmt/colors.ts";

import { Application } from 'https://deno.land/x/oak/mod.ts';
import router from './router.ts';
import error from './middleware/error.ts';
import logger from './middleware/logger.ts';
import responseTime from './middleware/responseTime.ts';
import staticContent from './middleware/staticContent.ts';
import notFound from './notFound.ts';

const app = new Application();

app.use(error);
app.use(logger);
app.use(responseTime);
app.use(router.routes());
app.use(router.allowedMethods());
app.use(staticContent);
app.use(notFound);

const controller = new AbortController();
const { signal } = controller;

const options = { hostname: "127.0.0.1", port: 8000 };
console.log(
    bold("Start listening on ") + yellow(`${options.hostname}:${options.port}`),
);
const listenPromise = await app.listen(options);

// close the server
controller.abort();

await listenPromise;

console.log(bold("Finished."));
