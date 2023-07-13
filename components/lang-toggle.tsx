"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next-intl/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { useLocale } from "next-intl";
import { useParams } from "next/navigation";

export function LangToggle() {
  const params = useParams();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          {params?.locale === "en" ? (
            <Image src="/en.png" width={20} height={20} alt="" />
          ) : (
            <Image src="/fr.png" width={20} height={20} alt="" />
          )}
          <span className="sr-only">Language theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Link href="/" locale="en">
            English
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/" locale="fr">
            French
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
