"use client";

import React, { useState } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Field, FieldGroup } from "../ui/field";
import { Label } from "../ui/label";
import { toast } from "sonner";

export default function UpdateStatus({ email }: { email: string }) {
  const [status, setStatus] = useState("unban");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const toastID = toast.loading("User status updating....");
    const token = localStorage.getItem("authToken");

    if (!token) {
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/api/admin/update-status`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            email: email,
            status: status,
          }),
        },
      );

      if (!response.ok) {
        toast.error("New status Creting filed", { id: toastID });
      }

      toast.success("Status update done", { id: toastID });

      setOpen(false);
    } catch (error) {
      console.error("Error:", error);
      toast.error("New status Creting filed", { id: toastID });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="" variant="outline">Change Status</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleUpdate}>
          <DialogHeader>
            <DialogTitle>Update User Status</DialogTitle>
            <DialogDescription>
              Choose a new status for this account.
            </DialogDescription>
          </DialogHeader>

          <div className="py-6">
            <FieldGroup>
              <Field>
                <Label htmlFor="status-select">Select New Status</Label>
                <select
                  id="status-select"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-ring focus:outline-none"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="unban">Unban (Active)</option>
                  <option value="ban">Ban (Blocked)</option>
                </select>
              </Field>
            </FieldGroup>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="ghost" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={loading}
              variant={status === "ban" ? "destructive" : "default"}
            >
              {loading ? "Updating..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
