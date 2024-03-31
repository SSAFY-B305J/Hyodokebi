import { useState, useEffect } from "react";

import VipCard from "../../../components/card/VipCard";
import VipAddCard from "../../../components/card/VipAddCard";

import { selectVipList } from "../../../apis/api/vip";

interface VipLists {
  vipAgeGroups: null;
  vipBirth: number;
  vipId: number;
  vipNickname: string;
  vipProfile : number;
  
}



export default function VipList() {
  const [VipListData, setVipListData] = useState<VipLists[]>([]);

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

  return (
    <div className="box-border flex w-full h-[67vh] p-3 overflow-auto">
      <div className="grid w-full h-full grid-cols-3 gap-3">
        {VipListData?.map((VipLists : VipLists) => <VipCard key={VipLists.vipId} VipProps={VipLists} />) }
        
        <VipAddCard />
      </div>
    </div>
  );
}
