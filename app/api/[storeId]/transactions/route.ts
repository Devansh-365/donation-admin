import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import * as z from "zod";

const transactionCreateSchema = z.object({
  campaignTitle: z.string(),
  amount: z.number().positive(),
  frais: z.number().positive(),
});

export async function GET() {
  try {
    const transactions = await prismadb.transaction.findMany({
      include: { campaign: true },
    });

    const transactionsWithNet = transactions.map((transaction) => ({
      ...transaction,
      net: transaction.amount - transaction.frais,
    }));

    return NextResponse.json(transactionsWithNet);
  } catch (error) {
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
    const body = transactionCreateSchema.parse(json);

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

    const transaction = await prismadb.transaction.create({
      data: {
        campaignTitle: body.campaignTitle,
        amount: body.amount,
        frais: body.frais,
        storeId: params.storeId,
      },
    });

    return NextResponse.json(transaction);
  } catch (error) {
    console.log("[TRANSACTIONS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
