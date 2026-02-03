"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { env } from "@/env";
import * as z from "zod";

import { useForm } from "@tanstack/react-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useGetCategory } from "@/hooks/useGetCategory";
import { useSingleTutor } from "@/hooks/useSingleTuor";
import { Tutor } from "@/type";

const NEXT_PUBLIC_BASE_API = env.NEXT_PUBLIC_BASE_API;

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
  category: z.string(),
  lessonDuration: z.enum(["30", "60", "90"]),
});

export function UpdateProfile({ id }: { id: string }) {
  const { category } = useGetCategory();
  const categories = category ?? [];
  const [open, setOpen] = useState(false);

  const { singleTutor, refresh } = useSingleTutor(id);

  const tutor: Tutor | undefined = singleTutor;

  console.log(tutor?.fullName);

  const form = useForm({
    defaultValues: {
      fullName: tutor?.fullName ?? "",
      country: tutor?.country ?? "",
      timezone: tutor?.timezone ?? "",
      languages: tutor?.languages ? tutor.languages.join(", ") : "",
      photoUrl: tutor?.photoUrl ?? "",
      shortBio: tutor?.shortBio ?? "",
      subjects: tutor?.subjects ? tutor.subjects.join(", ") : "",
      hourlyRate: tutor?.hourlyRate ?? 0,
      education: tutor?.education ?? "",
      aboutMe: tutor?.aboutMe ?? "",
      lessonDuration: tutor?.lessonDuration ?? "60",
      category: tutor?.category ?? "",
      introVideoUrl: tutor?.introVideoUrl ?? "",
    },
    validators: { onSubmit: tutorProfileSchema },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Saving your profile...");

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
        category: value.category,
        tutor_id: tutor?.tutor_id
      };

      try {
        const res = await fetch(
          `${NEXT_PUBLIC_BASE_API}/api/tutor/tutor-profile-update`,
          {
            method: "PATCH",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          },
        );

        if (!res.ok) throw new Error();
        toast.success("Profile updated!", { id: toastId });
        refresh()
        setOpen(false)
      } catch (error) {
        toast.error("Failed to update profile", { id: toastId });
      }
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Update Public Profile</Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[95vh] overflow-y-auto p-4">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-2xl font-bold text-indigo-900">
            Update Tutor Profile
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <form.Field name="fullName">
              {(field) => (
                <Field>
                  <FieldLabel className="text-indigo-700">Full Name</FieldLabel>
                  <Input
                    {...field.state}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>

            {/* Category Dropdown using Shadcn Select */}
            <form.Field name="category">
              {(field) => (
                <Field>
                  <FieldLabel className="text-indigo-700">
                    Teaching Category
                  </FieldLabel>
                  <Select
                    onValueChange={field.handleChange}
                    defaultValue={field.state.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.name}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                  <FieldLabel className="text-indigo-700">Country</FieldLabel>

                  <Input
                    value={field.state.value ?? ""}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
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
                  <FieldLabel className="text-indigo-700">
                    Timezone *
                  </FieldLabel>

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

            {/* Subjects (comma separated) */}

            <form.Field name="subjects">
              {(field) => (
                <Field
                  data-invalid={
                    field.state.meta.isTouched && !field.state.meta.isValid
                  }
                >
                  <FieldLabel className="text-indigo-700">
                    Subjects (comma separated) *
                  </FieldLabel>

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
                <Field>
                  <FieldLabel className="text-indigo-700">
                    Hourly Rate ($)
                  </FieldLabel>
                  <Input
                    type="number"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
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
                  <FieldLabel className="text-indigo-700">
                    Lesson Duration *
                  </FieldLabel>

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
                  <FieldLabel className="text-indigo-700">
                    Profile Photo URL
                  </FieldLabel>

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
                  <FieldLabel className="text-indigo-700">
                    Intro Video URL
                  </FieldLabel>

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

            {/* Languages */}
            <form.Field name="languages">
              {(field) => (
                <Field>
                  <FieldLabel className="text-indigo-700">Languages</FieldLabel>
                  <Input
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="English, Spanish"
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
                  <FieldLabel className="text-indigo-700">
                    Education *
                  </FieldLabel>

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

            {/* Short Bio - Full Width */}
            <div className="md:col-span-2">
              <form.Field name="shortBio">
                {(field) => (
                  <Field>
                    <FieldLabel className="text-indigo-700">
                      Short Catchy Bio
                    </FieldLabel>
                    <Input
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Expert React Developer with a passion for teaching."
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              </form.Field>
            </div>

            {/* About Me - Full Width */}
            <div className="md:col-span-2">
              <form.Field name="aboutMe">
                {(field) => (
                  <Field>
                    <FieldLabel className="text-indigo-700">
                      Detailed About Me
                    </FieldLabel>
                    <Textarea
                      className="min-h-[120px]"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Describe your teaching methodology..."
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              </form.Field>
            </div>
          </FieldGroup>

          <div className="flex justify-end gap-3 pt-4 border-t mt-6">
            <Button
              type="submit"
              disabled={form.state.isSubmitting}
              className="bg-indigo-600 hover:bg-indigo-700 w-full sm:w-auto px-10"
            >
              {form.state.isSubmitting ? "Saving Changes..." : "Save Profile"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
