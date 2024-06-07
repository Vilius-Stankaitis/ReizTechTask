export type CountryType = {
  name: string;
  region: string;
  area: number;
  independent?: boolean;
};

export type FilterType = {
  id: number;
  type: "checkbox" | "radio" | "switch";
  label: string;
  sortBy: string;
};
