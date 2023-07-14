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
import Icons from "./icons";

export function LangToggle() {
  const params = useParams();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-24" asChild>
        <Button variant="outline">
          {params?.locale === "en" ? (
            <div className="flex items-center justify-center gap-2 mx-auto">
              <span>English</span>
              <Icons.ChevronDown className="mr-2 h-4 w-4" />
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 mx-auto">
              <span>French</span>
              <Icons.ChevronDown className="mr-2 h-4 w-4" />
            </div>
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
