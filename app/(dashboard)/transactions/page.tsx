import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { TransactionClient } from "./components/client";

type Props = {};

export const metadata = {
  title: "Transactions | Donation",
  description: "Manage transaction for the store.",
};

const TransactionPage = (props: Props) => {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <TransactionClient />
      </div>
    </div>
  );
};

export default TransactionPage;
