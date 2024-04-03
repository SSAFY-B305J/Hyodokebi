type CategoryMap = {
  [key: number]: string;
};
export default function MenuCard(props: {
  menu_id: number;
  menu_name: string;
  cate_image: number;
  className?: string;
}) {
  const categoryMap: CategoryMap = {
    1: "한식",
    2: "양식",
    3: "일식",
    4: "중식",
    5: "동남아시아",
    6: "이탈리아",
    7: "퓨전",
  };
  const category = categoryMap[props.cate_image] || "Unknown";
  const url = "/menu_test/" + String(props.cate_image) + ".png";
  return (
    <div
      className={`flex flex-col justify-between w-full h-full p-3 border-2 border-gray-300 shadow-md rounded-xl ${props.className}`}
    >
      <div className="flex justify-center w-full">
        <img
          src={url}
          alt={props.menu_name}
          className="flex justify-center w-[50%]"
        />
      </div>
      <div className="flex flex-col justify-center">
        <div className="flex justify-center m-1 text-xl font-semibold">
          {props.menu_name}
        </div>
        {/* <div className="flex justify-center mb-2 font-medium text-gray-500">
          {category}
        </div> */}
      </div>
    </div>
  );
}
