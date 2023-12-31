"use client";

import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { columns, TransactionColumn } from "./columns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, DollarSign, Package } from "lucide-react";
import { useOrigin } from "@/hooks/use-origin";
import { ApiAlert } from "@/components/ui/api-alert";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

interface OrderClientProps {
  data?: TransactionColumn[];
  totalDonation: number;
}

export const TransactionClient: React.FC<OrderClientProps> = ({
  data,
  totalDonation,
}) => {
  const origin = useOrigin();
  const params = useParams();
  const t = useTranslations("Transactions");

  return (
    <>
      <Heading
        title={`${t("title")} (${data?.length ? data.length : 0})`}
        description={t("subtitle")}
      />
      <Separator />
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{t("totalDonation")}</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalDonation}</div>
        </CardContent>
      </Card>
      <DataTable
        searchKey="campaign"
        columns={columns}
        data={data ? data : []}
      />
      <Heading title="API" description="API Calls for Transaction" />
      <Separator />
      <ApiAlert
        title="GET"
        variant="public"
        description={`${origin}/api/${params?.storeId}/transactions`}
      />
    </>
  );
};
