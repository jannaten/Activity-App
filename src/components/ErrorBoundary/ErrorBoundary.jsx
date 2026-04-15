import React from 'react';
import styles from './ErrorBoundary.module.scss';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div role="alert" className={styles.container}>
          <div className={styles.icon}>⚠️</div>
          <h2>Something went wrong</h2>
          <p>{this.state.error?.message}</p>
          <button
            className={styles.retryBtn}
            onClick={() => this.setState({ hasError: false, error: null })}
          >
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
