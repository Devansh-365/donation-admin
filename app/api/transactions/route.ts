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

    return new Response(JSON.stringify(transactionsWithNet));
  } catch (error) {
    return new Response(null, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    // const session = await getServerSession(authOptions);

    // if (!session) {
    //   return new Response("Unauthorized", { status: 403 });
    // }

    // const { user } = session;

    // Validate the request body
    const body = transactionCreateSchema.parse(req.body);

    // Create the transaction
    const transaction = await prismadb.transaction.create({
      data: {
        campaignTitle: body.campaignTitle,
        amount: body.amount,
        frais: body.frais,
      },
    });

    return new Response(JSON.stringify(transaction));
  } catch (error) {
    console.log(error);
    return new Response(null, { status: 500 });
  }
}
