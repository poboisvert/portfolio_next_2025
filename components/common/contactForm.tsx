"use client";
import React, { useState, FormEvent, ChangeEvent } from "react";
import NextLink from "./nextlink";
import { profile } from "@/lib/content";

interface Errors {
  fullname?: boolean;
  email?: boolean;
  subject?: boolean;
  message?: boolean;
}

export default function ContactForm() {
  const [fullname, setFullname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  //   Form validation
  const [errors, setErrors] = useState<Errors>({});

  //   Setting button text
  const [buttonText, setButtonText] = useState<string>("Send");

  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const [showFailureMessage, setShowFailureMessage] = useState<boolean>(false);

  // Validate form fields and set errors
  const handleValidation = () => {
    const tempErrors: Errors = {};
    let isValid = true;

    if (!fullname) {
      tempErrors["fullname"] = true;
      isValid = false;
    }
    if (!email) {
      tempErrors["email"] = true;
      isValid = false;
    }
    if (!subject) {
      tempErrors["subject"] = true;
      isValid = false;
    }
    if (!message) {
      tempErrors["message"] = true;
      isValid = false;
    }

    setErrors({ ...tempErrors });
    console.log("errors", errors);
    return isValid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    let isValidForm = handleValidation();

    if (isValidForm) {
      setButtonText("Sending");
      const res = await fetch("/api/sendgrid", {
        body: JSON.stringify({
          email: email,
          fullname: fullname,
          subject: subject,
          message: message,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const { error } = await res.json();
      if (error) {
        console.log(error);
        setShowSuccessMessage(false);
        setShowFailureMessage(true);
        setButtonText("Send");

        // Reset form fields
        setFullname("");
        setEmail("");
        setMessage("");
        setSubject("");
        return;
      }
      setShowSuccessMessage(true);
      setShowFailureMessage(false);
      setButtonText("Send");
      // Reset form fields
      setFullname("");
      setEmail("");
      setMessage("");
      setSubject("");
    }
    console.log(fullname, email, subject, message);
  };

  return (
    <>
      <section
        className='p-8 grid grid-cols-1 md:grid-cols-2 gap-8 pt-10 px-4 sm:px-8'
        id='contact'
      >
        <div className='w-full min-w-full mx-auto mb-10 md:mt-10'>
          <h2 className='mt-0'>Lets talk about your projects.</h2>
          <p className='text-sm text-gray-700 mt-4 font-light dark:text-gray-200'>
            Fill the form and send in your inquery. I will respond as soon as I
            can. <br />
            <br />
            Alternatively, you can reach out to me on{" "}
            <NextLink className='focus-outline' href={profile.linkedin}>
              LinkedIn.
            </NextLink>
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className='rounded-lg sm:shadow-xl flex flex-col px-0 py-8 sm:px-8'
        >
          <h3>Send a message</h3>

          <label
            htmlFor='fullname'
            className='text-gray-500 font-light mt-8 dark:text-gray-50'
          >
            Full name<span className='text-red-500 dark:text-gray-50'>*</span>
          </label>
          <input
            type='text'
            value={fullname}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setFullname(e.target.value);
            }}
            name='fullname'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          />
          {errors?.fullname && (
            <p className='text-red-500'>Fullname cannot be empty.</p>
          )}

          <label
            htmlFor='email'
            className='text-gray-500 font-light mt-4 dark:text-gray-50'
          >
            E-mail<span className='text-red-500'>*</span>
          </label>
          <input
            type='email'
            name='email'
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value);
            }}
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          />
          {errors?.email && (
            <p className='text-red-500'>Email cannot be empty.</p>
          )}

          <label
            htmlFor='subject'
            className='text-gray-500 font-light mt-4 dark:text-gray-50'
          >
            Subject<span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            name='subject'
            value={subject}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setSubject(e.target.value);
            }}
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          />
          {errors?.subject && (
            <p className='text-red-500'>Subject cannot be empty.</p>
          )}
          <label
            htmlFor='message'
            className='text-gray-500 font-light mt-4 dark:text-gray-50'
          >
            Message<span className='text-red-500'>*</span>
          </label>
          <textarea
            name='message'
            value={message}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
              setMessage(e.target.value);
            }}
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          ></textarea>
          {errors?.message && (
            <p className='text-red-500'>Message body cannot be empty.</p>
          )}
          <div className='flex flex-row items-center justify-start'>
            <button
              type='submit'
              className='px-10 mt-8 py-2  bg-neon-blue dark:bg-green text-gray-50 font-light rounded-md text-lg flex flex-row items-center'
            >
              {buttonText}
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                className='text-cyan-500 ml-2'
                fill='currentColor'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M9.00967 5.12761H11.0097C12.1142 5.12761 13.468 5.89682 14.0335 6.8457L16.5089 11H21.0097C21.562 11 22.0097 11.4477 22.0097 12C22.0097 12.5523 21.562 13 21.0097 13H16.4138L13.9383 17.1543C13.3729 18.1032 12.0191 18.8724 10.9145 18.8724H8.91454L12.4138 13H5.42485L3.99036 15.4529H1.99036L4.00967 12L4.00967 11.967L2.00967 8.54712H4.00967L5.44417 11H12.5089L9.00967 5.12761Z'
                  fill='currentColor'
                />
              </svg>
            </button>
          </div>
          <div className='text-left'>
            {showSuccessMessage && (
              <p className='text-green-500 font-semibold text-sm my-2'>
                Your Message has been delivered.
              </p>
            )}
            {showFailureMessage && (
              <p className='text-red-500'>
                Oops! Something went wrong, please try again.
              </p>
            )}
          </div>
        </form>
      </section>
    </>
  );
}
