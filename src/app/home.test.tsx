import { render, screen } from "@testing-library/react";
import Home from "./page";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("home test", () => {
  it("renders correctly", () => {
    render(<Home />);
    expect(screen.getByText(/bienvenido a galactic corp/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /explorando nuevas fronteras del espacio, elevando la humanidad hacia un futuro ilimitado 🚀/i
      )
    ).toBeInTheDocument();

    expect(screen.getAllByText(/acceder/i).length).toBe(2);
  });
});
