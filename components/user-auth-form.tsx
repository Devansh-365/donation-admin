"use client";

import * as React from "react";
import { signIn } from "next-auth/react";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { toast } from "react-hot-toast";
import { Loader } from "@/components/ui/loader";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prismadb from "@/lib/prismadb";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  formType: "login" | "register";
}

interface AuthData {
  email: string;
  password: string;
}

const UserAuthForm = ({
  className,
  formType = "login",
  ...props
}: UserAuthFormProps) => {
  const [formData, setFormData] = React.useState<AuthData>({
    email: "",
    password: "",
  });

  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const title = formType === "login" ? "Login" : "Register";
  const description =
    formType === "login"
      ? "Enter your credentials to sign in to your account."
      : "Enter your credentials to register your account.";
  const toastMessage =
    formType === "login"
      ? "User has been logged in!"
      : "User has been registered!";
  const action = formType === "login" ? "Login" : "Register";
  const actionDescription =
    formType === "login"
      ? "Don't have an account? Register"
      : "Already have an account? Login";

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const formValues = new FormData(event.currentTarget);
    try {
      setIsLoading(true);
      if (formType === "login") {
        console.log("DETAILS : ", {
          email: formValues.get("email") as string,
          password: formValues.get("password") as string,
        });

        const signInRes = await signIn("credentials", {
          email: formValues.get("email") as string,
          password: formValues.get("password") as string,
          redirect: false,
        });
        if (signInRes && !signInRes.error) {
          toast.error("EMAIL & PASSWORD WRONG");
        }
        router.refresh();
        router.push(`/`);
        toast.success(toastMessage);
      } else {
        axios.post(`/api/register`, {
          email: formValues.get("email") as string,
          password: formValues.get("password") as string,
        });
        router.refresh();
        router.push(`/`);
        toast.success(toastMessage);
      }
    } catch (error: any) {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-1">
              <Label htmlFor="email">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                autoCapitalize="none"
                autoComplete="password"
                autoCorrect="off"
                disabled={isLoading}
                onChange={handleChange}
              />
            </div>
            <button
              className={cn(buttonVariants({ className: "mt-4" }))}
              disabled={isLoading}
            >
              {isLoading && <Loader />}
              {action}
            </button>
          </div>
        </form>
        <p className="px-8 mt-3 text-center text-sm text-muted-foreground">
          <Link
            href={`/auth/${formType === "login" ? "register" : "login"}`}
            className="hover:text-brand underline underline-offset-4"
          >
            {actionDescription}
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};

export default UserAuthForm;
