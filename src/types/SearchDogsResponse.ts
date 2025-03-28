export type SearchDogsResponse = {
  resultIds: string[]; // array of dog IDs
  total: number; // Total number of dogs (all pages)
  next?: string | null; // query to get next page
  prev?: string | null; // query to get previous page
};
