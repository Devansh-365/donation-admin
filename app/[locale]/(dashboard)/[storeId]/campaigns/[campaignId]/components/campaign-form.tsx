"use client";

import { Campaign } from "@prisma/client";
import { FormEventHandler, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { AlertModal } from "@/components/modals/alert-modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import axios from "axios";
import { Trash } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "react-hot-toast";
import ImageUpload from "@/components/ui/image-upload";

const formSchema = z.object({
  title: z.string().min(1),
  status: z.boolean(),
  imageUrl: z.string().min(1),
});

type CampaignFormValues = z.infer<typeof formSchema>;

interface CampaignFormProps {
  initialData: Campaign | null;
}

export const CampaignForm: React.FC<CampaignFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [formValues, setFormValues] = useState<CampaignFormValues>(
    initialData || {
      title: "",
      status: false,
      imageUrl: "",
    }
  );
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit campaign" : "Create campaign";
  const description = initialData ? "Edit a campaign." : "Add a new campaign";
  const toastMessage = initialData ? "Campaign updated." : "Campaign created.";
  const action = initialData ? "Save changes" : "Create";

  const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data: CampaignFormValues = {
      title: formData.get("title") as string,
      status: formData.get("status") === "on",
      imageUrl: formValues.imageUrl,
    };
    console.log("data ; ", data);
    try {
      setLoading(true);
      console.log("data ; ", data);
      if (initialData) {
        await axios.patch(
          `/api/${params?.storeId}/campaigns/${params?.campaignId}`,
          data
        );
      } else {
        await axios.post(`/api/${params?.storeId}/campaigns`, data);
      }
      router.refresh();
      router.push(`/${params?.storeId}/campaigns`);
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/${params?.storeId}/campaigns/${params?.campaignId}`
      );
      router.refresh();
      router.push(`/campaigns`);
      toast.success("Campaign deleted.");
    } catch (error: any) {
      toast.error(
        "Make sure you removed all categories using this campaign first."
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;

    if (type === "checkbox") {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: !formValues.status,
      }));
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
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
      <form onSubmit={onSubmit} className="space-y-8 w-full">
        <ImageUpload
          value={formValues.imageUrl ? [formValues.imageUrl] : []}
          disabled={loading}
          onChange={(url) =>
            setFormValues((prevValues) => ({
              ...prevValues,
              imageUrl: url,
            }))
          }
          onRemove={() =>
            setFormValues((prevValues) => ({
              ...prevValues,
              imageUrl: "",
            }))
          }
        />
        <div className="md:grid md:grid-cols-2 items-end gap-8">
          <div className="grid gap-1">
            <Label htmlFor="name">Name</Label>
            <Input
              id="title"
              className="w-[400px]"
              name="title"
              size={32}
              value={formValues.title}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-start space-x-3 space-y-0 rounded-md border p-4">
            <Checkbox
              id="terms"
              name="status"
              checked={formValues.status}
              onCheckedChange={() =>
                setFormValues((prevValues) => ({
                  ...prevValues,
                  status: !prevValues.status,
                }))
              }
            />
            <div className="space-y-1 leading-none">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Archived
              </label>
              <p className="text-sm text-muted-foreground">
                This campaign will not appear anywhere in the store.
              </p>
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
