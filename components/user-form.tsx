"use client";

import React, { FormEventHandler, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import ImageUpload from "./ui/image-upload";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

const UserForm = ({ initialData, className, ...props }: any) => {
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const router = useRouter();

  const toastMessage = initialData ? "Logo updated." : "Logo created.";

  const [formValues, setFormValues] = useState<any>(
    initialData || {
      logoUrl: "",
    }
  );

  const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data: any = {
      logoUrl: formValues.logoUrl,
    };
    console.log("data ; ", data);
    try {
      setIsSaving(true);
      console.log("data ; ", data);
      await axios.post("/api/logo", data);
      router.refresh();
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error("Something went wrong.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form className={cn(className)} onSubmit={onSubmit} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Your Logo</CardTitle>
          <CardDescription>
            Chang or update your logo you are comfortable with.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-1">
            <ImageUpload
              value={formValues.logoUrl ? [formValues.logoUrl] : []}
              disabled={isSaving}
              onChange={(url) =>
                setFormValues((prevValues: any) => ({
                  ...prevValues,
                  logoUrl: url,
                }))
              }
              onRemove={() =>
                setFormValues((prevValues: any) => ({
                  ...prevValues,
                  logoUrl: "",
                }))
              }
            />
          </div>
        </CardContent>
        <CardFooter>
          <button
            type="submit"
            className={cn(buttonVariants(), className)}
            disabled={isSaving}
          >
            {/* {isSaving && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )} */}
            <span>Save</span>
          </button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default UserForm;
