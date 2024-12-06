import { useDocumentContext } from "@/app/context/documents-provider";
import { fireEvent, render, screen } from "@testing-library/react";
import SigningSimulationButton from "./signing-simulation-button";

jest.mock("@/app/context/documents-provider", () => ({
  useDocumentContext: jest.fn(),
}));

describe("SigningSimulationButton", () => {
  const mockUpdateSignerStatus = jest.fn();
  const mockDocuments = new Map([
    [
      "doc1",
      {
        id: "doc1",
        name: "Document 1",
        signers: [
          { id: "signer1", email: "signer1@example.com", status: "pending" },
          { id: "signer2", email: "signer2@example.com", status: "pending" },
        ],
      },
    ],
    [
      "doc2",
      {
        id: "doc2",
        name: "Document 2",
        signers: [
          { id: "signer3", email: "signer3@example.com", status: "pending" },
        ],
      },
    ],
  ]);

  beforeEach(() => {
    jest.clearAllMocks();
    (useDocumentContext as jest.Mock).mockReturnValue({
      updateSignerStatus: mockUpdateSignerStatus,
      documents: mockDocuments,
    });
  });

  it("renders the button correctly", () => {
    render(<SigningSimulationButton />);
    const button = screen.getByRole("button", { name: /simulate signing/i });
    expect(button).toBeInTheDocument();
  });

  it("calls updateSignerStatus with correct arguments when clicked", () => {
    render(<SigningSimulationButton />);
    const button = screen.getByRole("button", { name: /simulate signing/i });

    fireEvent.click(button);

    expect(mockUpdateSignerStatus).toHaveBeenCalledTimes(1);
    const [documentId, signerId, randomStatus] =
      mockUpdateSignerStatus.mock.calls[0];
    expect(mockDocuments.has(documentId)).toBeTruthy();
    expect(
      mockDocuments.get(documentId)?.signers.some((s) => s.id === signerId)
    ).toBeTruthy();
    expect(["signed", "declined"]).toContain(randomStatus);
  });

  it("does nothing if documents map is empty", () => {
    (useDocumentContext as jest.Mock).mockReturnValue({
      updateSignerStatus: mockUpdateSignerStatus,
      documents: new Map(),
    });

    render(<SigningSimulationButton />);
    const button = screen.getByRole("button", { name: /simulate signing/i });

    fireEvent.click(button);

    expect(mockUpdateSignerStatus).not.toHaveBeenCalled();
  });

  it("does nothing if no document has signers", () => {
    const emptySignersDocuments = new Map([
      ["doc1", { id: "doc1", name: "Document 1", signers: [] }],
    ]); // No signers in documents

    (useDocumentContext as jest.Mock).mockReturnValue({
      updateSignerStatus: mockUpdateSignerStatus,
      documents: emptySignersDocuments,
    });

    render(<SigningSimulationButton />);
    const button = screen.getByRole("button", { name: /simulate signing/i });

    fireEvent.click(button);

    expect(mockUpdateSignerStatus).not.toHaveBeenCalled();
  });
});
