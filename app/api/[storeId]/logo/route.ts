import prismadb from "@/lib/prismadb";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import * as z from "zod";
import { NextResponse } from "next/server";

const changeLogoSchema = z.object({
  logoUrl: z.string().url(),
});

interface LogoWhereInput {
  id: number;
  storeId: string;
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const logo = await prismadb.logo.findFirst();

    return NextResponse.json(logo);
  } catch (error) {
    return new NextResponse(null, { status: 500 });
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

    const json = await req.json();
    const body = changeLogoSchema.parse(json);

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId: user.id,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const existingLogo = await prismadb.logo.findFirst();

    if (existingLogo) {
      const updatedLogo = await prismadb.logo.update({
        where: {
          id: existingLogo.id,
          storeId: params.storeId,
        } as LogoWhereInput,
        data: { logoUrl: body.logoUrl },
      });

      return NextResponse.json(updatedLogo);
    } else {
      const newLogo = await prismadb.logo.create({
        data: {
          logoUrl: body.logoUrl,
          name: "Logo Name",
          storeId: params.storeId,
        },
      });

      return NextResponse.json(newLogo);
    }
  } catch (error) {
    console.log(error);
    return new NextResponse(null, { status: 500 });
  }
}
