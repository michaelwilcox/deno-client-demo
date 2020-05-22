import { RouterContext, send } from 'https://deno.land/x/oak/mod.ts';

export default async (context: RouterContext) => {
    console.log(Deno.cwd());
    await send(context, context.request.url.pathname, {
        root: `${Deno.cwd()}/client/build`,
        index: "index.html",
    });
};