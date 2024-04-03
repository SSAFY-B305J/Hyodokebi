interface VipProps {
  id: string;
  name: string;
  imagePath: string;
  imageIndex: string;
  clicked: boolean;
}

export default function ChoiceVip(props: VipProps) {
  const disabled =
    "border-gray-300 flex flex-col justify-around w-[25vw]] p-2 m-2 border-2  shadow-md h-[30vh] rounded-xl overflow-hidden";
  const activated =
    "border-primary flex flex-col justify-around w-[25vw]] p-2 m-2 border-2  shadow-md h-[30vh] rounded-xl overflow-hidden";
  return (
    <div className={props.clicked ? activated : disabled}>
      <div className="flex justify-center w-full ">
        <img
          src={require(`../../assets/profiles/profile${props.imageIndex}.jpg`)}
          alt="empty"
          className="w-[156px] h-[156px] m-2"
        />
      </div>
      <div className="flex justify-center text-2xl font-semibold grow ">
        {props.name}
      </div>
    </div>
  );
}
