import prismadb from "@/lib/prismadb";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import * as z from "zod";

const changeLogoSchema = z.object({
  logoUrl: z.string().url(),
});

export async function GET() {
  try {
    const logo = await prismadb.logo.findFirst();

    return new Response(JSON.stringify(logo));
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
    const body = changeLogoSchema.parse(json);

    const existingLogo = await prismadb.logo.findFirst();

    if (existingLogo) {
      const updatedLogo = await prismadb.logo.update({
        where: { id: existingLogo.id },
        data: { logoUrl: body.logoUrl },
      });

      return new Response(JSON.stringify(updatedLogo));
    } else {
      const newLogo = await prismadb.logo.create({
        data: { logoUrl: body.logoUrl, name: "Logo Name" },
      });

      return new Response(JSON.stringify(newLogo));
    }
  } catch (error) {
    console.log(error);
    return new Response(null, { status: 500 });
  }
}
