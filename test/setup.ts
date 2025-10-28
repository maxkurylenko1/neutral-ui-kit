import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// cleanup after each test case
afterEach(() => {
  cleanup();
});
