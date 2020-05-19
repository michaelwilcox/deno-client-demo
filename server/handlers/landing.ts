import { RouterContext } from 'https://deno.land/x/oak/mod.ts';

export default (context: RouterContext) => {
    context.response.body = "Hello world!";
    // TODO: handle base case
};