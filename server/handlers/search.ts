import { RouterContext } from 'https://deno.land/x/oak/mod.ts';

export default async (context: RouterContext) => {
    const { request, response } = context;
    response.body = { msg: "Success", data: request.body() };
    // TODO: implement API fetching
}