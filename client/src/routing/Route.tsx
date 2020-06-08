import { RouteComponentProps } from "@reach/router";

export interface RouteProps {
  path: string;
}

export default ({
  component,
  ...routerProps
}: {
  component: (routerProps: RouteComponentProps) => any; // TODO:@mike return type here w/ lazy
} & RouteComponentProps) => {
  return component(routerProps);
};
