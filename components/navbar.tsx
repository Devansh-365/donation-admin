import React from "react";
import MainNav from "./main-nav";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { UserAccountNav } from "./user-account-nav";
import { ThemeToggle } from "./theme-toggle";
import { LangToggle } from "./lang-toggle";
import StoreSwitcher from "./store-switcher";
import prismadb from "@/lib/prismadb";

type Props = {};

const Navbar = async (props: Props) => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  const stores = await prismadb.store.findMany({
    where: {
      userId: user?.id,
    },
  });

  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={stores} />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <LangToggle />
          <ThemeToggle />
          <UserAccountNav
            user={{
              name: user?.name,
              image: user?.image,
              email: user?.email,
            }}
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
