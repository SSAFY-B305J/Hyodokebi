import React from "react";

interface InputProps {
  id: string;
  label: string;
  labelVisible?: boolean;
  placeholder?: string;
  value? : string;
  message?: string;
  status?: number;
  inputHandler?: ((e : React.ChangeEvent<HTMLInputElement>) => void);
}

interface borderColorsType {
  [key: number]: {
    type: string;
    color: {
      default: string;
      focus?: string;
    };
    border: string;
  };
}

export default function Input({
  id,
  label,
  labelVisible = true,
  placeholder = "",
  value ="",
  message = "",
  status = 0,
  inputHandler,
}: InputProps) {
  // 상태에 따른 테두리 색 설정 객체
  const borderColors: borderColorsType = {
    0: {
      type: "default",
      color: {
        default: "sliver",
        focus: "secondary",
      },
      border: "border-sliver focus:border-secondary",
    },
    1: {
      type: "valid",
      color: {
        default: "green-500",
      },
      border: "border-green-500",
    },
    2: {
      type: "error",
      color: {
        default: "red-500",
      },
      border: "border-red-500",
    },
  };

  return (
    <div className="flex flex-col">
      {labelVisible ? (
        <label htmlFor={id} className="font-bold">
          {label}
        </label>
      ) : null}
      <input
        type="text"
        id={id}
        className={`w-full px-3 py-3 text-sm border ${borderColors[status].border} focus:outline-none rounded-md`}
        placeholder={placeholder}
        onChange={inputHandler}
        value={value}
      />
      {status > 0 && message.length > 0 ? (
        <span
          className={`text-xs font-bold text-${borderColors[status].color.default}`}
        >
          {message}
        </span>
      ) : null}
    </div>
  );
}
