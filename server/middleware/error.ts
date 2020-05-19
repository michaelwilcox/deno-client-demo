import { Context } from 'https://deno.land/x/oak/mod.ts';

export default async (context: Context, next: () => Promise<void>) => {
    const { response } = context;
    try {
      await next();
    } catch (err) {
      response.status = 500;
      response.body = { msg: err.message };
    }
  };