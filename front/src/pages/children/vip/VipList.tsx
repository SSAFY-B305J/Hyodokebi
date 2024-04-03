import { useState, useEffect } from "react";

import VipCard from "../../../components/card/VipCard";
import VipAddCard from "../../../components/card/VipAddCard";

import { getVipList } from "../../../apis/api/vip";
import { useParams } from "react-router-dom";

interface VipLists {
  vipAgeGroups: null;
  vipBirth: number;
  vipId: number;
  vipNickname: string;
  vipProfile: number;
}

export default function VipList() {
  const MAX_VIP_LENGTH = 8;

  const [VipListData, setVipListData] = useState<VipLists[]>([]);
  const { id } = useParams();

  const memberIndex = id ? parseInt(id) : NaN;
  useEffect(() => {
    async function fetchVipList(memberIndex: number) {
      try {
        const data = await getVipList();
        setVipListData(data);
      } catch (error) {
        alert("더 이상 VIP를 생성할 수 없습니다. ");
        console.error("Error fetching VIP list:", error);
      }
    }

    fetchVipList(memberIndex);
  }, []);

  return (
    <div className="box-border flex w-full h-[67vh] p-3 overflow-auto">
      <div className="grid w-full h-full grid-cols-3 gap-3">
        {VipListData?.map((VipLists: VipLists) => (
          <VipCard key={VipLists.vipId} VipProps={VipLists} />
        ))}
        {VipListData?.length !== MAX_VIP_LENGTH ? <VipAddCard /> : <></>}
      </div>
    </div>
  );
}
