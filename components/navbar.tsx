import React from "react";
import MainNav from "./main-nav";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { UserAccountNav } from "./user-account-nav";

type Props = {};

const Navbar = async (props: Props) => {
  const user = await getCurrentUser();

  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4">
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
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
