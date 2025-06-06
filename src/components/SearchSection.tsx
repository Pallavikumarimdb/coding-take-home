import React, { useState } from 'react';
import type { SearchField, Person } from '../types';
import { Search, Filter, RotateCcw } from 'lucide-react';
import PersonCard from './ui/PersonCard';
import { getListingsByFieldValue, getUniqueValuesForField } from '../middleware/middleware';

const SearchSection: React.FC = () => {
  const [searchField, setSearchField] = useState<SearchField>('color');
  const [searchValue, setSearchValue] = useState('');
  const [results, setResults] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const suggestionValues = getUniqueValuesForField(searchField);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchValue.trim()) return;

    setIsLoading(true);
    setHasSearched(true);

    try {
      const data = await getListingsByFieldValue(searchField, searchValue);
      setResults(data);
    } catch (error) {
      console.error('Error searching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSearchField("color");
    setSearchValue("");
    setHasSearched(false);
    setResults([]);
  };


  return (
    <section className="lg:px-[10%] px-8 p-6 py-14">
      <h2 className="mb-10 text-3xl font-semibold text-black ">Search Listings</h2>

      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <div className="w-full sm:w-1/3">
            <label htmlFor="searchField" className="mb-1 block text-sm font-medium text-gray-700">
              Search by
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Filter className="h-5 w-5 text-gray-400 " />
              </div>
              <select
                id="searchField"
                value={searchField}
                onChange={(e) => setSearchField(e.target.value as SearchField)}
                className="block w-full appearance-none rounded-lg border border-gray-300 bg-[#363636] p-2.5 pl-10 text-sm text-gray-200 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              >
                <option className="bg-[#363636] text-white" value="color">
                  Color
                </option>
                <option className="bg-[#363636] text-white" value="language">
                  Language
                </option>
              </select>
            </div>
          </div>

          <div className="w-full sm:w-2/3">
            <label htmlFor="searchValue" className="mb-1 block text-sm font-medium text-gray-700">
              Value
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="searchValue"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="block w-full rounded-lg border bg-[#363636] border-gray-300 p-2.5 pl-10 text-sm text-gray-200 shadow-sm placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder={`Enter ${searchField}...`}
                list="suggestions"
              />
              <datalist id="suggestions">
                {suggestionValues.map(value => (
                  <option key={value} value={value} />
                ))}
              </datalist>
            </div>
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="cursor-pointer rounded-lg bg-[#715da5] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-[#363636] focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all hover:scale-105 hover:shadow-md"
            >
              Search
            </button>
          </div>
        </div>
      </form>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
        </div>
      ) : hasSearched ? (
        <div className="relative">

          <button
            onClick={handleReset}
            className="absolute right-0 -top-2 rounded-md bg-red-100 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-200 transition-all shadow-sm"
          >
            <RotateCcw />
          </button>

          {results.length > 0 ? (
            <div>
              <h3 className="mb-4 text-lg font-medium text-gray-900">
                Search Results ({results.length})
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {results.map((person) => (
                  <PersonCard key={person.id} person={person} />
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-lg mt-10 p-4 text-center">
              <p className="text-gray-600">No results found for "{searchValue}" in {searchField}.</p>
            </div>
          )}
        </div>
      ) : null}

    </section>
  );
};

export default SearchSection;