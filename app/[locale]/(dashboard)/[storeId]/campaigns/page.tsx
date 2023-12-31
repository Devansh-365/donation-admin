import { Plus } from "lucide-react";
import { redirect, useParams, useRouter } from "next/navigation";

import { Button, buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { CampaignColumn, columns } from "./components/columns";
import { getCurrentUser } from "@/lib/session";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ApiList } from "@/components/ui/api-list";
import prismadb from "@/lib/prismadb";

import { format } from "date-fns";
import { CampaignClient } from "./components/client";

type Props = {};

export const metadata = {
  title: "Campaigns | Donation",
  description: "Manage campaign for your store",
};

const CampaignPage = async ({ params }: { params: { storeId: string } }) => {
  const user = await getCurrentUser();
  if (!user) {
    redirect(authOptions?.pages?.signIn || "/auth/login");
  }

  const campaigns = await prismadb.campaign.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const transactions = await prismadb.transaction.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCampaigns: CampaignColumn[] = campaigns.map((item) => {
    const numTransactions = transactions.filter((transaction) => {
      transaction.campaignTitle === item.title;
    }).length;
    return {
      id: item.id,
      label: item.title,
      donors: numTransactions,
      active: item.status,
      createdAt: format(item.createdAt, "MMMM do, yyyy"),
    };
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CampaignClient data={formattedCampaigns} />
      </div>
    </div>
  );
};

export default CampaignPage;
