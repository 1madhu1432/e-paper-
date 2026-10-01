import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children?: ReactNode;
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
    console.error('Uncaught component error:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[80vh] flex items-center justify-center p-6 bg-slate-50">
          <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200/80 shadow-2xl text-center space-y-6 animate-in fade-in">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div>
              <h2 className="text-xl font-bold font-telugu text-slate-900">
                సమస్య ఎదురైంది (Something went wrong)
              </h2>
              <p className="text-xs text-slate-500 font-telugu mt-2 leading-relaxed">
                అప్లికేషన్ ప్రాసెసింగ్‌లో చిన్న సాంకేతిక లోపం జరిగింది. పేజీని పునరుద్ధరించడానికి క్రింది బటన్ క్లిక్ చేయండి.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={this.handleReload}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-3 px-4 rounded-xl shadow-md transition-all cursor-pointer font-telugu"
              >
                <RefreshCw className="w-4 h-4" />
                <span>రీలోడ్ చేయండి (Reload)</span>
              </button>
              <button
                onClick={this.handleGoHome}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-900 text-amber-300 text-xs font-bold py-3 px-4 rounded-xl shadow-md transition-all cursor-pointer font-telugu"
              >
                <Home className="w-4 h-4 text-amber-400" />
                <span>హోమ్‌కి వెళ్లండి (Go Home)</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
