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
import { MobileMenuButton } from "@/app/ui/mobile-menu-btn";

import * as actions from "@/app/actions";

interface RenderSignInOutButtonProps {
  action: () => void;
  label: string;
  className?: string;
  variant?: "flat" | "bordered";
  color?: "primary" | "secondary";
  radius?: "sm" | "none";
}

function SignInOutButton({
  action,
  label,
  className = "",
  variant = "flat",
  color = "primary",
  radius = "sm",
}: RenderSignInOutButtonProps) {
  return (
    <form action={action}>
      <Button
        type="submit"
        className={className}
        variant={variant}
        color={color}
        fullWidth
        radius={radius}
      >
        {label}
      </Button>
    </form>
  );
}

export default function HeaderAuth1() {
  const session = useSession();
  let authContent: React.ReactNode;

  if (session.status === "loading") {
    authContent = null;
  } else if (session.data?.user) {
    authContent = (
      <Popover placement="bottom" radius="none">
        <PopoverTrigger>
          <div className="md:pr-4">
            <Avatar src={session.data?.user.image || ""} />
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <SignInOutButton
            action={actions.signOut}
            label="Sign out"
            className="bg-transparent"
          />
        </PopoverContent>
      </Popover>
    );
  } else {
    const buttonsVisibleOnLagreScreen = (
      <div className="hidden lg:block">
        <div className="flex">
          <NavbarItem>
            <SignInOutButton
              action={actions.signIn}
              label="Sign In"
              className="bg-transparent"
              variant="bordered"
              color="secondary"
            />
          </NavbarItem>
          <NavbarItem>
            <SignInOutButton
              action={actions.signIn}
              label="Sign Up"
              className="ml-2"
            />
          </NavbarItem>
        </div>
      </div>
    );
    const buttonsVisisbleOnSmallScreen = (
      <Popover placement="bottom" radius="none">
        <PopoverTrigger>
          <div>
            <MobileMenuButton />
          </div>
        </PopoverTrigger>

        <PopoverContent className="p-0">
          <SignInOutButton
            action={actions.signIn}
            label="Sign In"
            className="bg-transparent"
          />
          <SignInOutButton
            action={actions.signIn}
            label="Sign Up"
            radius="none"
          />
        </PopoverContent>
      </Popover>
    );
    authContent = (
      <>
        {buttonsVisibleOnLagreScreen}
        {buttonsVisisbleOnSmallScreen}
      </>
    );
  }

  return (
    <div>
      <Navbar height={1}>{authContent}</Navbar>
    </div>
  );
}
