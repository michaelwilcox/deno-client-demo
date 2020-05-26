import { RouterContext, send } from "https://deno.land/x/oak/mod.ts";

export default async (context: RouterContext) => {
  // so, this is kind of a hack ...
  // usecase here is need `/endpoint/:id`.
  // app is doing data fetching on client
  // so just serve always serve from root
  // and let ui construct state from url
  const pathName = "/";
  await send(context, pathName, {
    root: `${Deno.cwd()}/client/build`,
    index: "index.html",
  });
};
