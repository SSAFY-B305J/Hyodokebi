interface InputProps {
  id: string;
  label: string;
  labelVisisble?: boolean;
  placeholder?: string;
}

export default function Input({
  id,
  label,
  labelVisisble = true,
  placeholder,
}: InputProps) {
  return (
    <div className="flex flex-col">
      {labelVisisble ? (
        <label htmlFor={id} className="font-bold">
          {label}
        </label>
      ) : null}
      <input
        type="text"
        id={id}
        className="w-full px-3 py-2 text-sm border rounded-md border-primary focus:outline-none"
        placeholder={placeholder}
      />
    </div>
  );
}
