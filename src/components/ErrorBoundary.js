import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  componentDidCatch() {
    this.setstate({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <h1>Opps! Ran Into An Error</h1>;
    } else return this.props.children;
  }
}

export default ErrorBoundary;
