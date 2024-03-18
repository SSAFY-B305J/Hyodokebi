import kakao from "../../assets/kakao.png";

export default function KakaoButton(props: { text: string }) {
  return (
    <button className="flex items-center bg-[#FEE500] px-7 py-2 font-bold rounded-md">
      <img src={kakao} alt="" className="pr-2.5" />
      <span>{props.text}</span>
    </button>
  );
}
