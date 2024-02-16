"use client";

import {
  Navbar,
  NavbarItem,
  Button,
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";

import * as actions from "@/app/actions";

export default function HeaderAuth() {
  const session = useSession();
  let authContent: React.ReactNode;
  if (session.status === "loading") {
    authContent = null;
  } else if (session.data?.user) {
    authContent = (
      <Popover placement="bottom" radius="none">
        <PopoverTrigger>
          <div className="pr-5">
            <Avatar src={session.data?.user.image || ""} />
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <div className="">
            <form action={actions.signOut}>
              <Button
                type="submit"
                radius="none"
                fullWidth
                className="bg-transparent"
              >
                Sign out
              </Button>
            </form>
          </div>
        </PopoverContent>
      </Popover>
    );
  } else {
    authContent = (
      <>
        <NavbarItem>
          <form action={actions.signIn}>
            <Button type="submit" color="secondary" variant="bordered">
              Sign In
            </Button>
          </form>
        </NavbarItem>
        <NavbarItem>
          <form action={actions.signIn}>
            <Button type="submit" color="primary" variant="flat">
              Sign Up
            </Button>
          </form>
        </NavbarItem>
      </>
    );
  }

  return (
    <div>
      <Navbar>{authContent}</Navbar>
    </div>
  );
}
