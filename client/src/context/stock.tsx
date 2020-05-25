import React from "react";
import { Action, ConsumerArgs, ProviderArgs, Stock } from "../types";

export const STOCK_DATA_FETCH_REQUEST = "STOCK_DATA_FETCH_REQUEST";
export const STOCK_DATA_FETCH_SUCCESS = "STOCK_DATA_FETCH_SUCCESS";
export const STOCK_DATA_FETCH_FAILURE = "STOCK_DATA_FETCH_FAILURE";

interface StockAction extends Action {
  type:
    | typeof STOCK_DATA_FETCH_REQUEST
    | typeof STOCK_DATA_FETCH_SUCCESS
    | typeof STOCK_DATA_FETCH_FAILURE;
  payload?: Stock;
}
type Dispatch = (action: StockAction) => void;

interface StockState {
  error?: boolean;
  loading: boolean;
  stock: Stock;
}

const initialState: StockState = {
  loading: false,
  stock: {},
};
// TODO: fix action type
function stockReducer(state = initialState, action: any) {
  switch (action.type) {
    case STOCK_DATA_FETCH_REQUEST: {
      return { loading: true, stock: {} };
    }
    case STOCK_DATA_FETCH_SUCCESS: {
      return {
        loading: false,
        stock: action.payload,
      };
    }
    case STOCK_DATA_FETCH_FAILURE: {
      return {
        error: true,
        loading: false,
        stock: {},
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
        console.log("context from child", context);
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

export async function updateStock(dispatch: Dispatch, symbol: string) {
  dispatch({ type: STOCK_DATA_FETCH_REQUEST });
  try {
    const res = await fetch(`${process.env.REACT_APP_SERVER}/symbol/${symbol}`);
    const data = await res.json();
    dispatch({ type: STOCK_DATA_FETCH_SUCCESS, payload: data.quote });
    console.log(data);
  } catch (e) {
    console.warn(e);
    dispatch({ type: STOCK_DATA_FETCH_FAILURE });
  }
}

export { StockConsumer, StockProvider, useStockState, useStockDispatch };
