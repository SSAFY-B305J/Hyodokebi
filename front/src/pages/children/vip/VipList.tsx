import { useState, useEffect } from "react";

import VipCard from "../../../components/card/VipCard";
import VipAddCard from "../../../components/card/VipAddCard";

import { selectVipList } from "../../../apis/api/vip";

interface VipList {
  vipAgeGroups: null;
  vipBirth: number;
  vipId: number;
  vipNickname: string;
  vipProfile : string;
  
}



export default function VipList() {
  const [VipListData, setVipListData] = useState<VipList[]>([]);

  useEffect(() => {
    async function fetchVipList() {
      try {
        const data = await selectVipList();
        setVipListData(data);
      } catch (error) {
        console.error('Error fetching VIP list:', error);
      }
    }

    fetchVipList();
  }, []);

  console.log(VipListData);
  
  return (
    <div className="box-border flex w-full h-[67vh] p-3 overflow-auto">
      <div className="grid w-full h-full grid-cols-3 gap-3">
        {VipListData?.map((VipList : VipList) => <VipCard key={VipList.vipId} VipProps={VipList} />) }
        
        <VipAddCard />
      </div>
    </div>
  );
}
