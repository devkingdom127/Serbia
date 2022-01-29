import React from "react";

interface ButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className
}) => {
  return (
    <button
      className={[
        "focus:outline-none bg-gradient-to-l hover:from-brown1 hover:to-brown2 text-white duration-500 rounded-lg cursor-pointer flex items-center justify-center h-10 text-lg md:text-xl lg:text-base md:text-fill-white px-2 md:px-6 text-center w-full md:w-auto",
        className
      ].join(" ")}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
