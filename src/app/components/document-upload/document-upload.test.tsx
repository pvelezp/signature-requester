import { useDocumentContext } from "@/app/context/documents-provider";
import { fireEvent, render, screen } from "@testing-library/react";
import DocumentUpload from "./document-upload";

jest.mock("@/app/context/documents-provider");

describe("DocumentUpload", () => {
  const mockAddDocument = jest.fn();

  beforeEach(() => {
    (useDocumentContext as jest.Mock).mockReturnValue({
      addDocument: mockAddDocument,
    });
  });

  it("disables submit button when no file or signers are added", () => {
    render(<DocumentUpload />);
    const submitButton = screen.getByText(/send request/i);
    expect(submitButton).toBeDisabled();
  });

  it("shows error when adding an invalid email", () => {
    render(<DocumentUpload />);
    const emailInput = screen.getByPlaceholderText(/enter email/i);
    const addButton = screen.getByTestId("add-button");

    fireEvent.change(emailInput, {
      target: { value: "test-email@withoutcom" },
    });
    fireEvent.click(addButton);

    expect(screen.getByText(/invalid email address/i)).toBeInTheDocument();
  });
});
