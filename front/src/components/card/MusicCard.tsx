export default function MusicCard(props: {
  image: string;
  title: string;
  subTitle: string;
}) {
  return (
    <div className="flex flex-col items-center w-56 h-64 px-3 py-3 m-3 bg-white border border-gray-300 shadow-md rounded-xl hover:shadow-lg">
      <img
        src={props.image}
        alt={props.title}
        className="object-cover rounded-full w-28 h-28"
      />
      <div className="flex flex-col justify-center h-full text-center">
        <h3 className="text-lg font-bold">{props.title}</h3>
        <div>{props.subTitle}</div>
      </div>
    </div>
  );
}
