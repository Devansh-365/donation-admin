"use client";

import { ApiAlert } from "@/components/ui/api-alert";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import UserForm from "@/components/user-form";
import { useOrigin } from "@/hooks/use-origin";
import { Button } from "@/components/ui/button";

import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";

import { Copy, Server, Trash } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { AlertModal } from "@/components/modals/alert-modal";
import { useTranslations } from "next-intl";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge, BadgeProps } from "@/components/ui/badge";

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

  const onCopy = (description: string) => {
    navigator.clipboard.writeText(description);
    toast.success("Store / API Id copied to clipboard.");
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
      <Alert>
        <Server className="h-4 w-4" />
        <AlertTitle className="flex items-center gap-x-2">
          Store / API Id
        </AlertTitle>
        <AlertDescription className="mt-4 flex items-center justify-between">
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
            {params?.storeId}
          </code>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onCopy(`${params?.storeId}`)}
          >
            <Copy className="h-4 w-4" />
          </Button>
        </AlertDescription>
      </Alert>
      <ApiAlert
        title="NEXT_PUBLIC_API_URL"
        variant="public"
        description={`${origin}/api/${params?.storeId}`}
      />
      <ApiAlert
        title="GET_LOGO"
        variant="public"
        description={`${origin}/api/${params?.storeId}/logo`}
      />
    </>
  );
};

export default SettingClient;
