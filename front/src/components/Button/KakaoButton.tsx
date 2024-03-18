import kakao from "../../assets/kakao.png";

interface ButtonProps {
  text: string;
  size?: string;
}

interface ButtonStyleType {
  [key: string]: string;
}

export default function KakaoButton({ text, size = "md" }: ButtonProps) {
  const buttonSizes: ButtonStyleType = {
    md: "px-5 py-2",
    lg: "px-8 py-3",
  };

  return (
    <button
      className={`flex justify-center items-center ${buttonSizes[size]} bg-[#FEE500] hover:bg-[#E4D01C] font-bold rounded-md`}
    >
      <img src={kakao} alt="" className="pr-2.5" />
      <span>{text}</span>
    </button>
  );
}
