interface MenuProps {
  menu_id: number;
  menu_name: string;
  cate_image: number;
}

export default function MenuCard(props: {
  menu_id: number;
  menu_name: string;
  cate_image: number;
}) {
  return (
    <div className="flex flex-col justify-between w-full h-full p-3 border-2 border-gray-300 shadow-md rounded-xl ">
      <div className="flex justify-center w-full">
        <img
          src="/menu_test/korean.png"
          alt="empty"
          className="flex justify-center w-[65%]"
        />
        {/* TODO 이미지 링크, 메뉴명, 분류 넣기 */}
      </div>
      <div className="flex flex-col justify-center">
        <div className="flex justify-center m-1 text-xl font-semibold">
          {props.menu_name}
        </div>
        <div className="flex justify-center mb-2 font-medium text-gray-500">
          {props.menu_id}
        </div>
      </div>
    </div>
  );
}
