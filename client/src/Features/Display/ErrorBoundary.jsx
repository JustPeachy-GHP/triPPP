import { Component } from "react";
import PropTypes from "prop-types";

class ErrorBoundary extends Component {
  state = { hasError: false };

  componentDidCatch(error, errorInfo) {
    // You can log the error or handle it in a custom way
    console.error(error, errorInfo);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      // Render a fallback UI when an error occurs
      return <div>Something went wrong.</div>;
    }
    return this.props.children;
  }
}

// Add PropTypes validation for the 'children' prop
ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired, // Requires 'children' to be a React node
};

export default ErrorBoundary;