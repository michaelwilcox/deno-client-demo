import { RouterContext, Status } from "https://deno.land/x/oak/mod.ts";
import config from "../config.ts";

export default async (context: RouterContext) => {
  const { params, response } = context;
  if (!params.symbol) {
    response.status = Status.BadRequest;
    response.body = "Bad Request";
    return;
  }
  const { IEX_API_BASE, IEX_TOKEN } = config;
  try {
    const result = await (
      await fetch(
        `${IEX_API_BASE}/stock/${params.symbol}/book?token=${IEX_TOKEN}`
      )
    ).json();
    response.status = Status.OK;
    response.type = "json";
    response.body = result;
  } catch (e) {
    console.error(e);
    response.status = Status.BadRequest;
    response.body = "Bad Request";
  }
};
