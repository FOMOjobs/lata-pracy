import "@testing-library/jest-dom/vitest";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => cleanup());

// jsdom has no native modal top layer. Browser focus trapping is not simulated.
HTMLDialogElement.prototype.showModal = function () {
  this.setAttribute("open", "");
};
HTMLDialogElement.prototype.close = function () {
  this.removeAttribute("open");
};
vi.mock("next/navigation", () => ({ useRouter: () => ({ push: routerPush }) }));
export const routerPush = vi.fn();
