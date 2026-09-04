"use client";

import { Component, type ReactNode } from "react";

type ClaimFormErrorBoundaryProps = {
  children: ReactNode;
  fallback: ReactNode;
};

type ClaimFormErrorBoundaryState = {
  hasError: boolean;
};

/** Prevents a claim-form crash from wiping the hero to a blank blue background. */
export default class ClaimFormErrorBoundary extends Component<
  ClaimFormErrorBoundaryProps,
  ClaimFormErrorBoundaryState
> {
  state: ClaimFormErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ClaimFormErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error("[HeroClaimForm] crashed:", error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}
