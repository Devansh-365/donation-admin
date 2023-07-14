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

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const campaigns = await prismadb.campaign.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(campaigns);
  } catch (error) {
    console.log("[CAMPAIGNS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }

    const { user } = session;
    const userId = user?.name ? user.name : "";

    const json = await req.json();
    const body = campaignCreateSchema.parse(json);

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const campaign = await prismadb.campaign.create({
      data: {
        title: body.title,
        imageUrl: body.imageUrl,
        donors: "0",
        status: body.status,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(campaign);
  } catch (error) {
    console.log("[CAMPAIGNS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
