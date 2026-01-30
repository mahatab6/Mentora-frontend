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
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { Button } from "../ui/button";

const url = process.env.Backend_Url
const tutorProfileSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  country: z.string().min(2, "Country is required"),
  timezone: z.string().min(2, "Timezone is required"),
  languages: z.string().min(2, "Languages required"),
  photoUrl: z.string(),
  introVideoUrl: z.string(),
  shortBio: z.string().max(150, "Max 150 characters"),
  subjects: z.string().min(2, "Subjects required"),
  hourlyRate: z.number().min(1, "Hourly rate required"),
  education: z.string().min(5, "Education required"),
  aboutMe: z.string().min(20, "About me required"),
  lessonDuration: z.enum(["30", "60", "90"]),
});

export function ManageProfileForm({
  ...props
}: React.ComponentProps<typeof Card>) {
  const form = useForm({
    defaultValues: {
      fullName: "",
      country: "",
      timezone: "",
      languages: "",
      photoUrl: "",
      introVideoUrl: "",
      shortBio: "",
      subjects: "",
      hourlyRate: 0,
      education: "",
      aboutMe: "",
      lessonDuration: "60",
    },
    validators: {
      onSubmit: tutorProfileSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Updating profile...");

   
      const payload = {
        fullName: value.fullName.trim(),
        country: value.country.trim(),
        timezone: value.timezone.trim(),
        languages: value.languages
          ? value.languages
              .split(/[, ]+/)
              .map((s) => s.trim())
              .filter(Boolean)
          : [],
        subjects: value.subjects
          ? value.subjects
              .split(/[, ]+/)
              .map((s) => s.trim())
              .filter(Boolean)
          : [],
        photoUrl: value.photoUrl.trim() || "",
        introVideoUrl: value.introVideoUrl.trim() || "",
        shortBio: value.shortBio?.trim() || "",
        aboutMe: value.aboutMe.trim(),
        education: value.education.trim(),
        hourlyRate: Number(value.hourlyRate) || 0,
        lessonDuration: value.lessonDuration,
      };


      try {
        const res = await fetch("http://localhost:5000/api/tutor/manage-profile", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });


        if (!res.ok) {
          toast.error("Failed to update profile", { id: toastId });
        }

        toast.success("Profile updated successfully!", { id: toastId });
        
      } catch (error) {
        console.error("Update error:", error);
        toast.error("Something went wrong", { id: toastId });
      }
    },
  });

  return (
    <Card {...props}>
      <CardHeader className="text-center">
        <CardTitle>Manage Profile</CardTitle>
      </CardHeader>

      <CardContent>
        <form
          id="manageform"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup className="grid lg:grid-cols-2 gap-4">
            {/* Full Name */}
            <form.Field name="fullName">
              {(field) => (
                <Field
                  data-invalid={
                    field.state.meta.isTouched && !field.state.meta.isValid
                  }
                >
                  <FieldLabel>Full Name *</FieldLabel>
                  <Input
                    value={field.state.value ?? ""}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Enter your Full Name"
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>

            {/* Country */}
            <form.Field name="country">
              {(field) => (
                <Field
                  data-invalid={
                    field.state.meta.isTouched && !field.state.meta.isValid
                  }
                >
                  <FieldLabel>Country *</FieldLabel>
                  <Input
                    value={field.state.value ?? ""}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Bangladesh"
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>

            {/* Timezone */}
            <form.Field name="timezone">
              {(field) => (
                <Field
                  data-invalid={
                    field.state.meta.isTouched && !field.state.meta.isValid
                  }
                >
                  <FieldLabel>Timezone *</FieldLabel>
                  <Input
                    value={field.state.value ?? ""}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="GMT+6 or Asia/Dhaka"
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>

            {/* Languages (comma separated) */}
            <form.Field name="languages">
              {(field) => (
                <Field
                  data-invalid={
                    field.state.meta.isTouched && !field.state.meta.isValid
                  }
                >
                  <FieldLabel>Languages (comma separated) *</FieldLabel>
                  <Input
                    value={field.state.value ?? ""}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="English, Bangla, Hindi"
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>

            {/* Subjects (comma separated) */}
            <form.Field name="subjects">
              {(field) => (
                <Field
                  data-invalid={
                    field.state.meta.isTouched && !field.state.meta.isValid
                  }
                >
                  <FieldLabel>Subjects (comma separated) *</FieldLabel>
                  <Input
                    value={field.state.value ?? ""}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="React, Next.js, JavaScript, Math"
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>

            {/* Hourly Rate */}
            <form.Field name="hourlyRate">
              {(field) => (
                <Field
                  data-invalid={
                    field.state.meta.isTouched && !field.state.meta.isValid
                  }
                >
                  <FieldLabel>Hourly Rate (BDT/USD) *</FieldLabel>
                  <Input
                    type="number"
                    value={field.state.value ?? ""}
                    onBlur={field.handleBlur}
                    onChange={(e) =>
                      field.handleChange(
                        e.target.value ? Number(e.target.value) : 0
                      )
                    }
                    placeholder="500"
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>

            {/* Lesson Duration */}
            <form.Field name="lessonDuration">
              {(field) => (
                <Field
                  data-invalid={
                    field.state.meta.isTouched && !field.state.meta.isValid
                  }
                >
                  <FieldLabel>Lesson Duration *</FieldLabel>
                  <select
                    value={field.state.value ?? "60"}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="w-full border rounded px-3 py-2 bg-white"
                  >
                    <option value="30">30 Minutes</option>
                    <option value="60">60 Minutes</option>
                    <option value="90">90 Minutes</option>
                  </select>
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>

            {/* Photo URL */}
            <form.Field name="photoUrl">
              {(field) => (
                <Field
                  data-invalid={
                    field.state.meta.isTouched && !field.state.meta.isValid
                  }
                >
                  <FieldLabel>Profile Photo URL</FieldLabel>
                  <Input
                    value={field.state.value ?? ""}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="https://example.com/photo.jpg"
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>

            {/* Intro Video URL */}
            <form.Field name="introVideoUrl">
              {(field) => (
                <Field
                  data-invalid={
                    field.state.meta.isTouched && !field.state.meta.isValid
                  }
                >
                  <FieldLabel>Intro Video URL</FieldLabel>
                  <Input
                    value={field.state.value ?? ""}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="https://example.com/intro.mp4"
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>

            {/* Short Bio */}
            <form.Field name="shortBio">
              {(field) => (
                <Field
                  data-invalid={
                    field.state.meta.isTouched && !field.state.meta.isValid
                  }
                  className="lg:col-span-2"
                >
                  <FieldLabel>Short Bio (max 150 chars)</FieldLabel>
                  <Input
                    value={field.state.value ?? ""}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Friendly React tutor with 5+ years experience..."
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>

            {/* Education */}
            <form.Field name="education">
              {(field) => (
                <Field
                  data-invalid={
                    field.state.meta.isTouched && !field.state.meta.isValid
                  }
                  className="lg:col-span-2"
                >
                  <FieldLabel>Education *</FieldLabel>
                  <Input
                    value={field.state.value ?? ""}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="BSc in Computer Science, University of Dhaka"
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>

            {/* About Me */}
            <form.Field name="aboutMe">
              {(field) => (
                <Field
                  data-invalid={
                    field.state.meta.isTouched && !field.state.meta.isValid
                  }
                  className="lg:col-span-2"
                >
                  <FieldLabel>About Me *</FieldLabel>
                  <textarea
                    className="w-full border rounded p-3 min-h-[140px] resize-y"
                    value={field.state.value ?? ""}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Tell students about yourself, your teaching style, experience..."
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="flex justify-end">
        <Button
          form="manageform"
          type="submit"
          disabled={form.state.isSubmitting}
          className="min-w-[180px]"
        >
          {form.state.isSubmitting ? "Saving..." : "Save Profile"}
        </Button>
      </CardFooter>
    </Card>
  );
}