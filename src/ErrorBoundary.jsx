import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100">
          <div className="p-6 rounded-2xl bg-white shadow text-center">
            <h1 className="text-xl font-bold mb-2">Something went wrong.</h1>
            <p className="text-sm text-slate-600">
              Try refreshing the page or checking the console.
            </p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
