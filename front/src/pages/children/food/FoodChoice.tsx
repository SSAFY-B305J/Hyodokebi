import UnderLine from "../../../components/common/UnderLine";
import FoodTap from "../../../components/food/FoodTap";
import ChoiceVip from "../../../components/card/ChoiceVip";
import Dropdowns from "../../../components/common/Dropdowns";
import { useEffect, useState } from "react";
import cityData from "../../../json/AadministrativeDistrict.json";
import ButtonAsset from "../../../components/Button/ButtonAsset";
import { Link, useParams } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Box from "@mui/material/Box";
import { getVipList } from "../../../apis/api/vip";
import { Vip } from "../../../modules/types/vip";
import useLoginStore from "../../../store/useLoginStore";

export default function FoodChoice() {
  const { loginMemberIdx } = useLoginStore();

  const [selectedSiDo, setSelectedSiDo] = useState<string>("");
  const [siGunGuOptions, setSiGunGuOptions] = useState<string[]>([]);
  const [sigungu, setSigungu] = useState<string>("");

  // const [vipList, setVipList] = useState<VipProps[]>(vipDataList);
  const [vipList, setVipList] = useState<Vip[]>([]);
  const [selectedVip, setSelectedVip] = useState<string>("");

  // 중복을 제거한 고유한 시/도 목록을 추출
  const uniqueSiDoList = Array.from(
    new Set(cityData.map((city) => city["si-do"]))
  );

  // 시/도를 선택했을 때 호출되는 함수
  const handleSiDoChange = (event: SelectChangeEvent) => {
    const selectedSiDoValue = event.target.value;
    setSelectedSiDo(selectedSiDoValue);

    // 선택된 시/도에 해당하는 시/군/구를 필터링하여 설정
    const filteredSiGunGuOptions = cityData
      .filter((city) => city["si-do"] === selectedSiDoValue)
      .map((city) => city["si-gun-gu"]);
    setSiGunGuOptions(filteredSiGunGuOptions);
  };

  const handleSigunguChange = (event: SelectChangeEvent) => {
    setSigungu(event.target.value);
  };

  // vipList의 값을 저장한다.
  async function initVipList() {
    const data = await getVipList();
    setVipList(data);
    if (data.length > 0) setSelectedVip(data[0].vipId);
  }

  const handleSelect = (vipId: string) => {
    setSelectedVip(vipId);
  };

  useEffect(() => {
    // VIP 목록 가져오기
    initVipList();
    //selectedVip 초기화
    //setVipList 초기화
  }, []);

  return (
    <div>
      <div className="flex justify-center text-3xl font-bold mb-7">
        효도깨비의 VIP를 알려주세요
      </div>

      <div className="flex justify-center mb-5">
        <FoodTap index={1} />
      </div>

      <div className="ml-20 mr-20">
        <div>
          <UnderLine text="지역을 골라주세요" size="sm" />
          <div className="flex flex-row m-5">
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-autowidth-label">
                  시/도
                </InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={selectedSiDo}
                  onChange={handleSiDoChange}
                >
                  {uniqueSiDoList.map((siDo, index) => (
                    <MenuItem key={index} value={siDo}>
                      {siDo}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-autowidth-label">
                  시/군/구
                </InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={siGunGuOptions[0]}
                  onChange={handleSigunguChange}
                >
                  {siGunGuOptions.map((gungu, index) => (
                    <MenuItem key={index} value={gungu}>
                      {gungu}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </div>
        </div>
        <div className="mt-5">
          <UnderLine text="VIP는 누구?" size="sm" />
          <div className="flex flex-row justify-center">
            {vipList.map((vip) => (
              <div onClick={() => handleSelect(vip.vipId)}>
                <ChoiceVip
                  key={vip.vipId}
                  id={vip.vipId}
                  name={vip.vipNickname}
                  imagePath={vip.vipProfile}
                  imageIndex={vip.vipProfile}
                  clicked={vip.vipId === selectedVip}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-3">
        {/* 지역을 안 골랐을 때 버튼이 안 보이게 함. */}
        {/* {selectedVip !== "" && sigungu !== "" && ( */}
        <Link to={`/food/add/${selectedVip}`} className="w-1/4 ">
          <ButtonAsset
            text="다음"
            variant="outlined"
            className="w-full font-semibold border-2 rounded-3xl hover:border-white "
          />
        </Link>
        {/* )} */}
      </div>
    </div>
  );
}
