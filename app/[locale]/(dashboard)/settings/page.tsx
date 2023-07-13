import { ApiAlert } from "@/components/ui/api-alert";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import UserForm from "@/components/user-form";
import { authOptions } from "@/lib/auth";
import prismadb from "@/lib/prismadb";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import React from "react";
import SettingClient from "./components/client";

export const metadata = {
  title: "Settings | Donation",
  description: "Manage account and website settings.",
};

const SettingsPage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  const data = await prismadb.logo.findFirst();

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingClient data={data} />
      </div>
    </div>
  );
};

export default SettingsPage;
