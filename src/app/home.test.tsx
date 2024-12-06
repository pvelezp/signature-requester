import { render, screen } from "@testing-library/react";
import Home from "./page";
import { DocumentProvider } from "./context/documents-provider";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("home test", () => {
  it("renders correctly", () => {
    render(
      <DocumentProvider>
        <Home />
      </DocumentProvider>
    );
    expect(screen.getByText(/upload document/i)).toBeInTheDocument();
    expect(screen.getByText(/request signature/i)).toBeInTheDocument();
  });
});
