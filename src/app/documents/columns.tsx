import { Badge } from "@/components/ui/badge";
import { TableCell } from "@/components/ui/table";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Document } from "../types/document";
import getVariantByStatus from "../utils/get-badge-variant";

export const columns: ColumnDef<Document>[] = [
  {
    accessorKey: "name",
    header: "Document name",
    cell: ({ row }) => {
      const name = row.original.name;

      return (
        <Link
          className="font-bold underline"
          href={`/documents/${row.original.id}`}
        >
          {name}
        </Link>
      );
    },
  },
  {
    id: "signers",
    header: "Signers emails",
    cell: ({ row }) => {
      const signers = row.original.signers;

      return (
        <TableCell className="flex justify-start flex-col gap-2">
          {signers?.map((signer) => (
            <div
              key={signer.id}
              className="flex gap-2 justify-between items-center"
            >
              <span>{signer.email}</span>

              <Badge variant={getVariantByStatus(signer.status)}>
                {signer.status}
              </Badge>
            </div>
          ))}
        </TableCell>
      );
    },
  },
];
