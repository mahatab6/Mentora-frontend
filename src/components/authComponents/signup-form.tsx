"use client";

import {
  Card,
  CardContent,
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
import * as z from "zod";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { Button } from "../ui/button";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

const formSchema = z.object({
  name: z.string().min(3, "Full name must be at least 3 characters"),

  email: z.email("Please enter a valid email address"),

  password: z.string().min(6, "Password must be at least 6 characters"),
});

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const signupData = {
        name: value.name,
        email: value.email,
        password: value.password,
        image: "https://i.ibb.co.com/wZBN3SbM/Dr-Ayesha-Rahman.jpg"
      }
  const toastId = toast.loading("Creating your account...");

  try {
    const { data, error } = await authClient.signUp.email(signupData);

    if (error) {
      
      toast.error(
        error.message || "Unable to create account. Please try again.",
        { id: toastId }
      );
      return;
    }

   
    toast.success(
      "Account created successfully!",
      { id: toastId }
    );

    
  } catch (err) {
   
    toast.error(
      "Something went wrong. Check your internet connection and try again.",
      { id: toastId }
    );
  }
}});

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle className="text-center">Create Student Account</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          id="sign-up-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field name="name">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel>Full Name</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Enter your name"
                      autoComplete="name"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="email">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel>Email</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="email"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="you@example.com"
                      autoComplete="email"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="password">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel>Password</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="password"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="••••••••"
                      autoComplete="new-password"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

          </FieldGroup>
        </form>
        
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <Button form="sign-up-form" type="submit" className="w-full hover:cursor-pointer">
          Submit
        </Button>
        <FieldDescription className="px-6 text-center">
          Already have an account? <Link href="/login">Login</Link>
        </FieldDescription>
      </CardFooter>
    </Card>
  );
}
