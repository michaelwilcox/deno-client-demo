import React from "react";
import { StockProvider } from "../../contexts/stock";
import DashboardHeader from "../../components/DashboardHeader";
import Routing from "../../routing";
import "./style.css";

interface Props {}

export default function AppShell(props: Props) {
  return (
    <StockProvider>
      <DashboardHeader />
      <Routing />
    </StockProvider>
  );
}
