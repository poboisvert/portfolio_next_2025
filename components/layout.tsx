import React from "react";

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='grid grid-cols-[1fr,min(75ch,100%),1fr] [&>*]:col-[2] min-h-[calc(100vh-13.25rem)]'>
      {children}
    </main>
  );
};

export default PageWrapper;
