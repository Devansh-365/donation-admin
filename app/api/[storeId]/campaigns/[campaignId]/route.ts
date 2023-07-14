import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import * as z from "zod";

const campaignCreateSchema = z.object({
  title: z.string(),
  imageUrl: z.string(),
  status: z.boolean(),
});

const campaignDeleteSchema = z.object({
  campaignId: z.string(),
});

export async function GET(
  req: Request,
  { params }: { params: { campaignId: string } }
) {
  try {
    if (!params.campaignId) {
      return new NextResponse("Campaign id is required", { status: 400 });
    }

    const campaign = await prismadb.campaign.findUnique({
      where: {
        id: params.campaignId,
      },
    });

    return new Response(JSON.stringify(campaign));
  } catch (error) {
    console.log("[CAMPAIGN_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { campaignId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!params.campaignId) {
      return new NextResponse("Campaign id is required", { status: 400 });
    }

    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }

    const { user } = session;

    const campaign = await prismadb.campaign.delete({
      where: {
        id: params.campaignId,
      },
    });

    return NextResponse.json(campaign);
  } catch (error) {
    console.log("[CAMPAIGN_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { campaignId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!params.campaignId) {
      return new NextResponse("Campaign id is required", { status: 400 });
    }

    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }

    const { user } = session;

    const json = await req.json();
    const body = campaignCreateSchema.parse(json);

    const campaign = await prismadb.campaign.update({
      where: {
        id: params.campaignId,
      },
      data: {
        title: body.title,
        imageUrl: body.imageUrl,
        status: body.status,
      },
    });

    return NextResponse.json(campaign);
  } catch (error) {
    console.log("[CAMPAIGN_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
