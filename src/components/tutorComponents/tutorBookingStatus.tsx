"use client";

import React, { useState } from 'react'
import { Button } from '../ui/button'

import { Loader2 } from "lucide-react"
import { toast } from 'sonner';
import { env } from '@/env';

const NEXT_PUBLIC_BASE_API = env.NEXT_PUBLIC_BASE_API

export default function TutorBookingStatus({ id, refresh }: { id: number,  refresh: () => Promise<void>; }) {
  const [isLoading, setIsLoading] = useState(false)

  const handlecompleted = async () => {

    setIsLoading(true)
    const token = localStorage.getItem("authToken");

    if (!token) {
      return;
    }

    try {
      const response = await fetch(`${NEXT_PUBLIC_BASE_API}/api/tutor/status`, {
        method: 'PATCH',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: id,
          status: 'completed'
        }),
      })

      if (!response.ok) {
        toast.error('Failed to completed status')
      }

    toast.success("Booking completed");
      await refresh()
    } catch (error) {
  
       toast.error("Could not completed the booking. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button 
     
      size="sm"
      onClick={handlecompleted}
      disabled={isLoading}
      className='hover:cursor-pointer hover:bg-white bg-green-100 text-green-800'
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        "completed Booking"
      )}
    </Button>
  )
}