"use client";

import { ApiAlert } from "@/components/ui/api-alert";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import UserForm from "@/components/user-form";
import { useOrigin } from "@/hooks/use-origin";
import { Button } from "@/components/ui/button";

import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";

import { Trash } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { AlertModal } from "@/components/modals/alert-modal";
import { useTranslations } from "next-intl";

type Props = {};

const SettingClient = ({ data }: any) => {
  const origin = useOrigin();
  const params = useParams();
  const router = useRouter();
  const t = useTranslations("Settings");

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/stores/${params?.storeId}`);
      router.refresh();
      router.push("/");
      toast.success("Store deleted.");
    } catch (error: any) {
      toast.error("Make sure you removed all products and categories first.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={t("title")} description={t("subtitle")} />
        <Button
          disabled={loading}
          variant="destructive"
          size="sm"
          onClick={() => setOpen(true)}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
      <Separator />
      <div className="grid gap-10">
        <UserForm initialData={data} />
      </div>
      <Separator />
      <ApiAlert
        title="NEXT_PUBLIC_API_URL"
        variant="public"
        description={`${origin}/api/${params?.storeId}`}
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
