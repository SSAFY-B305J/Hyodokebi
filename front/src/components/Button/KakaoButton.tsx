import kakao from "../../assets/kakao.png";
import { ButtonAttribute } from "../../modules/types/HTMLAttributeTypes";

interface ButtonProps {
  text: string;
  size?: string;
}

interface ButtonStyleType {
  [key: string]: string;
}

export default function KakaoButton({
  text,
  size = "md",
  ...buttonAttribute
}: ButtonProps & ButtonAttribute) {
  const buttonSizes: ButtonStyleType = {
    md: "px-5 py-2",
    lg: "px-8 py-3",
  };

  return (
    <button
      {...buttonAttribute}
      className={`flex justify-center items-center w-full ${buttonSizes[size]} bg-[#FEE500] hover:bg-[#E4D01C] font-bold rounded-md`}
    >
      <img src={kakao} alt="" className="pr-2.5" />
      <span>{text}</span>
    </button>
  );
}
