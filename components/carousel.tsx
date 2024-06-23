"use client";

import { useState, useRef, useEffect } from "react";

const Carousel = ({ slides, timeSecAdvance, title }: any) => {
  const [isScrolling, setIsScrolling] = useState<boolean>(true);
  const maxScrollWidth: React.MutableRefObject<number> = useRef(0);
  const [currentIndex, setCurrentIndex]: [
    number,
    React.Dispatch<React.SetStateAction<number>>
  ] = useState(0);
  const containerRef: React.MutableRefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement>(null);

  // This useEffect hook is used to create an interval that will advance the carousel every 'timeSecAdvance' seconds
  useEffect(() => {
    // Check if timeSecAdvance is defined and containerRef is not null
    if (timeSecAdvance && containerRef) {
      // Create an interval that will run every 'timeSecAdvance' seconds
      const intervalId = setInterval(() => {
        // Check if containerRef is not null and if the document is not currently scrolling
        if (containerRef.current && isScrolling) {
          // Get the current width of the container
          const currentWidth = (containerRef.current as HTMLElement)
            .offsetWidth;
          // Check if the current index has reached the end of the carousel
          if (currentWidth * currentIndex >= maxScrollWidth.current) {
            // If it has, reset the current index to 0
            setCurrentIndex(0);
          } else {
            // If it hasn't, increment the current index
            setCurrentIndex((prevState: number) => prevState + 1);
          }
        }
      }, timeSecAdvance * 1000);
      // Return a function to clear the interval when the component is unmounted
      return () => clearInterval(intervalId);
    }
  }, [timeSecAdvance, containerRef, currentIndex, isScrolling]);

  // movePrev function: Decrements the current index if it's greater than 0
  const movePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  // moveNext function: Increments the current index if it's within the max scroll width
  const moveNext = (): void => {
    if (
      containerRef.current !== null &&
      (containerRef.current as HTMLElement).offsetWidth * currentIndex <=
        maxScrollWidth.current
    ) {
      setCurrentIndex((prevState: number) => prevState + 1);
    }
  };

  // This function determines whether the prev or next button should be disabled based on the current index and max scroll width
  const isDisabled = (direction: string) => {
    if (direction === "prev") {
      return currentIndex <= 0;
    }

    if (direction === "next" && containerRef.current !== null) {
      return (
        (containerRef.current as HTMLElement).offsetWidth * currentIndex >=
        maxScrollWidth.current
      );
    }

    return false;
  };

  // This useEffect hook is used to scroll the carousel to the current index
  useEffect(() => {
    if (containerRef.current !== null) {
      (containerRef.current as HTMLElement).scrollLeft =
        (containerRef.current as HTMLElement).offsetWidth * currentIndex * 0.4;
    }
  }, [currentIndex]);

  // Calculate max scroll width when component mounts
  useEffect(() => {
    if (containerRef.current !== null) {
      maxScrollWidth.current =
        (containerRef.current as HTMLElement).scrollWidth -
        (containerRef.current as HTMLElement).offsetWidth;
    } else {
      maxScrollWidth.current = 0;
    }
  }, []);

  // This useEffect is used to handle the scroll event and set isScrolling to false
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(false);
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className='carousel px-0 sm:px-8'>
      <h2 className='leading-8 mb-12 px-4 sm:px-0'>{title}</h2>
      <div className='relative overflow-hidden overflow-y-hidden'>
        {slides.length > 2 && (
          <div className='flex justify-between absolute top left w-full h-full'>
            <button
              onClick={movePrev}
              className='hover:bg-blue-900/75 text-white w-10 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300'
              disabled={isDisabled("prev")}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-12 w-20 -ml-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15 19l-7-7 7-7'
                />
              </svg>
              <span className='sr-only'>Prev</span>
            </button>

            <button
              onClick={moveNext}
              className='hover:bg-blue-900/75 text-white w-10 h-full text-center opacity-75 hover:opacity-100 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-300'
              disabled={isDisabled("next")}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-12 w-20 -ml-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M9 5l7 7-7 7'
                />
              </svg>
              <span className='sr-only'>Next</span>
            </button>
          </div>
        )}
        <div
          ref={containerRef}
          className='carousel-container relative flex overflow-x-scroll overflow-y-hidden scroll-smooth snap-x snap-mandatory touch-pan-x z-0 mt-2 gap-8'
        >
          {slides.map((resource: any, index: number) => {
            return (
              <div
                key={index}
                className='carousel-item text-center relative w-64 h-64 snap-start'
              >
                <a
                  href={resource.html_url}
                  className='h-full w-full aspect-square block bg-origin-padding bg-left-top bg-cover bg-no-repeat z-0 rounded-lg'
                  style={{ backgroundImage: `url(${resource.homepage || ""})` }}
                >
                  <img
                    src={resource.homepage || ""}
                    alt={resource.owner.login}
                    className='w-full aspect-square hidden '
                  />
                </a>

                <a
                  href={resource.html_url}
                  className='absolute top-5 left-0 transition-opacity duration-300 opacity-75 hover:opacity-100 bg-blue-800/75 z-50 aspect-square block'
                >
                  <h3 className='text-white py-0 px-3 mx-auto'>
                    {resource.name}
                  </h3>
                </a>
                <div className='flex flex-wrap gap-0 absolute bottom-0 left-0 text-midnight px-4 py-4 pb-4'>
                  {resource.topics &&
                    resource.topics
                      .slice(0, 4)
                      .map((topic: string, index: number) => (
                        <div
                          key={index}
                          className='bg-white rounded-[6px] mx-1 my-1 px-2 py-0 opacity-75'
                        >
                          {topic}
                        </div>
                      ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
