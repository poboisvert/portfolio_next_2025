import React from "react";
import NextLink from "@/components/common/nextlink";

const Page404 = () => {
  return (
    <>
      <title>{`Page Not Found`}</title>
      <main>
        <section
          className='flex flex-col items-center place-content-center px-4 tablet:px-8'
          aria-labelledby='404'
        >
          <h1 id='404'>Not Found</h1>
          <p>
            <NextLink className='focus-outline' href='/'>
              Back to homepage
            </NextLink>
          </p>
        </section>
      </main>
    </>
  );
};

export default Page404;
