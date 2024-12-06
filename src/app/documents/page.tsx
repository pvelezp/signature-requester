"use client";

import { useDocumentContext } from "@/app/context/documents-provider";
import SigningSimulationButton from "../components/signing-simulation-button/signing-simulation-button";
import { columns } from "./columns";
import { DataTable } from "./components/table/table";

const DocumentList = () => {
  const { documents } = useDocumentContext();

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Documents</h2>

      <DataTable
        columns={columns}
        initialData={Array.from(documents.values())}
      />

      <SigningSimulationButton />
    </div>
  );
};

export default DocumentList;
