export default function FormContainer(props: { children: JSX.Element }) {
  return (
    <div className="box-border relative flex flex-col align-middle w-[500px] px-[80px] py-[42px] rounded-2xl shadow-md">
      {props.children}
    </div>
  );
}
