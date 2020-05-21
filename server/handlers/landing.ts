import { RouterContext, send } from 'https://deno.land/x/oak/mod.ts';

export default async (context: RouterContext) => {
    await send(context, context.request.url.pathname, {
        root: `${Deno.cwd()}/client`,
        index: "index.html",
    });
};