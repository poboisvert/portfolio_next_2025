"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  Video,
  Loader2,
  Send,
  MessageSquare,
  ChevronRight,
  ChevronLeft,
  Globe,
} from "lucide-react";
import {
  format,
  isBefore,
  startOfMonth,
  addMonths,
  isSameMonth,
} from "date-fns";
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

const bookingSchema = z.object({
  date: z
    .string()
    .refine(
      (value) => !Number.isNaN(Date.parse(value)),
      "Please select a valid date"
    ),
  time: z.string(),
  email: z.string().email("Invalid email address"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  location: z.string().optional(),
  timeZone: z.string().optional(),
});

const messageSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type BookingData = z.infer<typeof bookingSchema>;
type MessageData = z.infer<typeof messageSchema>;

type ContactMode = "message" | "meeting";

export default function ContactAndBooking() {
  const [mode, setMode] = useState<ContactMode>("message");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [month, setMonth] = useState<Date>(new Date());

  const bookingForm = useForm<BookingData>({
    resolver: zodResolver(bookingSchema),
  });

  const messageForm = useForm<MessageData>({
    resolver: zodResolver(messageSchema),
  });

  const handleMonthChange = (newMonth: Date) => {
    if (!isBefore(newMonth, startOfMonth(new Date()))) {
      setMonth(newMonth);
    }
  };

  const CalendarNavigation = ({
    month,
    onMonthChange,
  }: {
    month: Date;
    onMonthChange: (newMonth: Date) => void;
  }) => {
    const currentMonth = new Date();
    const isCurrentMonth = isSameMonth(month, currentMonth);

    return (
      <div className='flex items-center justify-between px-1 py-2'>
        <button
          onClick={() => onMonthChange(addMonths(month, -1))}
          disabled={isCurrentMonth}
          className={`p-2 rounded-full transition-colors ${
            isCurrentMonth
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-600 hover:bg-[#21cd99]/10 hover:text-[#21cd99]"
          }`}
          aria-label='Previous month'
        >
          <ChevronLeft className='w-5 h-5' />
        </button>
        <div className='font-medium text-gray-900'>
          {format(month, "MMMM yyyy")}
        </div>
        <button
          onClick={() => onMonthChange(addMonths(month, 1))}
          className='p-2 rounded-full text-gray-600 hover:bg-[#21cd99]/10 hover:text-[#21cd99] transition-colors'
          aria-label='Next month'
        >
          <ChevronRight className='w-5 h-5' />
        </button>
      </div>
    );
  };

  const handleBookMeeting = async (data: BookingData) => {
    if (!selectedDate || !selectedTime) {
      toast.error("Please select both date and time");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/book-meeting", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          date: format(selectedDate, "yyyy-MM-dd"),
          time: selectedTime,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to book meeting");
      }

      const result = await response.json();
      if (result.status === "success") {
        toast.success("Meeting booked! Check your email for details.");
      }
      bookingForm.reset();
      setSelectedDate(undefined);
      setSelectedTime(undefined);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to schedule meeting"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendMessage = async (data: MessageData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to send message");

      toast.success("Message sent successfully!");
      messageForm.reset();
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className='py-20 px-4 bg-gray-50' id='contact'>
      <div className='max-w-6xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='text-center mb-12'
        >
          <h2 className='text-4xl font-bold text-gray-900 mb-4'>
            Get in Touch
          </h2>
          <p className='text-xl text-gray-600 mb-8'>
            Choose how you'd like to connect with us
          </p>

          <div className='inline-flex rounded-lg border border-gray-200 p-1 bg-white'>
            <button
              onClick={() => setMode("message")}
              className={`px-4 py-2 rounded-md transition-colors ${
                mode === "message"
                  ? "bg-[#21cd99] text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <div className='flex items-center gap-2'>
                <MessageSquare className='w-4 h-4' />
                Send Message
              </div>
            </button>
            <button
              onClick={() => setMode("meeting")}
              className={`px-4 py-2 rounded-md transition-colors ${
                mode === "meeting"
                  ? "bg-[#21cd99] text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <div className='flex items-center gap-2'>
                <Video className='w-4 h-4' />
                Book Meeting
              </div>
            </button>
          </div>
        </motion.div>

        <AnimatePresence mode='wait'>
          {mode === "message" ? (
            <motion.form
              key='message-form'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onSubmit={messageForm.handleSubmit(handleSendMessage)}
              className='max-w-3xl mx-auto bg-white rounded-2xl p-8 shadow-lg border border-[#21cd99]/10'
            >
              <div className='space-y-6'>
                <div>
                  <label
                    htmlFor='fullName'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    Full Name
                  </label>
                  <input
                    {...messageForm.register("fullName")}
                    type='text'
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#21cd99] focus:border-transparent'
                    placeholder='John Doe'
                  />
                  {messageForm.formState.errors.fullName && (
                    <p className='mt-1 text-sm text-red-600'>
                      {messageForm.formState.errors.fullName.message}
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
                    {...messageForm.register("email")}
                    type='email'
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#21cd99] focus:border-transparent'
                    placeholder='john@example.com'
                  />
                  {messageForm.formState.errors.email && (
                    <p className='mt-1 text-sm text-red-600'>
                      {messageForm.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor='subject'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    Subject
                  </label>
                  <input
                    {...messageForm.register("subject")}
                    type='text'
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#21cd99] focus:border-transparent'
                    placeholder='Project Discussion'
                  />
                  {messageForm.formState.errors.subject && (
                    <p className='mt-1 text-sm text-red-600'>
                      {messageForm.formState.errors.subject.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor='message'
                    className='block text-sm font-medium text-gray-700 mb-1'
                  >
                    Message
                  </label>
                  <textarea
                    {...messageForm.register("message")}
                    rows={5}
                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#21cd99] focus:border-transparent'
                    placeholder='Tell us about your project...'
                  />
                  {messageForm.formState.errors.message && (
                    <p className='mt-1 text-sm text-red-600'>
                      {messageForm.formState.errors.message.message}
                    </p>
                  )}
                </div>

                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='w-full bg-[#21cd99] text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 disabled:opacity-70'
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className='w-5 h-5 animate-spin' />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className='w-5 h-5' />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </motion.form>
          ) : (
            <motion.form
              key='booking-form'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onSubmit={bookingForm.handleSubmit(handleBookMeeting)}
              className='max-w-3xl mx-auto'
            >
              <div className='grid md:grid-cols-2 gap-8'>
                <div className='bg-white rounded-2xl p-6 shadow-lg border border-[#21cd99]/10'>
                  <div className='flex items-center gap-2 mb-6'>
                    <Calendar className='w-5 h-5 text-[#21cd99]' />
                    <h3 className='text-xl font-semibold text-gray-900'>
                      Select a Date
                    </h3>
                  </div>
                  <DayPicker
                    mode='single'
                    selected={selectedDate}
                    onSelect={(date) => {
                      setSelectedDate(date);
                      if (date) {
                        bookingForm.setValue("date", date.toISOString());
                      }
                    }}
                    month={month}
                    onMonthChange={handleMonthChange}
                    disabled={{ before: new Date() }}
                    components={{
                      Caption: ({ displayMonth }) => (
                        <CalendarNavigation
                          month={displayMonth}
                          onMonthChange={handleMonthChange}
                        />
                      ),
                    }}
                    className='border-0'
                    classNames={{
                      day_selected:
                        "bg-[#21cd99] text-white hover:bg-[#21cd99]/90",
                      day_today: "bg-[#21cd99]/10 text-[#21cd99] font-semibold",
                      day: "hover:bg-[#21cd99]/5 rounded-lg transition-colors",
                      day_disabled:
                        "text-gray-300 hover:bg-transparent cursor-not-allowed",
                      nav: "hidden",
                      caption: "mb-4",
                      head_cell: "text-gray-500 font-medium",
                      table: "w-full border-collapse",
                      cell: "p-0 relative",
                      button:
                        "w-10 h-10 hover:bg-[#21cd99]/5 rounded-lg transition-colors",
                    }}
                  />
                </div>

                <div className='space-y-6 bg-white rounded-2xl p-6 shadow-lg border border-[#21cd99]/10'>
                  <div>
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
                          type='button'
                          onClick={() => {
                            setSelectedTime(time);
                            bookingForm.setValue("time", time);
                          }}
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
                  </div>

                  <div>
                    <label
                      htmlFor='name'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      Your Name
                    </label>
                    <input
                      {...bookingForm.register("name")}
                      type='text'
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#21cd99] focus:border-transparent'
                      placeholder='John Doe'
                    />
                    {bookingForm.formState.errors.name && (
                      <p className='mt-1 text-sm text-red-600'>
                        {bookingForm.formState.errors.name.message}
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
                      {...bookingForm.register("email")}
                      type='email'
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#21cd99] focus:border-transparent'
                      placeholder='john@example.com'
                    />
                    {bookingForm.formState.errors.email && (
                      <p className='mt-1 text-sm text-red-600'>
                        {bookingForm.formState.errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor='location'
                      className='block text-sm font-medium text-gray-700 mb-1'
                    >
                      Location (Optional)
                    </label>
                    <div className='relative'>
                      <input
                        {...bookingForm.register("location")}
                        type='text'
                        className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#21cd99] focus:border-transparent'
                        placeholder='City, Country'
                      />
                      <Globe className='w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2' />
                    </div>
                  </div>

                  <button
                    type='submit'
                    disabled={isSubmitting || !selectedDate || !selectedTime}
                    className='w-full bg-[#21cd99] text-white py-4 px-6 rounded-lg font-medium flex items-center justify-center gap-2 disabled:opacity-50 transition-opacity'
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className='w-5 h-5 animate-spin' />
                        Booking Meeting...
                      </>
                    ) : (
                      <>
                        <Video className='w-5 h-5' />
                        Book Meeting
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
