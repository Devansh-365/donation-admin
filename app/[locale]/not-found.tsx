import Icons from "@/components/icons";
import Link from "next/link";
import { FC } from "react";
import { buttonVariants } from "@/components/ui/button";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Page not found",
  description: "Page not found",
};

const PageNotFound: FC = () => {
  return (
    <section className="container pt-32 max-w-7xl mx-auto text-center flex flex-col gap-6 items-center">
      <h1 className="text-black dark:text-white text-center lg:text-left font-extrabold leading-tight tracking-tighter text-4xl md:text-5xl lg:text-6xl">
        Site not found...
      </h1>
      <p className="max-w-prose text-slate-700 dark:text-slate-300 mb-2 text-center text-base sm:text-lg">
        The site you&apos;re searching for does not exist.
      </p>
      <Link
        className={buttonVariants({
          variant: "ghost",
          className: "w-fit",
        })}
        href="/"
      >
        <Icons.ChevronLeft className="mr-2 h-4 w-4" />
        Back to home
      </Link>
    </section>
  );
};

export default PageNotFound;
