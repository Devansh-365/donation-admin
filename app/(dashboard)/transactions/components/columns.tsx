"use client";

import { ColumnDef } from "@tanstack/react-table";

export type TransactionColumn = {
  id: string;
  campaign: string;
  amount: number;
  frais: number;
  net: number;
  createdAt: string;
};

export const columns: ColumnDef<TransactionColumn>[] = [
  {
    accessorKey: "campaign",
    header: "Campaign",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "frais",
    header: "Frais",
  },
  {
    accessorKey: "net",
    header: "Net",
  },
];
