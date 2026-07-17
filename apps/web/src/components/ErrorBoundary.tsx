import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Typography, EosCard } from '@earthos/ui';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an unhandled rendering crash:', error, errorInfo);
    this.setState({ errorInfo });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 max-w-3xl mx-auto py-12 select-text text-left">
          <EosCard variant="glass" className="p-8 border-red-500/20 bg-red-500/5 flex flex-col gap-6">
            <div>
              <Typography variant="h3" className="text-red-500 font-bold font-display">
                Rendering Execution Crash Detected
              </Typography>
              <Typography variant="small" className="text-gray-400">
                React Error Boundary captured a runtime component crash.
              </Typography>
            </div>

            <hr className="border-[#B0BEC5]/20 dark:border-[#263238]/30" />

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold text-red-400 font-mono uppercase tracking-wider">Error Details</span>
                <span className="text-sm font-semibold text-[#1F2937] dark:text-[#F8FAFC]">
                  {this.state.error?.name}: {this.state.error?.message}
                </span>
              </div>

              {this.state.errorInfo && (
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs font-bold text-gray-400 font-mono uppercase tracking-wider">Component Stack Trace</span>
                  <pre className="p-4 bg-black/30 dark:bg-black/50 text-[10px] text-gray-300 font-mono rounded-xl overflow-x-auto whitespace-pre-wrap leading-normal border border-white/5">
                    {this.state.errorInfo.componentStack}
                  </pre>
                </div>
              )}
            </div>

            <hr className="border-[#B0BEC5]/20 dark:border-[#263238]/30" />

            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-xl text-xs font-bold text-red-500 transition-colors uppercase tracking-wider text-center"
            >
              Force Reload App Session
            </button>
          </EosCard>
        </div>
      );
    }

    return this.props.children;
  }
}
export default ErrorBoundary;
