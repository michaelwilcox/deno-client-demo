import { RouterContext, Status } from "https://deno.land/x/oak/mod.ts";
import config from "../config.ts";

export default async (context: RouterContext) => {
  const { response, params } = context;
  if (!params.symbol) {
    response.status = Status.BadRequest;
    response.body = "Bad Request";
    return;
  }
  const ranges = ["1d", "5d", "1m", "1y", "5y"];
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
    let low = null;
    let high = null;

    for (let slice of data) {
      if (
        (high === null && slice.high !== null) ||
        (slice.high !== null && slice.high > high)
      ) {
        high = slice.high;
      }
      if (
        (low === null && slice.low !== null) ||
        (slice.low !== null && slice.low < low)
      ) {
        low = slice.low;
      }
    }

    return { range, data, low, high };
  };
}
