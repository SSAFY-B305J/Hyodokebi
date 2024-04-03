import { NavLink } from "react-router-dom";
type CategoryMap = {
  [key: number]: string;
};
export default function FoodResultCard(props: {
  menu_id: number;
  menu_name: string;
  cate_image: number;
}) {
  const url = "/menu_test/" + String(props.cate_image) + ".png";
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
  return (
    // <NavLink // to={`/`} hover:border-primary
    <div className="flex flex-col justify-center w-[18vw] p-2 m-2 border-2 border-gray-300 shadow-md h-[45vh] rounded-2xl ">
      <div className="flex justify-center w-full">
        <img src={url} alt={props.menu_name} className="w-[50%]" />
      </div>
      <div className="flex flex-col justify-center">
        <div className="flex justify-center m-3 text-2xl font-semibold">
          {props.menu_name}
        </div>
        {/* <div className="flex justify-center m-3 font-medium text-gray-500">
          {category}
        </div> */}
      </div>
      {/* </NavLink> */}
    </div>
  );
}
