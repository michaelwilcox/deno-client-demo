import React from "react";
import {
  Action,
  ConsumerArgs,
  ProviderArgs,
  StockChartData,
  StockQuoteData,
} from "../types";

export const STOCK_QUOTE_DATA_FETCH_REQUEST = "STOCK_QUOTE_DATA_FETCH_REQUEST";
export const STOCK_QUOTE_DATA_FETCH_SUCCESS = "STOCK_QUOTE_DATA_FETCH_SUCCESS";
export const STOCK_QUOTE_DATA_FETCH_FAILURE = "STOCK_QUOTE_DATA_FETCH_FAILURE";
export const STOCK_CHART_DATA_FETCH_REQUEST = "STOCK_CHART_DATA_FETCH_REQUEST";
export const STOCK_CHART_DATA_FETCH_SUCCESS = "STOCK_CHART_DATA_FETCH_SUCCESS";
export const STOCK_CHART_DATA_FETCH_FAILURE = "STOCK_CHART_DATA_FETCH_FAILURE";

interface StockQuoteAction extends Action {
  type:
    | typeof STOCK_QUOTE_DATA_FETCH_REQUEST
    | typeof STOCK_QUOTE_DATA_FETCH_SUCCESS
    | typeof STOCK_QUOTE_DATA_FETCH_FAILURE;
  payload?: StockQuoteData;
}
interface StockChartAction extends Action {
  type:
    | typeof STOCK_CHART_DATA_FETCH_REQUEST
    | typeof STOCK_CHART_DATA_FETCH_SUCCESS
    | typeof STOCK_CHART_DATA_FETCH_FAILURE;
  payload?: StockChartData;
}
type StockDispatch = (action: StockQuoteAction | StockChartAction) => void;

interface StockState {
  error?: boolean;
  loading: boolean;
  quoteData: StockQuoteData;
  chartData: StockChartData;
}

const initialState: StockState = {
  loading: false,
  quoteData: {},
  chartData: {},
};
// TODO: fix action type
function stockReducer(state = initialState, action: any) {
  switch (action.type) {
    case STOCK_QUOTE_DATA_FETCH_REQUEST: {
      return { ...state, loading: true, quoteData: {} };
    }
    case STOCK_QUOTE_DATA_FETCH_SUCCESS: {
      return {
        ...state,
        loading: false,
        quoteData: action.payload,
      };
    }
    case STOCK_QUOTE_DATA_FETCH_FAILURE: {
      return {
        ...state,
        error: true,
        loading: false,
      };
    }
    case STOCK_CHART_DATA_FETCH_REQUEST: {
      return { ...state, loading: true, chartData: {} };
    }
    case STOCK_CHART_DATA_FETCH_SUCCESS: {
      return {
        ...state,
        loading: false,
        chartData: action.payload,
      };
    }
    case STOCK_CHART_DATA_FETCH_FAILURE: {
      return {
        ...state,
        error: true,
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
}

const StockStateContext = React.createContext(initialState);
const StockDispatchContext = React.createContext<StockDispatch | undefined>(
  undefined
);

function StockProvider(args: ProviderArgs) {
  const { children } = args;
  const [state, dispatch] = React.useReducer(stockReducer, initialState);
  return (
    <StockStateContext.Provider value={state}>
      <StockDispatchContext.Provider value={dispatch}>
        {children}
      </StockDispatchContext.Provider>
    </StockStateContext.Provider>
  );
}

function StockConsumer(args: ConsumerArgs) {
  const { children } = args;
  return (
    <StockStateContext.Consumer>
      {(context) => {
        if (context === undefined) {
          throw new Error("StockConsumer must be used within a StockProvider");
        }
        return children(context);
      }}
    </StockStateContext.Consumer>
  );
}

function useStockState() {
  const context = React.useContext(StockStateContext);
  if (context === undefined) {
    throw new Error("useStockState must be used within a StockProvider");
  }
  return context;
}
function useStockDispatch() {
  const context = React.useContext(StockDispatchContext);
  if (context === undefined) {
    throw new Error("useStockDispatch must be used within a StockProvider");
  }
  return context;
}

export async function fetchStockQuote(dispatch: StockDispatch, symbol: string) {
  dispatch({ type: STOCK_QUOTE_DATA_FETCH_REQUEST });
  try {
    const res = await fetch(`${process.env.REACT_APP_SERVER}/symbol/${symbol}`);
    const data = await res.json();
    dispatch({ type: STOCK_QUOTE_DATA_FETCH_SUCCESS, payload: data.quote });
  } catch (e) {
    console.warn(e);
    dispatch({ type: STOCK_QUOTE_DATA_FETCH_FAILURE });
  }
}

export async function fetchStockChartData(
  dispatch: StockDispatch,
  symbol: string
) {
  dispatch({ type: STOCK_CHART_DATA_FETCH_REQUEST });
  try {
    const res = await fetch(
      `${process.env.REACT_APP_SERVER}/chart-data/${symbol}`
    );
    const data = await res.json();
    dispatch({ type: STOCK_CHART_DATA_FETCH_SUCCESS, payload: data });
  } catch (e) {
    console.warn(e);
    dispatch({ type: STOCK_CHART_DATA_FETCH_FAILURE });
  }
}

export { StockConsumer, StockProvider, useStockState, useStockDispatch };
