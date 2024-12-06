import { render, screen } from "@testing-library/react";
import Header from "./header";

describe("Header", () => {
  it("renders 'Sign Requester' link", () => {
    render(<Header />);

    const linkElement = screen.getByText(/Sign Requester/i);
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/");
  });

  it("renders 'My Documents' link", () => {
    render(<Header />);

    const linkElement = screen.getByText(/my documents/i);
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/documents");
  });

  it("has the correct class names", () => {
    render(<Header />);

    const headerElement = screen.getByRole("banner");
    expect(headerElement).toHaveClass(
      "flex justify-between items-center p-6 w-full shadow-sm"
    );

    const signRequesterLink = screen.getByText(/sign requester/i);
    expect(signRequesterLink).toHaveClass("font-bold text-lg");

    const myDocumentsLink = screen.getByText(/my documents/i);
    expect(myDocumentsLink).toHaveClass("font-semibold text-gray-600");
  });
});
