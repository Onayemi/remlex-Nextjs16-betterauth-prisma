"use client";

import { signIn } from "@/lib/auth-client";
import { Button } from "../ui/button";

type SocialButtonProps = {
  provider: "google" | "github" | "facebook" | "twitter" | "linkedin";
  label?: string;
  icon?: React.ReactNode;
  callbackURL?: string;
};

export default function SocialButton({
  provider,
  label,
  icon,
  callbackURL = "/dashboard",
}: SocialButtonProps) {
  
  async function handleSignIn() {
    await signIn.social({
      provider,
      callbackURL,
    });
  }

  return (
    <Button
      type="button"
      variant="outline"
      onClick={handleSignIn}
      className="flex items-center gap-2 cursor-pointer"
    >
      {icon}
      <span>{label ?? provider}</span>
    </Button>
  );
}
