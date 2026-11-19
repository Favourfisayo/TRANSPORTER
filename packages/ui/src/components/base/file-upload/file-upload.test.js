import { expect, test } from "bun:test";
import { validateUpload } from "./file-upload";

test("upload validation checks allowed extensions and size", () => {
  expect(validateUpload({ name: "ticket.PDF", size: 100 }, ["pdf"], 100)).toBe("");
  expect(validateUpload({ name: "ticket.exe", size: 100 }, ["pdf"], 100)).toContain("PDF");
  expect(validateUpload({ name: "ticket.pdf", size: 101 }, ["pdf"], 100)).toContain("larger");
});
