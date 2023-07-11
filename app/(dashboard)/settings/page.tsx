import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import UserForm from "@/components/user-form";
import { authOptions } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import React from "react";

export const metadata = {
  title: "Settings | Donation",
  description: "Manage account and website settings.",
};

const SettingsPage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading
          title={`Settings`}
          description="Manage account and website settings."
        />
        <Separator />
        <div className="grid gap-10">
          <UserForm user={{ id: user?.name, name: user.name || "" }} />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
