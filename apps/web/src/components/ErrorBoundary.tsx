import React, { Component, ErrorInfo } from 'react';
import { EosErrorPage } from '@earthos/ui';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <EosErrorPage 
          code={500} 
          title="Application Crashed" 
          message={this.state.error?.message || "An unexpected rendering error occurred. Our engineers have been notified."} 
          onRetry={this.handleReset}
        />
      );
    }

    return this.props.children;
  }
}
