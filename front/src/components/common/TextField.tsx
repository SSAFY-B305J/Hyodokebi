import InputAsset from "./InputAsset";
import { InputAttribute } from "../../modules/attributeType";

interface TextFieldProps {
  label?: string;
  placeholder?: string;
  labelVisible?: boolean;
  error?: Error;
}

export default function TextField({
  label,
  placeholder,
  labelVisible = true,
  error,
  ...inputAttribute
}: TextFieldProps & InputAttribute) {
  return (
    <div className="relative w-full">
      {/* Lable */}
      {labelVisible && (
        <label className="inline-block pb-1 font-bold">{label}</label>
      )}
      {/* Input & Button */}
      <InputAsset {...inputAttribute} placeholder={placeholder} />
      {/* Error Message */}
      {error?.message && <p className="w-full pt-1 text-xs">{error.message}</p>}
    </div>
  );
}
