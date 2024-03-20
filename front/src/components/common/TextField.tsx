import Button from "../Button/Button";
import InputAsset from "./InputAsset";

interface TextFieldProps {
  label?: string;
  placeholder?: string;
  labelVisible?: boolean;
  buttonText?: string;
  buttonVisible?: boolean;
  error?: Error;
}

export default function TextField({
  label,
  placeholder,
  labelVisible = true,
  buttonText = "",
  buttonVisible = false,
  error,
}: TextFieldProps) {
  return (
    <div className="relative">
      {/* Lable */}
      {labelVisible && (
        <label className="inline-block pb-1 font-bold">{label}</label>
      )}
      {/* Input & Button */}
      <div className="flex w-full">
        <InputAsset placeholder={placeholder} />
        {buttonVisible && <Button text={buttonText} className="ml-2" />}
      </div>
      {/* Error Message */}
      {error && <p className="inline-block text-xs">{error.message}</p>}
    </div>
  );
}
