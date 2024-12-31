"use client";

import React, { useRef, RefObject } from "react";
import ItemTimeline from "@/components/item-timeline";
import { timelineData } from "@/lib/content";
import { useEffect, useState } from "react";

function useIsVisible(ref: RefObject<HTMLDivElement | null>): boolean {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIntersecting(entry.isIntersecting);
    });

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return isIntersecting;
}

const TimelinePage = () => {
  return (
    <section className='flex flex-col px-4 sm:px-8'>
      <ul>
        {timelineData.map((item, index) => {
          const ref = useRef<HTMLDivElement | null>(null); // Corrected useRef initialization
          const isVisible = useIsVisible(ref);

          return (
            <div
              ref={ref}
              className={`transition-opacity ease-in duration-[2000ms] ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
              key={index}
            >
              <ItemTimeline
                type={item.type}
                date={item.date}
                title={item.title}
              >
                <p>{item.description}</p>
              </ItemTimeline>
            </div>
          );
        })}
      </ul>
    </section>
  );
};

export default TimelinePage;
