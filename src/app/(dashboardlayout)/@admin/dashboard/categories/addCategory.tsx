import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { env } from "@/env";
import { promises } from "dns";

const NEXT_PUBLIC_BASE_API = env.NEXT_PUBLIC_BASE_API;

export function AddCategory({refresh} :{refresh:() => Promise<void>}) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    const toastId = toast.loading("Creating category...");

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name");
    const description = formData.get("description");

    try {
      const response = await fetch(`${NEXT_PUBLIC_BASE_API}/api/admin/create-category`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Category added successfully!", { id: toastId });
        setOpen(false); 
        refresh(); 
      } else {
        toast.error(result.message || "Failed to add category", { id: toastId });
      }
    } catch (error: unknown) {
      toast.error("Something went wrong", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" /> Add Category
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
            <DialogDescription>
              Enter the name and description for the new subject category.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Category Name</Label>
              <Input id="name" name="name" placeholder="e.g. Mathematics" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input id="description" name="description" placeholder="Short description..." required />
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Category"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}