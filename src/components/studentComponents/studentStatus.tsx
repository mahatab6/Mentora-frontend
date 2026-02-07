"use client";

import React, { useState } from 'react'
import { Button } from '../ui/button'

import { Loader2 } from "lucide-react"
import { toast } from 'sonner';
import { env } from '@/env';

const NEXT_PUBLIC_BASE_API = env.NEXT_PUBLIC_BASE_API

export default function StudentStatus({ id, refresh }: { id: number, refresh:() => Promise<void> }) {
  const [isLoading, setIsLoading] = useState(false)

  const handleCancel = async () => {

    setIsLoading(true)
      const token = localStorage.getItem("authToken");

    if (!token) {
      return;
    }

    try {
      const response = await fetch(`${NEXT_PUBLIC_BASE_API}/api/student/status`, {
        method: 'PATCH',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
           Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: id,
          status: 'cancelled'
        }),
      })

      if (!response.ok) {
        toast.error('Failed to update status')
      }

    toast.success("Booking Cancelled");
      refresh()
    } catch (error) {
       toast.error("Could not cancel the booking. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button 
      variant="destructive" 
      size="sm"
      onClick={handleCancel}
      disabled={isLoading}
      className='hover:cursor-pointer'
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        "Cancel Booking"
      )}
    </Button>
  )
}