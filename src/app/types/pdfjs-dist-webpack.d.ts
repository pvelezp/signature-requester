declare module "pdfjs-dist/webpack" {
  import { PDFDocumentProxy, PDFPageProxy } from "pdfjs-dist";

  export function getDocument(source: string | Uint8Array | { url: string }): {
    promise: Promise<PDFDocumentProxy>;
  };

  export type { PDFDocumentProxy, PDFPageProxy };
}
