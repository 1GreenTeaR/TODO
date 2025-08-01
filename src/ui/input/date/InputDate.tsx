import { ChangeEvent } from "react";
import "./InputDate.css";

type Props = {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  title: string;
};

export function InputDate({ value, onChange, placeholder, title }: Props) {
  const dateValue = value !== undefined ? String(value) : "";

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e.target.value);
  };

  return (
    <div className="input-container">
      <div className="input-title">{title}</div>
      <input
        // size={1}
        className="input-field"
        type="date"
        value={dateValue}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </div>
  );
}
