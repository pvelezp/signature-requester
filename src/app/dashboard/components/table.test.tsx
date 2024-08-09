import { render, screen } from "@testing-library/react";
import { DataTable } from "./table";
import { Incidence, columns } from "./columns";

const mockInitialData: Incidence[] = [
  {
    id: "66acf783cf61c47c001cff1c",
    dateLastActivity: "2024-08-08T17:00:53.169Z",
    desc: "El sistema de navegación ha perdido contacto con los satélites de referencia.",
    idList: "66ace0603bc606b5b05c86bc",
    labels: [
      {
        id: "66ace05a697a512f2859766c",
        name: "CRÍTICA",
      },
    ],
    idLabels: ["66ace05a697a512f2859766c"],
    name: "Error en la Navegación Estelar 🛰️",
  },
];

describe("table test", () => {
  it("renders correctly", () => {
    const { debug } = render(
      <DataTable initialData={mockInitialData} columns={columns} />
    );
    expect(
      screen.getByPlaceholderText(/buscar por título.../i)
    ).toBeInTheDocument();
    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText(/fecha/i)).toBeInTheDocument();
    expect(screen.getByText(/título/i)).toBeInTheDocument();
    expect(screen.getByText(/prioridad/i)).toBeInTheDocument();
    expect(screen.getByText(/estado/i)).toBeInTheDocument();
    expect(screen.getByText(/acciones/i)).toBeInTheDocument();
    debug(undefined, Infinity);
  });
});
