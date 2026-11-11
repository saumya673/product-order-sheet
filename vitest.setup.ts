import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// jsdom has <dialog> but not showModal() or close(), so add minimal versions.
HTMLDialogElement.prototype.showModal = function showModal() {
  this.setAttribute("open", "");
};
HTMLDialogElement.prototype.close = function close() {
  this.removeAttribute("open");
  this.dispatchEvent(new Event("close"));
};

// Remove rendered HTML after each test so tests don't see each other's output
afterEach(cleanup);
