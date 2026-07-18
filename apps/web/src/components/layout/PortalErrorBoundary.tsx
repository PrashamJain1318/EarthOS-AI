import React, { Component, ErrorInfo, ReactNode } from 'react';
import { EosButton, Typography } from '@earthos/ui';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class PortalErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in portal:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-full w-full p-12 bg-red-50/50 dark:bg-red-900/10 rounded-2xl border border-red-500/20 text-center space-y-6">
          <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded-full text-red-600 dark:text-red-400">
            <AlertTriangle size={48} />
          </div>
          
          <div className="space-y-2">
            <Typography variant="h3" className="text-red-700 dark:text-red-300 font-bold">
              Something went wrong
            </Typography>
            <Typography variant="body" className="text-red-600/80 dark:text-red-400/80 max-w-md">
              We've encountered an unexpected error in this module. Our telemetry team has been notified.
            </Typography>
            {this.state.error && (
              <div className="mt-4 p-4 bg-white dark:bg-black/40 rounded-lg text-left text-xs font-mono text-red-800 dark:text-red-200 overflow-auto max-w-2xl border border-red-200 dark:border-red-800">
                {this.state.error.message}
              </div>
            )}
          </div>

          <EosButton onClick={this.handleReset} variant="outline" className="flex items-center gap-2 border-red-500/50 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20">
            <RefreshCcw size={16} />
            Reload Portal
          </EosButton>
        </div>
      );
    }

    return this.props.children;
  }
}
