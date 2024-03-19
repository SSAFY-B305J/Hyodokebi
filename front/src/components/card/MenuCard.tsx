import CloseIcon from "@mui/icons-material/Close";

export default function MenuCard() {
  return (
    <div className= "flex flex-col justify-between w-full h-full p-3 border-2 border-gray-300 shadow-md rounded-xl ">
      <div className="flex justify-center w-full">
        <img src="https://picsum.photos/128/128" alt="empty" className="flex justify-center w-[65%]" />
        {/* TODO 이미지 링크, 메뉴명, 분류 넣기 */}
      </div>
      <div className="flex flex-col justify-center">
        <div className="flex justify-center m-1 text-xl font-semibold">메뉴명</div>
        <div className="flex justify-center mb-2 font-medium text-gray-500">분류</div>
      </div>
    </div>
  );
}