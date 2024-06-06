export type TiAppButton = {
  type: "default" | "icon";
  icon: "close";
  disabled?: boolean;
  textCase: "upper" | "lower" | "default";
};

export type TiAppCheckbox = {
  checked: boolean;
  disabled: boolean;
};

export type TiAppInput = {
  title: string;
  disabled: boolean;
  placeholder: string;
  type: "text" | "date";
};

export type TiAppCard = {
  type: "default" | "error";
};
