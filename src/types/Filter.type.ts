import { SetState } from "./global.type";
export type FilteredCategoryType = {
  isFilterOpen: boolean;
  setIsFilterOpen: SetState<boolean>;
  filtersEntity: any;
  setMinPrice: SetState<number>;
  setMaxPrice: SetState<number>;
};
export type BasedPriceType = Pick<
  FilteredCategoryType,
  "filtersEntity" | "setMinPrice" | "setMaxPrice"
> & { applyFilters: () => void };
export type BasedRateStartType = {
  navigate?:any
newParams?:URLSearchParams

};
