import { useDocumentContext } from "@/app/context/documents-provider";
import { fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/navigation";
import RecentDocuments from "./recent-documents";

jest.mock("@/app/context/documents-provider", () => ({
  useDocumentContext: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../document-preview/document-preview", () => ({
  __esModule: true,
  default: ({ handleClick }: { handleClick: () => void }) => (
    <div onClick={handleClick}>Document Preview</div>
  ),
}));

const mockPush = jest.fn();

describe("RecentDocuments", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    (useDocumentContext as jest.Mock).mockReturnValue({
      documents: new Map([
        ["1", { id: "1", file: "document-1.pdf" }],
        ["2", { id: "2", file: "document-2.pdf" }],
      ]),
    });
  });

  it("renders 'Recent documents' title", () => {
    render(<RecentDocuments />);
    const titleElement = screen.getByText(/Recent documents/i);
    expect(titleElement).toBeInTheDocument();
  });

  it("renders documents from the context", () => {
    render(<RecentDocuments />);

    const documentPreviews = screen.getAllByText(/document preview/i);
    expect(documentPreviews).toHaveLength(2);
  });

  it("calls router.push when a document is clicked", () => {
    render(<RecentDocuments />);

    const documentPreviews = screen.getAllByText(/document preview/i);
    fireEvent.click(documentPreviews[0]);

    expect(mockPush).toHaveBeenCalledWith("/documents/1");
  });

  it("calls router.push when 'See all' button is clicked", () => {
    render(<RecentDocuments />);

    const seeAllButton = screen.getByText(/see all/i);
    fireEvent.click(seeAllButton);

    expect(mockPush).toHaveBeenCalledWith("/documents");
  });
});
