import { removePdfExtension } from "./remove-pdf-extension";

describe("removePdfExtension", () => {
  it("should remove the '.pdf' extension", () => {
    expect(removePdfExtension("document.pdf")).toBe("document");
  });

  it("should not modify a string without '.pdf'", () => {
    expect(removePdfExtension("document.txt")).toBe("document.txt");
  });

  it("should return the same string if it doesn't have the '.pdf' extension", () => {
    expect(removePdfExtension("document")).toBe("document");
  });
});
