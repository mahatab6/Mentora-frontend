"use client";

import { useState, useTransition } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Loader2 } from "lucide-react";
import { StatusBookingBadge } from "@/components/adminComponents/bookingPage/StatusBookinBadge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useBookingManage } from "@/hooks/useBookingManage";

export default function BookingsPage() {
  const [isPending, startTransition] = useTransition();

  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const PAGE_LIMIT = 10;

  const filters = {
    search: searchValue.trim() || undefined,
    status: statusFilter,
    page: currentPage,
    limit: PAGE_LIMIT,
  };

  const { data, loading, error } = useBookingManage(filters);

  const bookings = data?.bookings ?? [];
  const totalPages = data?.meta?.totalPages ?? 1;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(() => {
      setCurrentPage(1);
    });
  };

  const handleStatusChange = (status: string) => {
    startTransition(() => {
      setStatusFilter(status);
      setCurrentPage(1);
    });
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    startTransition(() => {
      setCurrentPage(page);
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 p-4">
      <div>
        <h1 className="text-3xl font-bold">Booking Management</h1>
        <p className="text-muted-foreground">
          Monitor and manage all platform tutoring sessions.
        </p>
      </div>

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        {/* Filters */}
        <div className="p-4 border-b flex flex-wrap gap-4 items-center">
          <form
            className="relative flex-1 min-w-220px"
            onSubmit={handleSearchSubmit}
          >
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by ID..."
              className="pl-9"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </form>

          <div className="flex gap-2 flex-wrap">
            {["All", "upcoming", "completed", "cancelled"].map((status) => (
              <Button
              className="hover:cursor-pointer"
                key={status}
                size="sm"
                variant={statusFilter === status ? "default" : "outline"}
                disabled={isPending || loading}
                onClick={() => handleStatusChange(status)}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Table area */}
        <div className="relative min-h-300px">
          {(loading || isPending) && (
            <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-10">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}

          {error && (
            <div className="p-8 text-center text-destructive">
              <p className="font-medium">Error loading bookings</p>
              <p className="text-sm mt-1">{error}</p>
            </div>
          )}

          {!error && !loading && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Booking ID</TableHead>
                  <TableHead>Parties</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.length > 0 ? (
                  bookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-mono text-xs">
                        #{booking.id}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">
                            {booking.student?.name || "—"}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            with {booking.tutor?.fullName || "—"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{booking.subject || "—"}</TableCell>
                      <TableCell>
                        <StatusBookingBadge status={booking.status} />
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        ${booking.price}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                      No bookings found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-4 border-t">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(currentPage - 1);
                    }}
                    className={currentPage <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>

                {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <PaginationItem key={pageNum}>
                      <PaginationLink
                        href="#"
                        isActive={pageNum === currentPage}
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(pageNum);
                        }}
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}

                {totalPages > 7 && currentPage < totalPages - 3 && (
                  <PaginationItem>
                    <span className="px-4 py-2">...</span>
                  </PaginationItem>
                )}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(currentPage + 1);
                    }}
                    className={currentPage >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
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