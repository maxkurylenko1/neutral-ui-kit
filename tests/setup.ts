import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeAll, vi } from "vitest";

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Setup for Radix UI Portal
beforeAll(() => {
  // Create a container for portals
  const portalRoot = document.createElement("div");
  portalRoot.setAttribute("id", "radix-portal");
  document.body.appendChild(portalRoot);
});

// Mock PointerEvent if not available
if (!global.PointerEvent) {
  class PointerEvent extends MouseEvent {
    constructor(type: string, params: PointerEventInit = {}) {
      super(type, params);
    }
  }
  global.PointerEvent = PointerEvent as any;
}

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
} as any;

// Mock scrollIntoView
Element.prototype.scrollIntoView = vi.fn();

// Mock DOMRect
Element.prototype.getBoundingClientRect = vi.fn(() => ({
  width: 100,
  height: 50,
  top: 0,
  left: 0,
  bottom: 50,
  right: 100,
  x: 0,
  y: 0,
  toJSON: () => {},
}));

// Mock HTMLElement methods that Radix UI might use
if (typeof window !== "undefined") {
  // @ts-ignore
  window.HTMLElement.prototype.hasPointerCapture = vi.fn();
  // @ts-ignore
  window.HTMLElement.prototype.scrollIntoView = vi.fn();
}
