import { render, screen } from "@testing-library/react";
import Header from "./header";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("header test", () => {
  it("renders correctly", () => {
    render(<Header title="Tabla de incidencias" action={<p>Test</p>} />);
    expect(screen.getByAltText(/logo-desktop/i)).toBeInTheDocument();
    expect(screen.getByAltText(/logo-mobile/i)).toBeInTheDocument();
    expect(screen.getByText(/tabla de incidencias/i)).toBeInTheDocument();
    expect(screen.getByText(/test/i)).toBeInTheDocument();
  });
});
