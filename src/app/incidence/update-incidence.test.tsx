import { render, screen } from "@testing-library/react";
import IncidenceFormNew from "./page";

const mockRouter = {
  push: jest.fn(),
  back: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
  route: "/",
  pathname: "/",
  query: {},
  asPath: "/",
};

const mockSearchParams = {
  get: jest.fn((key: string) => {
    const params: { [key: string]: string } = {
      idList: "12345",
    };
    return params[key];
  }),
  has: jest.fn((key: string) => {
    const params = ["idList"];
    return params.includes(key);
  }),
  set: jest.fn(),
  delete: jest.fn(),
};

jest.mock("next/navigation", () => ({
  useRouter: () => mockRouter,
  useSearchParams: () => mockSearchParams,
}));

describe("incidence update test", () => {
  it("renders correctly", () => {
    render(<IncidenceFormNew />);

    expect(screen.getByText(/actualizar incidencia/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/título/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/descripción/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/prioridad/i)).toBeInTheDocument();
    expect(screen.getByText("Actualizar")).toBeInTheDocument();
  });
});
