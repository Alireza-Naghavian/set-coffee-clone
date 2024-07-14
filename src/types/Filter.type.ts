import { SetState } from "./global.type";
export type FilteredCategoryType = {
  isFilterOpen: boolean;
  setIsFilterOpen: SetState<boolean>;
  onApplyFilters: (filters: any) => void;
  filtersEntity: any;
  setMinPrice: SetState<number>;
  setMaxPrice: SetState<number>;
  setStars: SetState<number>;
};
export type BasedPriceType = Pick<
  FilteredCategoryType,
  "filtersEntity" | "setMinPrice" | "setMaxPrice"
> & { applyFilters: () => void };
export type BasedRateStartType = {
  setStars: SetState<number>;
};
