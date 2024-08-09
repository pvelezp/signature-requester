"use client";

import { TableCell, TableRow } from "@/components/ui/table";

interface TableSkeletonProps {
  rows: number;
  columns: number;
}

export function TableSkeleton({ rows, columns }: TableSkeletonProps) {
  return (
    <>
      {Array.from({ length: rows }, (_, rowIndex) => (
        <TableRow
          key={rowIndex}
          className="animate-pulse border-b last:border-b-0"
        >
          {Array.from({ length: columns }, (_, colIndex) => (
            <TableCell
              key={colIndex}
              className="h-28  p-4"
              style={{ width: "80%", maxWidth: "150px" }}
            >
              <div className="p-4 bg-gray-200 rounded-lg"></div>
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}
