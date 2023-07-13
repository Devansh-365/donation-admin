"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";

export type CampaignColumn = {
  id: string;
  label: string;
  donors: number;
  active: boolean;
  createdAt: string;
};

export const columns: ColumnDef<CampaignColumn>[] = [
  {
    accessorKey: "label",
    header: "Name",
  },
  {
    accessorKey: "donors",
    header: "Donors",
  },
  {
    accessorKey: "active",
    header: "Status",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
