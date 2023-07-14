import { notFound, redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import { authOptions } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    return notFound();
  }

  const store = await prismadb.store.findFirst({
    where: {
      userId: user?.id,
    },
  });

  if (store) {
    redirect(`/${store.id}`);
  }

  return <>{children}</>;
}
