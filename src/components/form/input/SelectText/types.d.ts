export type OptionValue = string | number;

export type Option<T extends OptionValue> = {
  value: T;
  label: string;
};

export type Props<T extends OptionValue> = {
  options: Array<Option<T>>;
  value: T;
  name: string;
  label?: string;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  onChange: (value: T) => void;
};
