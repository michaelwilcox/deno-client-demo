import { RouteComponentProps } from "@reach/router";

export default ({
  component,
  ...routerProps
}: {
  component: (routerProps: RouteComponentProps) => JSX.Element;
} & RouteComponentProps) => {
  return component(routerProps);
};
