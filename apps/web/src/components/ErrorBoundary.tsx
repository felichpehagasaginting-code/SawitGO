'use client';

import React, { Component, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    // Logging ke konsol untuk debugging, UI tetap tampil fallback
    // eslint-disable-next-line no-console
    console.error('[SawitGO Dashboard] Unhandled error:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#F8F9FB] p-6 font-sans">
          <div className="max-w-md text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#FEF3F2] text-[#B42318] flex items-center justify-center mx-auto">
              <svg
                className="w-7 h-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>
            </div>
            <h1 className="text-lg font-extrabold text-[#101828] mt-4">
              Terjadi kesalahan tak terduga
            </h1>
            <p className="text-sm text-[#667085] mt-1">
              Dashboard gagal merender komponen. Muat ulang halaman untuk mencoba lagi.
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false });
                window.location.reload();
              }}
              className="mt-5 px-5 py-2.5 rounded-xl bg-[#101828] hover:bg-[#1D2939] text-white font-bold text-sm transition-colors cursor-pointer"
            >
              Muat Ulang Halaman
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}