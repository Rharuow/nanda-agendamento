export type OptionValue = string | number | object;

export type Option<T extends OptionValue> = {
  value: T;
  label: string;
};

export type Props<T extends OptionValue> = {
  options: Array<Option<T>>;
  name: string;
  required?: boolean;
  autoComplete?: string;
  emptyLabel?: string;
  amount?: number;
  label?: string;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  onChange?: (value: T) => void;
  onFocus?: (value: T) => void;
  onBlur?: (value: T) => void;
};
