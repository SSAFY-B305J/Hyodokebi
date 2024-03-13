interface InputProps {
  id: string;
  label: string;
  labelVisible?: boolean;
  placeholder?: string;
  message?: string;
}

export default function Input({
  id,
  label,
  labelVisible = true,
  placeholder = "",
  message = "",
}: InputProps) {
  return (
    <div className="flex flex-col">
      {labelVisible ? (
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
      <span className="text-xs font-bold text-primary">{message}</span>
    </div>
  );
}
