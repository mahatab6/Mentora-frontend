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
import { Edit2, GripVertical, Plus, Trash2 } from "lucide-react";

type Category = {
  id: string;
  name: string;
  description: string;
  tutors: number;
  bookings: number;
};

export default function CategoriesPage() {
  const handleDelete = (id: string) => {
    console.log("Delete category:", id);
  };

  const categories: Category[] = [
    {
      id: "1",
      name: "Mathematics",
      description: "Algebra, Calculus, Geometry",
      tutors: 45,
      bookings: 1200,
    },
    {
      id: "2",
      name: "Physics",
      description: "Mechanics, Thermodynamics",
      tutors: 32,
      bookings: 850,
    },
    {
      id: "3",
      name: "Computer Science",
      description: "Programming, Algorithms",
      tutors: 58,
      bookings: 1500,
    },
    {
      id: "4",
      name: "English",
      description: "Literature, Writing, ESL",
      tutors: 28,
      bookings: 600,
    },
    {
      id: "5",
      name: "Chemistry",
      description: "Organic, Inorganic",
      tutors: 25,
      bookings: 540,
    },
    {
      id: "6",
      name: "Biology",
      description: "Botany, Zoology, Genetics",
      tutors: 22,
      bookings: 480,
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 p-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Categories</h1>
          <p className="text-muted-foreground">
            Manage subject categories available on the platform.
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" /> Add Category
        </Button>
      </div>

      {/* Card */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10"></TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-center">Tutors</TableHead>
              <TableHead className="text-center">Bookings</TableHead>
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

                <TableCell className="font-medium">{cat.name}</TableCell>

                <TableCell className="text-muted-foreground">
                  {cat.description}
                </TableCell>

                <TableCell className="text-center font-medium">
                  {cat.tutors}
                </TableCell>

                <TableCell className="text-center">{cat.bookings}</TableCell>

                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-blue-600"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
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
