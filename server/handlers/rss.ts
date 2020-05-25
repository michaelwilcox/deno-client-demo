import { RouterContext, Status } from "https://deno.land/x/oak/mod.ts";
import config from "../config.ts";

export default async (context: RouterContext) => {
  const { response } = context;
  const { KOYFIN_BASE } = config;
  try {
    await fetch(`${KOYFIN_BASE}?limit=100&skip=0`)
      .then((res) => res.json())
      .then((res) => {
        response.status = Status.OK;
        response.body = res;
      });
  } catch (e) {
    console.error(e);
    response.status = Status.BadRequest;
    response.body = "Bad Request";
  }
};
