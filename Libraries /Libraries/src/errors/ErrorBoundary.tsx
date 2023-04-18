import { Component, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }
  public state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }
  // public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
  //   console.error('Uncaught error', error, errorInfo);
  // }
  render(): ReactNode {
    if (this.state.hasError) {
      return <h1>Sorry... there was an error</h1>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
