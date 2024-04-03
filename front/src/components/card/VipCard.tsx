import { NavLink } from "react-router-dom";

interface VipProps {
  vipAgeGroups: null;
  vipBirth: number;
  vipId: number;
  vipNickname: string;
  vipProfile: number;
}

export default function VipCard({ VipProps }: { VipProps: VipProps }) {
  return (
    <NavLink to={`${VipProps.vipId}`}>
      <div className="box-border relative flex flex-col justify-center w-56 p-2 m-2 border-gray-300 shadow-md h-80 rounded-xl border-w">
        <div className="flex items-center justify-center">
          <div className="flex items-center justify-center">
            <img
              src={require(`../../assets/profiles/profile${VipProps.vipProfile}.jpg`)}
              alt="empty"
              className="w-52"
            />
          </div>
        </div>
        <div className="flex items-center justify-center text-2xl font-semibold">
          {VipProps.vipNickname}
        </div>
      </div>
    </NavLink>
  );
}
