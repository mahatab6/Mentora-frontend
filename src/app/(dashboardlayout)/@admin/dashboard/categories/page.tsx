"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { env } from "@/env";
import { useGetCategory } from "@/hooks/useGetCategory";
import { Edit2, GripVertical, Trash2 } from "lucide-react";

import { toast } from "sonner";
import { AddCategory } from "./addCategory";
import { UpdateCategory } from "./updateCategory";

const NEXT_PUBLIC_BASE_API = env.NEXT_PUBLIC_BASE_API;

type Category = {
  id: number;
  name: string;
  description: string;
};

export default function CategoriesPage() {
  const { category, loading, error, refresh } = useGetCategory();

  const categories = category ?? [];

  const handleDelete = async (id: number) => {
    const toastID = toast.loading("Deleting category...");

    try {
      const response = await fetch(
        `${NEXT_PUBLIC_BASE_API}/api/admin/delete-category`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ id }),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message || "Failed to delete category", {
          id: toastID,
        });
        return;
      }

      toast.success("Category deleted successfully", { id: toastID });
      refresh();
    } catch (error) {
      toast.error("Something went wrong while deleting", { id: toastID });
    }
  };



  return (
    <div className="space-y-8 animate-in fade-in duration-500 p-4">

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Categories</h1>
          <p className="text-muted-foreground">
            Manage subject categories available on the platform.
          </p>
        </div>


        <AddCategory refresh= {refresh}/>
      </div>

      {/* Card */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10"></TableHead>
              <TableHead>Id</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {categories.map((cat) => (
              <TableRow
                key={cat.id}
                className="group hover:bg-muted/40 transition-colors"
              >
                <TableCell className="text-muted-foreground cursor-move">
                  <GripVertical className="h-4 w-4 opacity-0 group-hover:opacity-100" />
                </TableCell>

                <TableCell className="font-medium">{cat.id}</TableCell>
                <TableCell className="font-medium">{cat.name}</TableCell>

                <TableCell className="text-muted-foreground">
                  {cat.description}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <UpdateCategory category={cat} refresh={refresh} />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(cat.id)}
                      className="text-muted-foreground hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
