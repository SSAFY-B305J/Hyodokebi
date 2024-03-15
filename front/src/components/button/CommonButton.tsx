import { MouseEvent } from "react";

interface ButtonProps {
  text: string;
  variant?: string;
  clickHandler?: (event: MouseEvent) => void;
}

interface ButtonColorType {
  [key: string]: string;
}

export default function CommonButton({
  text,
  variant = "filled",
  clickHandler,
}: ButtonProps) {
  // 형태에 따른 버튼 css 설정 객체
  const buttonColors: ButtonColorType = {
    filled: "bg-primary hover:bg-primary-hover text-white",
    outlined:
      "bg-white border border-primary hover:border-secondary text-primary hover:text-secondary",
    text: "text-black bg-white hover:bg-gray-200",
  };

  return (
    <button
      className={`px-5 py-2 rounded-md ${buttonColors[variant]}`}
      onClick={clickHandler}
    >
      {text}
    </button>
  );
}
