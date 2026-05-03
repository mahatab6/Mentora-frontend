"use client";

import React from "react";
import * as z from "zod";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import GoogleLogin from "./gooleLogin";


const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export function LoginForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter();
  
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Verifying credentials...");
      try {
        const { error } = await authClient.signIn.email(value, {
          onSuccess: (ctx) => {
            const authToken = ctx.response.headers.get("set-auth-token");
            if (authToken) {
              localStorage.setItem("authToken", authToken);
            }
          },
        });

        if (error) {
          toast.error(error.message || "Invalid email or password", { id: toastId });
          return;
        }

        toast.success("Welcome back!", { id: toastId });
        router.push("/");
        router.refresh();
      } catch (err) {
        toast.error("Connection failed. Please try again.", { id: toastId });
      }
    },
  });

  return (
    <Card className="w-full max-w-md mx-auto border-none bg-white dark:bg-slate-900 shadow-xl" {...props}>
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold tracking-tight">Welcome Back</CardTitle>
        <CardDescription>
          Choose your preferred login method
        </CardDescription>
      </CardHeader>
      
      <CardContent className="grid gap-6">
        {/* Social Login Section */}
        <GoogleLogin />

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-muted" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              Or continue with email
            </span>
          </div>
        </div>

        {/* Credentials Form */}
        <form
          id="login-form"
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <FieldGroup className="space-y-4">
            <form.Field name="email">
              {(field) => {
                const isInvalid = field.state.meta.isTouched && field.state.meta.errors.length > 0;
                return (
                  <Field>
                    <FieldLabel className="text-foreground">Email</FieldLabel>
                    <Input
                      id={field.name}
                      type="email"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="name@example.com"
                      className="bg-background border-input focus:ring-primary"
                    />
                    {isInvalid && <FieldError className="text-destructive text-xs mt-1" errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="password">
              {(field) => {
                const isInvalid = field.state.meta.isTouched && field.state.meta.errors.length > 0;
                return (
                  <Field>
                    <div className="flex items-center justify-between">
                      <FieldLabel className="text-foreground">Password</FieldLabel>
                      <Link href="#" className="text-xs text-primary hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <Input
                      id={field.name}
                      type="password"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="••••••••"
                      className="bg-background border-input"
                    />
                    {isInvalid && <FieldError className="text-destructive text-xs mt-1" errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            </form.Field>
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col gap-4">
        <Button
          form="login-form"
          type="submit"
          className="w-full font-semibold transition-all active:scale-95 cursor-pointer hover:cursor-pointer"
        >
          Sign In
        </Button>
        
        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="font-medium text-primary hover:underline underline-offset-4">
            Create an account
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}