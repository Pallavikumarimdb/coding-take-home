import React, { useState, useEffect } from 'react';
import type { CountryGroup } from '../types';
import { Plus, Minus, Globe, Users } from 'lucide-react';
import PersonCard from './ui/PersonCard';
import { getListingsByCountry } from '../middleware/middleware';

const CountrySection: React.FC = () => {
  const [countryGroups, setCountryGroups] = useState<CountryGroup[]>([]);
  const [expandedCountries, setExpandedCountries] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getListingsByCountry();
        setCountryGroups(data);
        const initialExpanded: Record<string, boolean> = {};
        data.forEach(group => {
          initialExpanded[group.country] = group.count <= 3;
        });
        setExpandedCountries(initialExpanded);
      } catch (error) {
        console.error('Error fetching country data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleCountry = (country: string) => {
    setExpandedCountries(prev => ({
      ...prev,
      [country]: !prev[country]
    }));
  };

  if (isLoading) {
    return (
      <section className="mt-8 rounded-lg bg-[#2c2c2c] p-6 shadow-sm lg:px-[10%] px-8 py-20  ">
        <h2 className="mb-4 text-xl font-semibold text-gray-200">Listings by Country</h2>
        <div className="flex justify-center py-8">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-8 rounded-lg  bg-[#2c2c2c] p-6 shadow-sm lg:px-[10%] px-8 py-20">
      <h2 className="mb-8 text-3xl font-semibold text-gray-200 ">Listings by Country</h2>

      <div className="space-y-4 ">
        {countryGroups.map((group) => (
          <div
            key={group.country}
            className="overflow-hidden rounded-lg transition-all hover:scale-105 hover:shadow-md"
          >
            <div
              className="flex cursor-pointer items-center justify-between bg-[#363636] p-6"
              onClick={() => toggleCountry(group.country)}
            >
              <div className="flex items-center">
                <Globe className="mr-2 h-5 w-5 text-[#715da5]" />
                <h3 className="font-medium text-gray-200">{group.country}</h3>
              </div>
              

              <div className="flex items-center">
                <div className="mr-6 flex items-center rounded-full   px-2.5 py-0.5 text-sm font-medium text-[#715da5]">
                  <Users className="mr-1 h-4 w-4" />
                  {group.count}
                </div>
                {expandedCountries[group.country] ? (

                  <button
                    className="flex cursor-pointer items-center justify-center rounded-full bg-white  shadow-md hover:shadow-lg transition-all duration-200 ease-in-out"
                    aria-label="Add"
                  >
                    <Minus className='text-[#715da5]'/>
                  </button>

                ) : (
                  <button
                    className="flex cursor-pointer items-center justify-center rounded-full bg-white  shadow-md hover:shadow-lg transition-all duration-200 ease-in-out"
                    aria-label="Add"
                  >
                    <Plus className='text-[#715da5]'/>
                  </button>
                )}
              </div>
            </div>

            {expandedCountries[group.country] && (
              <div className="bg-[#dcdbe1] p-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {group.people.map((person) => (
                    <PersonCard key={person.id} person={person} />
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default CountrySection;