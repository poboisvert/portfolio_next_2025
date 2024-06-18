import React from "react";
import Emoji from "@/components/common/emoji";

type ItemType = "education" | "travel" | "work";

interface Props {
  date: string;
  title: string;
  type: ItemType | string;
}

const typeEmoji: Record<ItemType, string> = {
  education: "👨‍🎓",
  travel: "🚀",
  work: "🖥️",
};
const ItemTimeline = ({
  children,
  date,
  title,
  type,
}: React.PropsWithChildren<Props>) => {
  const dateFormat = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
  });

  const dateString = dateFormat.format(new Date(date));
  const symbol = typeEmoji[type as ItemType];

  return (
    <li className='flex flex-col'>
      <div className='flex items-center py-2'>
        <span className='border-2 rounded-full border-neon-blue dark:border-green w-4 h-4'></span>
        <time className='text-lg font-semibold px-4' dateTime={date}>
          {dateString}
        </time>
      </div>
      <div className='flex flex-col pl-8 text-gray-800 dark:text-gray-400 relative -z-[1] before:bg-gray-800 dark:before:bg-gray-400 before:h-full before:w-[2px] before:absolute before:left-[0.45em]'>
        <h3 className='text-text-midnight dark:text-gray-100'>
          {title} {<Emoji label={type} symbol={symbol} />}
        </h3>
        {children}
      </div>
    </li>
  );
};

export default ItemTimeline;
