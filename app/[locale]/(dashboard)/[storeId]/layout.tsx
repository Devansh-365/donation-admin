import Navbar from "@/components/navbar";
import { authOptions } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { getCurrentUser } from "@/lib/session";
import { getSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/auth/login");
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
      userId: user.id,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
