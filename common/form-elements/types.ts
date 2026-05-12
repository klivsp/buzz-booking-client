export type OptionsType = { label: string; value: string };

export type FormFieldType =
  | "inputText"
  | "inputEmail"
  | "inputPassword"
  | "checkbox";

export type FormFieldItems<K extends string = string> = {
  name: K;
  type: FormFieldType;
  label?: string;
  placeholder?: string;
  /** Tailwind column span class, e.g. `col-span-6` */
  gridcolumnclass?: string;
  checkBoxLabel?: string;
  checkBoxId?: string;
  defaultChecked?: boolean;
  options?: OptionsType[];
};
