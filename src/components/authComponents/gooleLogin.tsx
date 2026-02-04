"use client";

import React from "react";
import { Button } from "../ui/button";
import { authClient } from "@/lib/auth-client";
import { env } from "@/env";

const NEXT_PUBLIC_callbackURL = env.NEXT_PUBLIC_callbackURL

export default function GoogleLogin() {
  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "http://localhost:3000",
      });
    } catch (error) {
      console.error("Google login failed", error);
    }
  };

  return (
    <Button
      variant="outline"
      type="button"
      className="w-full hover:cursor-pointer"
      onClick={handleGoogleLogin}
    >
      Sign up with Google
    </Button>
  );
}
