type ButtonAttribute = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

interface ButtonProps {
  text: string;
  variant?: string;
  className?: string;
}

interface ButtonStyleType {
  [key: string]: string;
}

export default function ButtonAsset({
  text,
  variant = "filled",
  className,
  ...buttonAttribute
}: ButtonProps & ButtonAttribute) {
  // 형태에 따른 버튼 css 설정 객체
  const buttonColors: ButtonStyleType = {
    filled: "bg-primary hover:bg-primary-hover disabled:bg-disabled text-white",
    outlined:
      "text-primary bg-white border border-primary hover:bg-primary hover:text-white disabled:border-disabled disabled:text-disabled",
    text: "text-black bg-white hover:bg-[#ededed] disabled:text-disabled",
  };

  return (
    <button
      {...buttonAttribute}
      className={`min-w-fit px-5 py-2 rounded-md ${buttonColors[variant]} ${className}`}
    >
      <span className="flex items-center justify-center">{text}</span>
    </button>
  );
}
