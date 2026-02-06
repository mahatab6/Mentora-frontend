"use client";

import * as React from "react";
import * as z from "zod";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GraduationCap, Loader2, Eye, EyeOff } from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.string(),
});

export default function SignUpTutor() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "TUTOR",
    },

    validators: {
      onChange: ({ value }) => {
        const result = formSchema.safeParse(value);
        if (!result.success) {
          return result.error.flatten().fieldErrors;
        }
        return undefined;
      },
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating your tutor account...");

      try {
        const { error } = await authClient.signUp.email({
          email: value.email,
          password: value.password,
          name: value.name,
          role: "TUTOR",
        });

        if (error) {
          toast.error(error.message || "Registration failed", { id: toastId });
          return;
        }

        toast.success("Account created! Redirecting...", { id: toastId });
        router.push("/dashboard");
      } catch (err) {
        toast.error("Something went wrong. Please try again.", { id: toastId });
      }
    },
  });

  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-muted/40 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Card className="shadow-xl border-none">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-2">
              <div className="bg-primary/10 p-2 rounded-full">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl">Join as a Tutor</CardTitle>
            <CardDescription>
              Create an account to start teaching students
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
              className="grid gap-4"
            >
              {/* Name Field */}
              <form.Field name="name">
                {(field) => (
                  <div className="grid gap-2">
                    <Label htmlFor={field.name}>Full Name</Label>
                    <Input
                      id={field.name}
                      placeholder="Dr. Jane Smith"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className={
                        field.state.meta.errors.length
                          ? "border-destructive"
                          : ""
                      }
                    />
                  </div>
                )}
              </form.Field>

              {/* Email Field */}
              <form.Field name="email">
                {(field) => (
                  <div className="grid gap-2">
                    <Label htmlFor={field.name}>Email</Label>
                    <Input
                      id={field.name}
                      type="email"
                      placeholder="jane@university.com"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className={
                        field.state.meta.errors.length
                          ? "border-destructive"
                          : ""
                      }
                    />
                  </div>
                )}
              </form.Field>

              {/* Password Field */}
              <form.Field name="password">
                {(field) => (
                  <div className="grid gap-2">
                    <Label htmlFor={field.name}>Password</Label>
                    <div className="relative">
                      <Input
                        id={field.name}
                        type={showPassword ? "text" : "password"}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        className={`pr-10 ${field.state.meta.errors.length ? "border-destructive" : ""}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </form.Field>

              {/* Submit Button */}
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
              >
                {([canSubmit, isSubmitting]) => (
                  <Button
                    className="w-full mt-2"
                    type="submit"
                    disabled={!canSubmit || isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                        Registering...
                      </>
                    ) : (
                      "Create Tutor Account"
                    )}
                  </Button>
                )}
              </form.Subscribe>
            </form>

            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-primary hover:underline"
              >
                Log in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
