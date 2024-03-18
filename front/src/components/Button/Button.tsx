import { MouseEvent } from "react";

interface ButtonProps {
  text: string;
  variant?: string;
  disabled?: boolean;
  onClick?: (event: MouseEvent) => void;
}

interface ButtonColorType {
  [key: string]: string;
}

export default function Button({
  text,
  variant = "filled",
  disabled = false,
  onClick,
}: ButtonProps) {
  // 형태에 따른 버튼 css 설정 객체
  const buttonColors: ButtonColorType = {
    filled: "bg-primary hover:bg-primary-hover disabled:bg-disabled text-white",
    outlined:
      "text-primary bg-white border border-primary hover:border-primary-hover hover:text-primary-hover disabled:border-disabled disabled:text-disabled",
    text: "text-black bg-white hover:bg-[#ededed] disabled:text-disabled",
  };

  return (
    <button
      className={`px-5 py-2 rounded-md font-bold ${buttonColors[variant]}`}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
