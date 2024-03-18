import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export default function AddCard() {
  return (
    <div className="box-border flex flex-col w-[19vw] p-3 m-2 border-2 border-gray-300 shadow-md h-[54vh] rounded-xl">
      {/* ALERT width와 height는 확인용으로 넣은 것으로 추후 수정. */}
      <div className="flex items-center justify-center w-full h-2/3">
        <div className="flex items-center justify-center w-2/3 rounded-xl h-4/5 bg-silver">
          <AddCircleOutlineIcon />
        </div>
      </div>
      <div className="flex flex-col items-center justify-end w-full h-1/3">
        <button className="flex justify-center w-2/3 mb-3 border-2">버튼</button>
      </div>
    </div>
  );
}
