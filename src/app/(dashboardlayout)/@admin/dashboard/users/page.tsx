"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Edit2, Trash2, Search, Loader2 } from "lucide-react";

import { UserStatusBadge } from "@/components/adminComponents/userStatusBadge";
import { useManageUsers } from "@/hooks/useManageUsers";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { env } from "@/env";
import { toast } from "sonner";
import UpdateStatus from "@/components/adminComponents/updateStatus";

const PAGE_LIMIT = 10;

const NEXT_PUBLIC_BASE_API = env.NEXT_PUBLIC_BASE_API

export default function ManageUsersPage() {
 
  const [searchValue, setSearchValue] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [newRole, setNewRole] = useState("");
  const [open, setOpen] = useState(false);

  const filters = {
    email: searchValue.trim() || undefined,
    role: filterRole,
    page: currentPage,
    limit: PAGE_LIMIT,
  };

  const { data, loading, error, refresh } = useManageUsers(filters);

  const users = data?.users ?? [];
  const totalPages = data?.meta?.totalPages ?? 1;

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleUpdate = async (email: string) => {
    const toastID = toast.loading("User role updating....")
   
    try {
      const response = await fetch(`${NEXT_PUBLIC_BASE_API}/api/admin/update-role`, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json" 
        },
        credentials: "include",
        body: JSON.stringify({ email, role: newRole })
      });

      if (!response.ok) {
        toast.error("New Role Creting filed", {id: toastID})
      }
      toast.success("Role update done", {id: toastID});
      refresh()
      setOpen(false);
    } catch (error) {
      console.error("Update error:", error);
        toast.error("Something went wrong", { id: toastID });
    }
  };

  return (
    <div className="space-y-8 p-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
        <p className="text-gray-500">
          Manage students, tutors, and administrators.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by email..."
              className="pl-9"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <Select
            value={filterRole}
            onValueChange={(val) => {
              setFilterRole(val);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="STUDENT">Students</SelectItem>
              <SelectItem value="TUTOR">Tutors</SelectItem>
              <SelectItem value="ADMIN">Admins</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table Area */}
        <div className="relative">
          {loading && (
            <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-10">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          )}

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Email Verified</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {users.length > 0 ? (
                users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-xs">
                          {user.name?.charAt(0) || "U"}
                        </div>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm font-medium">
                      {user.role}
                    </TableCell>
                    <TableCell>
                      <UserStatusBadge
                        status={user.emailVerified ? "Verified" : "Pending"}
                      />
                    </TableCell>
                    <TableCell className="text-gray-500 text-sm">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-gray-500 text-sm">
                      <UpdateStatus email={user.email}/>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Dialog open={open} onOpenChange={setOpen}>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Edit2 className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-sm">
                            <DialogHeader>
                              <DialogTitle>Change Role</DialogTitle>
                            </DialogHeader>
                            <Select
                              value={newRole}
                              onValueChange={(val) => {
                                setNewRole(val);
                              }}
                            >
                              <SelectTrigger className="w-180px">
                                <SelectValue placeholder="New role set" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="STUDENT">Student</SelectItem>
                                <SelectItem value="TUTOR">Tutors</SelectItem>
                                <SelectItem value="ADMIN">Admins</SelectItem>
                              </SelectContent>
                            </Select>
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                              </DialogClose>
                              <Button
                                type="submit"
                                onClick={() => handleUpdate(user.email)}
                              >
                                Save changes
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-8 text-gray-500"
                  >
                    {loading ? "Loading users..." : "No users found"}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-4 border-t">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageChange(currentPage - 1)}
                    className={
                      currentPage <= 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pageNum) => (
                    <PaginationItem key={pageNum}>
                      <PaginationLink
                        isActive={pageNum === currentPage}
                        onClick={() => handlePageChange(pageNum)}
                        className="cursor-pointer"
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  ),
                )}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => handlePageChange(currentPage + 1)}
                    className={
                      currentPage >= totalPages
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
}
