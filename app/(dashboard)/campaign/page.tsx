import { Plus } from "lucide-react";
import { redirect, useParams, useRouter } from "next/navigation";

import { Button, buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./components/columns";
import { getCurrentUser } from "@/lib/session";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ApiList } from "@/components/ui/api-list";

type Props = {};

export const metadata = {
  title: "Campaigns",
  description: "Manage campaign for your store",
};

const CampaignPage = async (props: Props) => {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <Heading
            title={`Campaigns (0)`}
            description="Manage campaign for your store"
          />
          <Link
            className={cn(buttonVariants({ variant: "default" }))}
            href="/campaign/new"
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />
        <DataTable searchKey="label" columns={columns} data={[]} />
        <Heading title="API" description="API Calls for Campaign" />
        <Separator />
        <ApiList entityName="campaigns" entityIdName="campaignId" />
      </div>
    </div>
  );
};

export default CampaignPage;
