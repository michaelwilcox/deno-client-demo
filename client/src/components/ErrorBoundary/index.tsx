import React, { ReactElement } from "react";

interface Props {
  fallback: ReactElement;
}

interface State {
  hasError: boolean;
  error: any;
}

// Error boundaries currently have to be classes.
export default class ErrorBoundary extends React.Component<Props, State> {
  state = { hasError: false, error: null };
  static getDerivedStateFromError(error: any) {
    return {
      hasError: true,
      error,
    };
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}
