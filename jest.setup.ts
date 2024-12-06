import "@testing-library/jest-dom";
jest.mock("pdfjs-dist/webpack", () => ({
  getDocument: jest.fn().mockReturnValue({
    promise: Promise.resolve({
      getPage: jest.fn().mockResolvedValue({}),
    }),
  }),
}));
