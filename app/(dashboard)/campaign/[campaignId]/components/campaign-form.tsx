"use client";

import { Campaign } from "@prisma/client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { AlertModal } from "@/components/modals/alert-modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { Trash } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const formSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1),
});

type CampaignFormValues = z.infer<typeof formSchema>;

interface CampaignFormProps {
  initialData: Campaign | null;
}

export const CampaignForm: React.FC<CampaignFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit campaign" : "Create campaign";
  const description = initialData ? "Edit a campaign." : "Add a new campaign";
  const toastMessage = initialData ? "Campaign updated." : "Campaign created.";
  const action = initialData ? "Save changes" : "Create";

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => {}}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <form onSubmit={() => {}} className="space-y-8 w-full">
        <div className="md:grid md:grid-cols-2 items-end gap-8">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="name">
              Name
            </Label>
            <Input id="name" className="w-[400px]" name="name" size={32} />
            {/* {errors?.name && (
              <p className="px-1 text-xs text-red-600">{errors.name.message}</p>
            )} */}
          </div>
          <div className="flex items-start space-x-3 space-y-0 rounded-md border p-4">
            <Checkbox id="terms" />
            <div className="space-y-1 leading-none">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">fd</label>
              <p className="text-sm text-muted-foreground">sdsd</p>
            </div>
          </div>
        </div>
        <Button disabled={loading} className="ml-auto" type="submit">
          {action}
        </Button>
      </form>
    </>
  );
};
