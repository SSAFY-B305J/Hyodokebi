import kakao from "../../assets/kakao.png";

export default function KakaoButton(props: { text: string }) {
  return (
    <button className="flex justify-center items-center bg-[#FEE500] hover:bg-[#E4D01C] px-7 py-2 font-bold rounded-md">
      <img src={kakao} alt="" className="pr-2.5" />
      <span>{props.text}</span>
    </button>
  );
}
