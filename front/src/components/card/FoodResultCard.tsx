import { NavLink } from "react-router-dom";

export default function FoodResultCard(props: {
  menu_id: number;
  menu_name: string;
  cate_image: number;
}) {
  return (
    // <NavLink // to={`/`}
    <div className="flex flex-col justify-between w-[18vw] p-2 m-2 border-2 border-gray-300 shadow-md h-[45vh] rounded-2xl hover:border-primary">
      <div className="flex justify-center w-full grow">
        <img
          src="/menu_test/korean.png"
          alt={props.menu_name}
          className="w-3/4"
        />
      </div>
      <div className="flex flex-col justify-center">
        <div className="flex justify-center m-3 text-2xl font-semibold">
          {props.menu_name}
        </div>
        <div className="flex justify-center m-3 font-medium text-gray-500">
          {/* {props.category} */}
          한식
        </div>
      </div>
      {/* </NavLink> */}
    </div>
  );
}
