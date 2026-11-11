import "@testing-library/jest-dom/vitest";
import { afterEach, beforeEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import { clearCaseSessions } from "@/lib/case-session";

beforeEach(() => clearCaseSessions());
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

// jsdom has no native modal top layer. Browser focus trapping is not simulated.
HTMLDialogElement.prototype.showModal = function () {
  this.setAttribute("open", "");
};
HTMLDialogElement.prototype.close = function () {
  this.removeAttribute("open");
};
vi.mock("next/navigation", () => ({ useRouter: () => ({ push: routerPush }) }));
export const routerPush = vi.fn();
