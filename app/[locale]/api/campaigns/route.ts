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

export async function GET() {
  try {
    const campaigns = await prismadb.campaign.findMany({
      select: {
        id: true,
        title: true,
        createdAt: true,
      },
    });

    return new Response(JSON.stringify(campaigns));
  } catch (error) {
    return new Response(null, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }

    const { user } = session;

    const json = await req.json();
    const body = campaignCreateSchema.parse(json);

    const campaign = await prismadb.campaign.create({
      data: {
        title: body.title,
        imageUrl: body.imageUrl,
        donors: "0",
        status: body.status,
      },
    });

    return new Response(JSON.stringify(campaign));
  } catch (error) {
    console.log(error);
    return new Response(null, { status: 500 });
  }
}
