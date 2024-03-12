export default function Card() {
  return (
    <div className="w-[20vw] h-[50vh] border-2 border-gray-300 rounded-xl flex justify-around p-3 shadow-md flex-col ">
      {/* ALERT width와 height는 확인용으로 넣은 것으로 추후 수정. */}
      <div className="flex justify-center">
        <img src="#" alt="empty" />
      </div>
      <div className="flex flex-col justify-center">
        <div className="flex justify-center m-3 text-2xl font-semibold">제목</div>
        <div className="flex justify-center m-3 font-medium text-gray-500">부제목</div>
      </div>
    </div>
  );
}
