import { RouterContext, Status } from "https://deno.land/x/oak/mod.ts";
import config from "../config.ts";

export default async (context: RouterContext) => {
  const { response, params } = context;
  if (!params.symbol) {
    response.status = Status.BadRequest;
    response.body = "Bad Request";
    return;
  }
  const ranges = ["dynamic", "5d", "1mm", "1y", "5y"];
  const { IEX_API_BASE, IEX_TOKEN } = config;
  let promises = [];
  try {
    for (let range of ranges) {
      promises.push(
        fetch(
          `${IEX_API_BASE}/stock/${params.symbol}/chart/${range}?token=${IEX_TOKEN}`
        )
          .then((r) => r.json())
          .then(normalize(range))
      );
    }
    await Promise.all(promises).then((res) => {
      response.status = Status.OK;
      response.body = res;
    });
  } catch (e) {
    console.error(e);
    response.status = Status.BadRequest;
    response.body = "Bad Request";
  }
};

function normalize(range: string) {
  return (data: any) => {
    return { range, data };
  };
}
