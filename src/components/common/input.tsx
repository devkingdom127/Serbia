import React from "react";

interface InputProps {
  placeholder: string;
  value: string;
  className?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  className,
  onChange
}) => {
  return (
    <input
      className={[
        "bg-transparent outline-none h-10 w-1/2 px-4 text-sm md:text-base w-100",
        className
      ].join(" ")}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
