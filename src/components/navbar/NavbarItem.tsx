import React from "react";
import { twMerge } from "tailwind-merge";

const NavbarItem = ({
  label,
  onClick,
  className,
}: {
  label: string;
  onClick?: () => void;
  className?: string;
}) => {
  return (
    <div className={twMerge("text-white cursor-pointer", className)} onClick={onClick}>
      {label}
    </div>
  );
};

export default NavbarItem;
