"use client";

import axios from "@/api/instance.client";
import { Button } from "@/components/ui/button";
import { TableCell } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { API_KEY, TOKEN } from "@/config/config";
import {
  doneListId,
  listStatusMapping,
  pendingListId,
} from "@/constants/constants";
import { formatDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";

type Label = {
  id: string;
  name: string;
};

export type Incidence = {
  id: string;
  dateLastActivity: string;
  name: string;
  desc: string;
  idLabels: string[];
  labels: Label[];
  idList: keyof typeof listStatusMapping;
};

export const columns: ColumnDef<Incidence>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "dateLastActivity",
    header: "Fecha",
    cell: ({ row }) => formatDate(row.original.dateLastActivity),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Título
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorFn: (row) => row.labels[0]?.name,
    header: "Prioridad",
  },
  {
    accessorKey: "idList",
    header: "Estado",
    cell: ({ row }) => listStatusMapping[row.original.idList],
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row, column }) => {
      const incidence = row.original;
      const router = useRouter();
      const { toast } = useToast();

      const fetchData = column.columnDef.meta?.fetchData as () => Promise<void>;

      return (
        <TableCell className="flex justify-start gap-2">
          <Button
            className="bg-lightblue"
            onClick={() => {
              router.push(`/incidence?id=${incidence.id}`);
            }}
          >
            <Pencil size={16} />
          </Button>
          <Button
            className="bg-blue"
            onClick={async () => {
              try {
                const newIdList =
                  incidence.idList === doneListId ? pendingListId : doneListId;

                const response = await axios.put(
                  `cards/${incidence.id}?key=${API_KEY}&token=${TOKEN}`,
                  {
                    idList: newIdList,
                  }
                );

                if (response.data) {
                  toast({
                    title: "Actualización",
                    description: "¡Actualización exitosa!",
                  });
                  if (fetchData) await fetchData();
                }
              } catch (error) {
                toast({
                  title: "Error en actualización!",
                  description: "Por favor vueva a intentar",
                });
              }
            }}
          >
            {listStatusMapping[incidence.idList] === "Hecho"
              ? "Pasar a pendiente"
              : "Pasar a hecho"}
          </Button>
        </TableCell>
      );
    },
  },
];
