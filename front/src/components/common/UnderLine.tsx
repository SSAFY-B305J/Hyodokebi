interface InputProps {
  text?: string;
  className?: string;
  size?: string;
}
interface UnderLineStyleType {
  [key: string]: string;
}

export default function UnderLine({
  text,
  className,
  size = "md",
}: InputProps) {
  // 형태에 따른 css 설정 객체
  const buttonColors: UnderLineStyleType = {
    filled: "bg-primary hover:bg-primary-hover disabled:bg-disabled text-white",
    outlined:
      "text-primary bg-white border border-primary hover:bg-secondary hover:text-white disabled:border-disabled disabled:text-disabled",
    text: "text-black bg-white hover:bg-[#ededed] disabled:text-disabled",
  };

  // 크기에 따른 css 설정 객체
  const buttonSizes: UnderLineStyleType = {
    sm: "px-3 py-1.5",
    md: "px-5 py-2",
  };

  return (
    <div className={`min-w-fit border-current `}>
      <span className="flex pl-8 text-xl font-medium">{text}</span>
      <div
        className={`border-current bg-primary ${buttonSizes[size]} ${className} mt-1`}
      ></div>
    </div>
  );
}
