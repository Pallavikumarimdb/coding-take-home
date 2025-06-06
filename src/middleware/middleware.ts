import data from '../mock-data/MOCK_DATA.json';
import type { Person, SearchField, CountryGroup } from '../types';

export const getAllListings = (): Promise<Person[]> => {
  return Promise.resolve(data as Person[]);
};

export const getListingsByFieldValue = (field: SearchField, value: string): Promise<Person[]> => {
  const mockData = data as Person[];
  const results = mockData.filter((person) => {
    const fieldValue = person[field];
    return fieldValue?.toLowerCase().includes(value.toLowerCase());
  });
  return Promise.resolve(results);
};

export const getListingsByCountry = (): Promise<CountryGroup[]> => {
  const mockData = data as Person[];
  const countries = [...new Set(
    mockData
      .map((person) => person.country)
      .filter((country): country is string => country !== null && country !== undefined)
  )];

  const groupedData: CountryGroup[] = countries.map((country) => {
    const people = mockData.filter((person) => person.country === country);
    return {
      country,
      count: people.length,
      people,
    };
  });

  groupedData.sort((a, b) => a.country.localeCompare(b.country));

  return Promise.resolve(groupedData);
};

export const getListingsWithMissingData = (): Promise<{
  missingColor: Person[];
  missingLanguage: Person[];
  missingCountry: Person[];
}> => {
  const mockData = data as Person[];

  const missingColor = mockData.filter((person) => person.color === null);
  const missingLanguage = mockData.filter((person) => person.language === null);
  const missingCountry = mockData.filter((person) => person.country === null);

  return Promise.resolve({
    missingColor,
    missingLanguage,
    missingCountry,
  });
};

export const getUniqueValuesForField = (field: SearchField): string[] => {
  const mockData = data as Person[];
  const values = mockData
    .map((person) => person[field])
    .filter((value): value is string => value !== null);

  return [...new Set(values)].sort();
};
