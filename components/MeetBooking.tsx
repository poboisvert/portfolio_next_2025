"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Video, Loader2, CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const availableTimeSlots = [
  "09:00",
  "10:00",
  "11:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
];

const confirmSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
});

type ConfirmData = z.infer<typeof confirmSchema>;

export default function MeetBooking() {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingStep, setBookingStep] = useState<"select" | "confirm">(
    "select"
  );
  const [tempBooking, setTempBooking] = useState<{
    eventId: string;
    meetLink: string;
    expiresAt: string;
  }>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ConfirmData>({
    resolver: zodResolver(confirmSchema),
  });

  const handleRequestMeeting = async () => {
    if (!selectedDate || !selectedTime) {
      toast.error("Please select both date and time");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: format(selectedDate, "yyyy-MM-dd"),
          time: selectedTime,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to book meeting");
      }

      const data = await response.json();
      setTempBooking(data);
      setBookingStep("confirm");
      toast.success("Time slot reserved! Please confirm your details.");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to schedule meeting"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmMeeting = async (data: ConfirmData) => {
    if (!tempBooking) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/confirm-meeting", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventId: tempBooking.eventId,
          ...data,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to confirm meeting");
      }

      const result = await response.json();
      toast.success("Meeting confirmed! Check your email for details.");
      window.open(result.meetLink, "_blank");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to confirm meeting"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className='py-20 px-4 bg-white'>
      <div className='max-w-6xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='text-center mb-12'
        >
          <h2 className='text-4xl font-bold text-gray-900 mb-4'>
            Schedule a Meeting
          </h2>
          <p className='text-xl text-gray-600'>
            Book a Google Meet consultation to discuss your project
          </p>
        </motion.div>

        {bookingStep === "select" ? (
          <div className='grid md:grid-cols-2 gap-8'>
            {/* Calendar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className='bg-white rounded-2xl p-6 shadow-lg border border-[#21cd99]/10'
            >
              <div className='flex items-center gap-2 mb-6'>
                <Calendar className='w-5 h-5 text-[#21cd99]' />
                <h3 className='text-xl font-semibold text-gray-900'>
                  Select a Date
                </h3>
              </div>
              <DayPicker
                mode='single'
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={{ before: new Date() }}
                className='border-0'
                classNames={{
                  day_selected: "bg-[#21cd99] text-white",
                  day_today: "bg-[#21cd99]/10 text-[#21cd99]",
                }}
              />
            </motion.div>

            {/* Time Slots */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className='bg-white rounded-2xl p-6 shadow-lg border border-[#21cd99]/10'
            >
              <div className='flex items-center gap-2 mb-6'>
                <Clock className='w-5 h-5 text-[#21cd99]' />
                <h3 className='text-xl font-semibold text-gray-900'>
                  Select a Time
                </h3>
              </div>
              <div className='grid grid-cols-2 gap-3'>
                {availableTimeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`p-3 rounded-lg border transition-colors ${
                      selectedTime === time
                        ? "bg-[#21cd99] text-white border-[#21cd99]"
                        : "border-gray-200 hover:border-[#21cd99] text-gray-700"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>

              <div className='mt-8'>
                <button
                  onClick={handleRequestMeeting}
                  disabled={!selectedDate || !selectedTime || isSubmitting}
                  className='w-full bg-[#21cd99] text-white py-4 px-6 rounded-lg font-medium flex items-center justify-center gap-2 disabled:opacity-50 transition-opacity'
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className='w-5 h-5 animate-spin' />
                      Checking availability...
                    </>
                  ) : (
                    <>
                      <Video className='w-5 h-5' />
                      Request Meeting
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='max-w-md mx-auto bg-white rounded-2xl p-8 shadow-lg border border-[#21cd99]/10'
          >
            <div className='flex items-center gap-3 mb-6'>
              <div className='w-10 h-10 bg-[#21cd99]/10 rounded-full flex items-center justify-center'>
                <CheckCircle className='w-6 h-6 text-[#21cd99]' />
              </div>
              <div>
                <h3 className='font-semibold text-gray-900'>
                  Time Slot Reserved
                </h3>
                <p className='text-sm text-gray-500'>
                  Please confirm your details
                </p>
              </div>
            </div>

            <form
              onSubmit={handleSubmit(handleConfirmMeeting)}
              className='space-y-4'
            >
              <div>
                <label
                  htmlFor='name'
                  className='block text-sm font-medium text-gray-700 mb-1'
                >
                  Your Name
                </label>
                <input
                  {...register("name")}
                  type='text'
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#21cd99] focus:border-transparent'
                  placeholder='John Doe'
                />
                {errors.name && (
                  <p className='mt-1 text-sm text-red-600'>
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-gray-700 mb-1'
                >
                  Email Address
                </label>
                <input
                  {...register("email")}
                  type='email'
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#21cd99] focus:border-transparent'
                  placeholder='john@example.com'
                />
                {errors.email && (
                  <p className='mt-1 text-sm text-red-600'>
                    {errors.email.message}
                  </p>
                )}
              </div>

              <button
                type='submit'
                disabled={isSubmitting}
                className='w-full bg-[#21cd99] text-white py-4 px-6 rounded-lg font-medium flex items-center justify-center gap-2 disabled:opacity-50'
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className='w-5 h-5 animate-spin' />
                    Confirming...
                  </>
                ) : (
                  <>
                    <CheckCircle className='w-5 h-5' />
                    Confirm Meeting
                  </>
                )}
              </button>
            </form>
          </motion.div>
        )}
      </div>
    </section>
  );
}
