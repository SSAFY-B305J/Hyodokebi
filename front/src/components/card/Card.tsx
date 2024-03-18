import CloseIcon from "@mui/icons-material/Close";

export default function Card() {
  return (
    <div className= "flex flex-col justify-between w-full p-2 m-2 border-2 border-gray-300 shadow-md h-[60vh] rounded-xl ">
      {/* ALERT width와 height는 확인용으로 넣은 것으로 추후 수정. */}
      <div className="flex justify-end">
        <CloseIcon onClick={()=> console.log("닫기")} />
      </div>
      <div className="flex justify-center w-full">
        <img src="https://picsum.photos/48/48" alt="empty" className="w-3/4" />
      </div>
      <div className="flex flex-col justify-center">
        <div className="flex justify-center m-3 text-2xl font-semibold">제목</div>
        <div className="flex justify-center m-3 font-medium text-gray-500">부제목</div>
      </div>
    </div>
  );
}
