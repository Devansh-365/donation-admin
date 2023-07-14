import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { TransactionClient } from "./components/client";
import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
import { TransactionColumn } from "./components/columns";

export const metadata = {
  title: "Transactions | Donation",
  description: "Manage transaction for the store.",
};

const TransactionPage = async ({ params }: { params: { storeId: string } }) => {
  const transactions = await prismadb.transaction.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedTransaction: TransactionColumn[] = transactions.map(
    (item) => ({
      id: item.id,
      campaign: item.campaignTitle,
      amount: item.amount,
      frais: item.frais,
      net: item.amount - item.frais,
      createdAt: format(item.createdAt, "MMMM do, yyyy"),
    })
  );

  function totalDonation(transactions: any): number {
    let total = 0;
    for (const transaction of transactions) {
      total += transaction.amount - transaction.frais;
    }
    return total;
  }

  const totalNet = totalDonation(transactions);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <TransactionClient
          data={formattedTransaction}
          totalDonation={totalNet}
        />
      </div>
    </div>
  );
};

export default TransactionPage;
