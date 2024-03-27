import { Link } from "react-router-dom";

interface CardProps {
  food: string;
  category: string;
  src?: string;
}
export default function FoodResultCard(props: CardProps) {
  const handleClick = () => {
    console.log(props.food + "가 클릭되었습니다!");
    <Link to="/" />; //클릭시 [지역+음식] 카카오 검색&페이지 넘기기
  };
  return (
    <div
      onClick={handleClick}
      className="flex flex-col justify-between w-[18vw] p-2 m-2 border-2 border-gray-300 shadow-md h-[45vh] rounded-2xl hover:border-primary"
    >
      <div className="flex justify-center w-full grow">
        <img
          src={props.src}
          alt={props.food}
          className="w-3/4"
        />
      </div>
      <div className="flex flex-col justify-center">
        <div className="flex justify-center m-3 text-2xl font-semibold">
          {props.food}
        </div>
        <div className="flex justify-center m-3 font-medium text-gray-500">
          {props.category}
        </div>
      </div>
    </div>
  );
}
