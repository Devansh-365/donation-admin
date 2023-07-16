import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, DollarSign, Package } from "lucide-react";
import { getCurrentUser } from "@/lib/session";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { BarSection } from "@/components/graphs/bar-chart";
import { PieSection } from "@/components/graphs/pie-chart";
import { getDonationRevenue } from "@/actions/get-dontaion-revenue";
import prismadb from "@/lib/prismadb";
import { getCampaignRevenue } from "@/actions/get-campaign-revenue";
import { getTranslator } from "next-intl/server";

type Props = {};

const data = [
  { name: "Jan", total: 3 },
  { name: "Feb", total: 13 },
  { name: "Mar", total: 0 },
  { name: "Apr", total: 4 },
  { name: "May", total: 24 },
  { name: "Jun", total: 0 },
  { name: "Jul", total: 1 },
  { name: "Aug", total: 22 },
  { name: "Sep", total: 33 },
  { name: "Oct", total: 7 },
  { name: "Nov", total: 1 },
  { name: "Dec", total: 11 },
];

const pieData = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

interface DashboardPageProps {
  params: {
    storeId: string;
    locale: string;
  };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  const user = await getCurrentUser();
  const t = await getTranslator(params.locale, "Index");

  const donationRevenue = await getDonationRevenue(params.storeId);
  const campaignRevenue = await getCampaignRevenue(params.storeId);
  const transactions = await prismadb.transaction.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  function totalDonation(transactions: any): number {
    let total = 0;
    for (const transaction of transactions) {
      total += transaction.amount - transaction.frais;
    }
    return total;
  }
  function averageDonation(transactions: any): number {
    const total = totalDonation(transactions);
    const average = total / transactions.length;
    return isNaN(average) ? 0 : average;
  }
  const totalNet = totalDonation(transactions);
  const averageNet = averageDonation(transactions);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title={t("title")} description={t("subtitle")} />
        <Separator />
        <div className="grid gap-4 grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t("totalDonation")}
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalNet}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t("averageDonation")}
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${averageNet}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t("numberOfTransactions")}
              </CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{transactions.length}</div>
            </CardContent>
          </Card>
          {/* <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Store Id</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
            </CardContent>
          </Card> */}
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>{t("donationOverview")}</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <BarSection data={donationRevenue} />
            </CardContent>
          </Card>
          <Card className="cols-span-1">
            <CardHeader>
              <CardTitle>{t("campaignOverview")}</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <PieSection data={campaignRevenue} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
