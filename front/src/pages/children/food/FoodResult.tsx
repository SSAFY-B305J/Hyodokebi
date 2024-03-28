import { Link } from "react-router-dom";
import ButtonAsset from "../../../components/Button/ButtonAsset";
import FoodResultCard from "../../../components/card/FoodResultCard";
import FoodTap from "../../../components/food/FoodTap";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function FoodResult() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData(); // fetchData 함수 호출
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get("API 주소");
      setData(response.data); // 받아온 데이터를 상태에 저장
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleClick = () => {
    console.log("클릭");
    <Link to=""></Link>; //처음으로 가기
  };
  const retry = () => {
    console.log("다시 추천하기");
  };

  return (
    <div className="flex flex-col mt-5 ">
      <div className="flex justify-center text-3xl font-bold mb-7">
        효도깨비가 추천하는 식사메뉴
      </div>
      <div className="flex justify-center mb-5">
        <FoodTap index={3} />
      </div>
      <div className="flex justify-center mb-5 text-xl font-semibold ">
        메뉴를 누르시면 주변의 음식점의 위치를 알려드립니다
      </div>

      <div className="flex justify-around mb-4 ">
        <FoodResultCard
          food="짜장면"
          category="중식"
          src="https://placehold.co/400"
        />
        <FoodResultCard
          food="칼국수"
          category="한식"
        />
        <FoodResultCard
          food="돌솥비빔밥"
          category="한식"
        />
      </div>
      <div className="flex mt-3 mb-4 h-14">
        <div className="flex justify-center w-1/4 grow ">
          <ButtonAsset
            text="다시 추천하기"
            variant="outlined"
            className="w-1/2 font-semibold border-2 rounded-3xl hover:border-secondary"
            onClick={retry}
          />
        </div>
        <div className="flex justify-center w-1/4 grow">
          <ButtonAsset
            text="처음으로"
            variant="outlined"
            className="w-1/2 font-semibold border-2 rounded-3xl hover:border-secondary"
            onClick={handleClick}
          />
        </div>
      </div>
    </div>
  );
}
