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

    const post = await prismadb.logo.update({
      where: { id: 1 },
      data: { logoUrl: body.logoUrl },
    });

    return new Response(JSON.stringify(post));
  } catch (error) {
    console.log(error);
    return new Response(null, { status: 500 });
  }
}
