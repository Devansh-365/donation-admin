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

interface LoginData {
  email: string;
  password: string;
}

const Login = () => {
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl") || "/";

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    const signInResult = await signIn("credentials", {
      email: formData.email.toLowerCase(),
      password: formData.password,
      redirect: false,
      callbackUrl,
    });

    console.log(signInResult);

    setIsLoading(false);

    if (!signInResult?.ok) {
      return toast.success("Your sign in request failed. Please try again.");
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
              LogIn
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default Login;
