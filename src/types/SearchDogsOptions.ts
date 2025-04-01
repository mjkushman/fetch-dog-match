import { SortField, SortOrder } from "./Sort";

export interface SearchDogsOptions {
  breeds?: string[];
  zipCodes?: number[];
  ageMin?: number;
  ageMax?: number;
  size?: number; // number of results to return. defaults to 25 if not specified.
  from?: number; // which page to start at if paginated
  sortOrder: SortOrder;
  sortField: SortField;
  query?: string; // url
}
