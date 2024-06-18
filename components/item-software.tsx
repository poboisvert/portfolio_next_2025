import React from "react";
import type SvgIcon from "@/components/common/svg-icon";

interface Props {
  hoverClassName: string;
  label: string;
  icon: React.ReactElement<React.ComponentProps<typeof SvgIcon>>;
}

const ItemSoftware = ({ hoverClassName, label, icon }: Props) => {
  const textClassName = `text-center mt-2 mb-0 ${hoverClassName}`;
  const styledIcon = React.cloneElement(icon, {
    className: `${icon.props.className}`,
  });

  return (
    <li
      className={`group flex flex-col flex-auto items-center sm:mx-2 md:mx-4 lg:mx-2 my-4 w-24 ${hoverClassName}`}
      aria-label={label}
    >
      {styledIcon}
      <p className={textClassName}>{label}</p>
    </li>
  );
};

export default ItemSoftware;
