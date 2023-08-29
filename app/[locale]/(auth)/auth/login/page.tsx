"use client";

import React, { useState } from "react";
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
import { useTranslations } from "next-intl";
import Link from "next/link";

interface LoginData {
  email: string;
  password: string;
}

const Login = () => {
  const [formData, setFormData] = useState<LoginData>({
    email: "admin@admin.com",
    password: "admin@123",
  });

  const router = useRouter();
  // const t = useTranslations("Index");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl") || "/";

  console.log("SIGNIN : ", formData.email.toLowerCase(), formData.password);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    const signInResult = await signIn("credentials", {
      email: formData.email.toLowerCase(),
      password: formData.password,
      redirect: false,
      callbackUrl,
    });
    setIsLoading(false);

    if (!signInResult?.ok) {
      return toast.error("Your sign in request failed. Please try again.");
    }
    if (!signInResult?.error) {
      router.push(callbackUrl);
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
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Enter your credentials to sign in to your account.
        </CardDescription>
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
                defaultValue="admin@admin.com"
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
                defaultValue="admin@123"
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
              LogIn
            </button>
          </div>
        </form>
        <p className="px-8 mt-3 text-center text-sm text-muted-foreground">
          <Link
            href={`/auth/register`}
            className="hover:text-brand underline underline-offset-4"
          >
            {`Don't have an account? Register`}
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};

export default Login;
