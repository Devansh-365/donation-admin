import prismadb from "@/lib/prismadb";
import React from "react";
import { CampaignForm } from "./components/campaign-form";

const CampaignPage = async ({ params }: { params: { campaignId: string } }) => {
  const campaign = await prismadb.campaign.findUnique({
    where: {
      id: params.campaignId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CampaignForm initialData={campaign} />
      </div>
    </div>
  );
};

export default CampaignPage;
