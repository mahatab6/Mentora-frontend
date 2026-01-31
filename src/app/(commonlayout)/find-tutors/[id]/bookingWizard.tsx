'use client';

import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Check, ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { format } from 'date-fns';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { toast } from 'sonner';

// Update these props according to how you open the dialog
type BookingWizardProps = {
  isOpen: boolean;
  onClose: () => void;
  tutor: any
};

const steps = [
  { id: 1, title: 'Select Topic' },
  { id: 2, title: 'Date & Time' },
  { id: 3, title: 'Review & Confirm' },
];

const timeSlots = [
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '01:00 PM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM',
  '05:00 PM',
];

export default function BookingWizard({ isOpen, onClose, tutor }: BookingWizardProps,) {
  

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [bookingData, setBookingData] = useState({
    subject: tutor?.subjects[0] || '',
    date: new Date(),
    timeSlot: '',
    duration: 60,
  });

  const totalPrice = (bookingData.duration / 60) * tutor.hourlyRate;

  const handleNext = () => currentStep < 3 && setCurrentStep(currentStep + 1);
  const handleBack = () => currentStep > 1 && setCurrentStep(currentStep - 1);

  const handleConfirm = async () => {
    // if (!currentUser) {
    //   toast.error({
    //     variant: 'destructive',
    //     title: 'Login required',
    //     description: 'Please log in to book a session.',
    //   });
    //   navigate('/login');
    //   return;
    // }

    setLoading(true);

    // Combine date + time
    const [time, period] = bookingData.timeSlot.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;

    const sessionDateTime = new Date(bookingData.date);
    sessionDateTime.setHours(hours, minutes, 0, 0);

    // try {
    //   const res = await fetch('/api/bookings', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //       student_id: 4566,
    //       tutor_id: tutor.id,
    //       category: bookingData.subject,
    //       date: sessionDateTime.toISOString(),
    //       duration: bookingData.duration,
    //       price: totalPrice,
    //     }),
    //   });

    //   const data = await res.json();

    //   if (!res.ok) throw new Error(data.error || 'Failed to create booking');

    //   toast.success({
    //     title: '🎉 Booking Confirmed!',
    //     description: `Session with ${tutor.name} is scheduled.`,
    //   });

    //   onClose();
    //   navigate(`/bookings/${data.booking.id}`, {
    //     state: { booking: data.booking, tutor },
    //   });
    // } catch (err: any) {
    //   toast.error({
    //     variant: 'destructive',
    //     title: 'Booking Failed',
    //     description: err.message || 'Please try again later.',
    //   });
    // } finally {
    //   setLoading(false);
    // }
  };

  if (!tutor) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[650px] p-0 overflow-hidden">
        {/* Header */}
        <div className="bg-gray-50 p-6 border-b">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              Book Session with {tutor.name}
            </DialogTitle>
            <p className="text-sm text-gray-500 mt-1">
              Step {currentStep} of 3 — {steps[currentStep - 1].title}
            </p>
          </DialogHeader>

          {/* Progress Bar */}
          <div className="flex items-center mt-6">
            {steps.map((step, i) => (
              <React.Fragment key={step.id}>
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm transition-all ${
                    currentStep >= step.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  {currentStep > step.id ? <Check className="h-5 w-5" /> : step.id}
                </div>
                {i < steps.length - 1 && (
                  <div
                    className={`h-1 w-full mx-3 transition-all ${
                      currentStep > step.id ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[65vh] overflow-y-auto">
          {/* Step 1: Subject */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <label className="text-sm font-medium">Select Topic</label>
              <div className="grid gap-3">
                {tutor.subjects.map((subject) => (
                  <button
                    key={subject}
                    onClick={() => setBookingData({ ...bookingData, subject })}
                    className={`p-4 rounded-xl border-2 text-left flex justify-between items-center transition-all ${
                      bookingData.subject === subject
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="font-medium">{subject}</span>
                    {bookingData.subject === subject && <Check className="h-5 w-5" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Date & Time */}
          {currentStep === 2 && (
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium mb-3">Select Date</label>
                <Calendar
                  onChange={(date) => setBookingData({ ...bookingData, date: date as Date })}
                  value={bookingData.date}
                  minDate={new Date()}
                  className="rounded-lg border"
                />
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-3">Available Times</label>
                  <div className="grid grid-cols-2 gap-3">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setBookingData({ ...bookingData, timeSlot: slot })}
                        className={`py-3 rounded-lg border text-sm font-medium transition-all ${
                          bookingData.timeSlot === slot
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'border-gray-300 hover:border-blue-400'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Duration</label>
                  <select
                    value={bookingData.duration}
                    onChange={(e) =>
                      setBookingData({ ...bookingData, duration: Number(e.target.value) })
                    }
                    className="w-full px-4 py-2 border rounded-lg"
                  >
                    <option value={30}>30 minutes</option>
                    <option value={60}>60 minutes</option>
                    <option value={90}>90 minutes</option>
                    <option value={120}>120 minutes</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
                <div className="flex gap-4">
                  <img
                    src={tutor.image}
                    alt={tutor.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-lg">{tutor.name}</h3>
                    <p className="text-blue-600 font-medium">{bookingData.subject}</p>
                    <div className="flex gap-6 mt-2 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <CalendarIcon className="h-4 w-4" />
                        {format(bookingData.date, 'EEEE, MMMM d, yyyy')}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {bookingData.timeSlot} ({bookingData.duration} min)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <span>Session ({bookingData.duration} min)</span>
                  <span className="font-medium">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Service Fee</span>
                  <span className="font-medium">$2.50</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-blue-600">${(totalPrice + 2.5).toFixed(2)}</span>
                </div>
              </div>

              <p className="text-xs text-gray-500">
                By confirming, you agree to our 24-hour free cancellation policy.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-6 bg-gray-50 border-t">
          <Button variant="outline" onClick={handleBack} disabled={currentStep === 1}>
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          {currentStep < 3 ? (
            <Button
              onClick={handleNext}
              disabled={
                (currentStep === 1 && !bookingData.subject) ||
                (currentStep === 2 && (!bookingData.timeSlot || !bookingData.date))
              }
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleConfirm}
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 min-w-[160px]"
            >
              {loading ? 'Confirming...' : 'Confirm & Pay'}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}