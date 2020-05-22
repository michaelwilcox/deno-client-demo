import { Context, send } from 'https://deno.land/x/oak/mod.ts';

export default async (context: Context) => {
    await send(context, context.request.url.pathname, {
        root: `${Deno.cwd()}/client/build`,
    });
}