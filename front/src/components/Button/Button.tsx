import { MouseEvent } from "react";

interface ButtonProps {
  text: string;
  variant?: string;
  size?: string;
  disabled?: boolean;
  onClick?: (event: MouseEvent) => void;
}

interface ButtonStyleType {
  [key: string]: string;
}

export default function Button({
  text,
  variant = "filled",
  size = "md",
  disabled = false,
  onClick,
}: ButtonProps) {
  // 형태에 따른 버튼 css 설정 객체
  const buttonColors: ButtonStyleType = {
    filled: "bg-primary hover:bg-primary-hover disabled:bg-disabled text-white",
    outlined:
      "text-primary bg-white border border-primary hover:border-primary-hover hover:text-primary-hover disabled:border-disabled disabled:text-disabled",
    text: "text-black bg-white hover:bg-[#ededed] disabled:text-disabled",
  };

  // 크기에 따른 버튼 css 설정 객체
  const buttonSizes: ButtonStyleType = {
    md: "px-5 py-2",
    lg: "px-8 py-3",
  };

  return (
    <button
      className={`${buttonSizes[size]} ${buttonColors[variant]} rounded-md font-bold`}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
