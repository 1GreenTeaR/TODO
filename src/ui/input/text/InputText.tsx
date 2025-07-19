import { ChangeEvent } from "react";
import "./InputText.css";

type Props = {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  title: string;
};

export function InputText({ value, onChange, placeholder, title }: Props) {
  const strValue = value !== undefined ? String(value) : "";

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e.target.value);
  };

  return (
    <div className="input-container">
      <div className="input-title">{title}</div>
      <input
        // size={1}
        className="input-field"
        type="text"
        value={strValue}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </div>
  );
}
