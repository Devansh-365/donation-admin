import prismadb from "@/lib/prismadb";

interface GraphData {
  name: string;
  value: number;
}

export const getCampaignRevenue = async (
  storeId: string
): Promise<GraphData[]> => {
  const transactions = await prismadb.transaction.findMany({
    where: {
      storeId,
    },
  });
  const uniqueCampaignTitles = Array.from(
    new Set(transactions.map((transaction) => transaction.campaignTitle))
  );

  const campaignRevenue: GraphData[] = uniqueCampaignTitles.map((title) => {
    const totalAmount = transactions
      .filter((transaction) => transaction.campaignTitle === title)
      .reduce((total, transaction) => total + transaction.amount, 0);

    return { name: title, value: totalAmount };
  });

  return campaignRevenue;
};
