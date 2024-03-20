export default function FoodTap() {
  return (
    <div className="w-[70vw] h-[5vh] border flex flex-row border-current">
      <p className="flex items-center justify-center flex-grow h-full m-0 font-semibold border-r border-current bg-primary">
        기본 정보
      </p>
      <p className="flex items-center justify-center flex-grow h-full m-0 font-semibold bg-white border-r border-current">
        기호 선택
      </p>
      <p className="flex items-center justify-center flex-grow h-full m-0 font-semibold bg-white ">
        음식 추천
      </p>
    </div>
  );
}
