import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white text-black p-6 text-center">
          <h2 className="text-2xl font-normal tracking-tighter mb-4">Something went wrong.</h2>
          <p className="text-sm text-black/60 mb-8 max-w-md">
            The digital environment encountered an unexpected disruption. 
            Please refresh the page or try again later.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 border border-black text-[11px] font-bold tracking-widest uppercase hover:bg-black hover:text-white transition-all"
          >
            Reload System
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
