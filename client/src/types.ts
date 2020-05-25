import { ReactElement, ReactNode } from "react";

export interface LatestNewsArticle {
  content: string;
  engagement: number;
  engagementRate: number;
  link: string;
  pubDate: string;
  secondsToRead: number;
  sourceName: string;
  title: string;
  updatedAt: string;
}

export interface Action {
  type: string;
  payload?: any;
}

export interface ProviderArgs {
  children: ReactNode;
}

export interface ConsumerArgs {
  children(context: any): ReactElement;
}

export interface Stock {
  avgTotalVolume?: number;
  calculationPrice?: string;
  change?: number;
  changePercent?: number;
  close?: number;
  closeSource?: string;
  closeTime?: string;
  companyName?: string;
  delayedPrice?: number;
  delayedPriceTime?: string;
  extendedChange?: number;
  extendedChangePercent?: number;
  extendedPrice?: number;
  extendedPriceTime?: string;
  high?: number;
  highSource?: number;
  highTime?: string;
  iexAskPrice?: number;
  iexAskSize?: number;
  iexBidPrice?: number;
  iexBidSize?: number;
  iexClose?: number;
  iexCloseTime?: number;
  iexLastUpdated?: string;
  iexMarketPercent?: number;
  iexOpen?: number;
  iexOpenTime?: string;
  iexRealtimePrice?: number;
  iexRealtimeSize?: number;
  iexVolume?: number;
  isUSMarketOpen?: string;
  lastTradeTime?: number;
  latestPrice?: number;
  latestSource?: string;
  latestTime?: string;
  latestUpdate?: number;
  latestVolume?: number;
  low?: number;
  lowSource?: string;
  lowTime?: number;
  marketCap?: number;
  oddLotDelayedPrice?: number;
  oddLotDelayedPriceTime?: string;
  open?: number;
  openSource?: string;
  openTime?: string;
  peRatio?: number;
  previousClose?: number;
  previousVolume?: number;
  primaryExchange?: string;
  symbol?: string;
  volume?: number;
  week52High?: number;
  week52Low?: number;
  ytdChange?: number;
}
