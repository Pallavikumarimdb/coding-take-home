export interface Person {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  country: string;
  language: string | null;
  color: string | null;
}

export type SearchField = 'color' | 'language';

export interface CountryGroup {
  country: string;
  count: number;
  people: Person[];
}
