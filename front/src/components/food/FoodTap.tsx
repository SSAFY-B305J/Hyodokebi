interface FoodStep {
  index: number;
}

export default function FoodTap({ index }: FoodStep) {
  const color =
    "flex items-center justify-center flex-grow h-full m-0 font-semibold border-r border-current bg-primary";

  const white =
    "flex items-center justify-center flex-grow h-full m-0 font-semibold border-r border-current bg-white";

  return (
    <div className="w-[70vw] h-[5vh] border flex flex-row border-current overflow-hidden">
      <p className={index === 1 ? color : white}>기본 정보</p>
      <p className={index === 2 ? color : white}>기호 선택</p>
      <p className={`${index === 3 ? color : white} border-r-0`}>음식 추천</p>
    </div>
  );
}
