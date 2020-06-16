import {
  APIReaderStockChart,
  APIReaderStockQuote,
  APIReaderLatestNews,
} from "./typings/app/app";

// Note: this code was borrowed
// from https://github.com/gaearon/suspense-experimental-github-demo/blob/master/src/api.js
let wrapPromise = <T>(promise: Promise<T>): { read: () => T } => {
  var status = "pending";
  let result: T;
  let suspender = promise.then(
    (r) => {
      status = "success";
      result = r;
    },
    (e) => {
      status = "error";
      result = e;
    }
  );
  return {
    read() {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw result;
      }
      return result; // success
    },
  };
};

async function getFromServer(url: string) {
  const response = await fetch(url);
  if (response.status !== 200) {
    throw new Error("GitHub API returned Error " + response.status);
  }
  return response.json();
}

export const fetchStockQuote = (symbol: string): APIReaderStockQuote => {
  return wrapPromise(
    getFromServer(`${process.env.REACT_APP_SERVER}/symbol/${symbol}`)
  );
};

export const fetchStockChart = (symbol: string): APIReaderStockChart => {
  return wrapPromise(
    getFromServer(`${process.env.REACT_APP_SERVER}/chart-data/${symbol}`)
  );
};

export const fetchLatestNews = (): APIReaderLatestNews => {
  return wrapPromise(getFromServer(`${process.env.REACT_APP_SERVER}/rss`));
};

// dispatch({ type: STOCK_QUOTE_DATA_FETCH_REQUEST });
// try {
//   const res = await fetch(`${process.env.REACT_APP_SERVER}/symbol/${symbol}`);
//   const data = await res.json();
//   dispatch({ type: STOCK_QUOTE_DATA_FETCH_SUCCESS, payload: data.quote });
// } catch (e) {
//   console.warn(e);
//   dispatch({ type: STOCK_QUOTE_DATA_FETCH_FAILURE });
// }
