import { Document } from "@/app/types/document";
import { render, screen } from "@testing-library/react";
import { columns } from "../../columns";
import { DataTable } from "./table";

const mockInitialData: Document[] = [
  {
    id: "66acf783cf61c47c001cff1c",
    name: "Ultimate Contract.pdf",
    file: {} as File,
    signers: [
      {
        id: "787huiduksaj6",
        email: "pablo.velez.coder@gmail.com",
        status: "pending",
      },
    ],
  },
];

describe("table test", () => {
  it("renders correctly", () => {
    render(<DataTable initialData={mockInitialData} columns={columns} />);
    expect(
      screen.getByPlaceholderText(/buscar por título.../i)
    ).toBeInTheDocument();
    expect(screen.getByText(/document name/i)).toBeInTheDocument();
    expect(screen.getByText(/ultimate contract/i)).toBeInTheDocument();
    expect(screen.getByText(/signers emails/i)).toBeInTheDocument();
    expect(
      screen.getByText(/pablo.velez.coder@gmail.com/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/pending/i)).toBeInTheDocument();
  });
});
