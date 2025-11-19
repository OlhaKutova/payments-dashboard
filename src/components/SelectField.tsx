import { Select } from "./components";

interface ReusableSelectProps {
  ariaLabel: string;
  value: string;
  placeholder?: string;
  options: string[];
  onChange: (value: string) => void;
}

export const SelectField = ({
  ariaLabel,
  value,
  placeholder = "",
  options,
  onChange,
}: ReusableSelectProps) => {
  return (
    <Select
      aria-label={ariaLabel}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {placeholder && <option value="">{placeholder}</option>}

      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </Select>
  );
};
