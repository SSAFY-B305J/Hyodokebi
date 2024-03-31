import { Link } from "react-router-dom";
import VipTestData from "../../../json/VipTestData.json";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";

export default function ProfileDetail() {
  // TODO: 회원 정보 조회 API 완성되면 적용하기

  return (
    <div className="w-[600px]">
      <div className="flex w-full p-4 my-10 border rounded-md ">
        <img
          src={VipTestData[0].imagePath}
          alt="프로필 이미지"
          className="w-[192px] h-[192px]"
        />
        <div className="flex flex-col justify-center max-w-[250px] ml-12">
          <div className="mb-5">
            <Link to="edit" className="flex items-center group">
              <p className="text-3xl font-semibold ">{VipTestData[0].name}</p>
              <ArrowForwardIos
                sx={{ fontSize: "18px" }}
                color="disabled"
                className="ml-5 group-hover:text-primary"
              />
            </Link>
          </div>
          <p className="flex w-full mb-2">
            <div className="w-20 font-semibold">나이대</div>
            <div>{VipTestData[0].ageRange}</div>
          </p>
          <p className="flex w-full mb-2">
            <div className="w-20 font-semibold">지역</div>
            <div>{VipTestData[0].city}</div>
          </p>
        </div>
      </div>
    </div>
  );
}
