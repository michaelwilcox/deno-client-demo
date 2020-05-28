import React from "react";
import { Action, ConsumerArgs, ProviderArgs, StockQuoteData } from "../types";

export const STOCK_QUOTE_DATA_FETCH_REQUEST = "STOCK_QUOTE_DATA_FETCH_REQUEST";
export const STOCK_QUOTE_DATA_FETCH_SUCCESS = "STOCK_QUOTE_DATA_FETCH_SUCCESS";
export const STOCK_QUOTE_DATA_FETCH_FAILURE = "STOCK_QUOTE_DATA_FETCH_FAILURE";

interface StockAction extends Action {
  type:
    | typeof STOCK_QUOTE_DATA_FETCH_REQUEST
    | typeof STOCK_QUOTE_DATA_FETCH_SUCCESS
    | typeof STOCK_QUOTE_DATA_FETCH_FAILURE;
  payload?: StockQuoteData;
}
type Dispatch = (action: StockAction) => void;

interface StockState {
  error?: boolean;
  loading: boolean;
  quoteData: StockQuoteData;
}

const initialState: StockState = {
  loading: false,
  quoteData: {},
};
// TODO: fix action type
function stockReducer(state = initialState, action: any) {
  switch (action.type) {
    case STOCK_QUOTE_DATA_FETCH_REQUEST: {
      return { loading: true, quoteData: {} };
    }
    case STOCK_QUOTE_DATA_FETCH_SUCCESS: {
      return {
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
    default: {
      return state;
    }
  }
}

const StockStateContext = React.createContext(initialState);
const StockDispatchContext = React.createContext<Dispatch | undefined>(
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

export async function fetchStockQuote(dispatch: Dispatch, symbol: string) {
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

export { StockConsumer, StockProvider, useStockState, useStockDispatch };
