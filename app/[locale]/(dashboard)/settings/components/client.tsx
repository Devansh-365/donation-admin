"use client";

import { ApiAlert } from "@/components/ui/api-alert";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import UserForm from "@/components/user-form";
import { useOrigin } from "@/hooks/use-origin";
import React from "react";

type Props = {};

const SettingClient = ({ data }: any) => {
  const origin = useOrigin();

  return (
    <>
      <Heading
        title={`Settings`}
        description="Manage account and website settings."
      />
      <Separator />
      <div className="grid gap-10">
        <UserForm initialData={data} />
      </div>
      <Separator />
      <ApiAlert
        title="NEXT_PUBLIC_API_URL"
        variant="public"
        description={`${origin}/api`}
      />
      <ApiAlert
        title="GET_LOGO"
        variant="public"
        description={`${origin}/api/logo`}
      />
    </>
  );
};

export default SettingClient;
