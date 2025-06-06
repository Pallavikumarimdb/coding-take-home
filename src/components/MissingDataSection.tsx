import React, { useState, useEffect } from 'react';
import type { Person } from '../types';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';
import PersonCard from './ui/PersonCard';
import { getListingsWithMissingData } from '../middleware/middleware';

const MissingDataSection: React.FC = () => {
  const [missingData, setMissingData] = useState<{
    missingColor: Person[];
    missingLanguage: Person[];
    missingCountry: Person[];
  }>({
    missingColor: [],
    missingLanguage: [],
    missingCountry: [],
  });

  const [showMissingColor, setShowMissingColor] = useState(false);
  const [showMissingLanguage, setShowMissingLanguage] = useState(false);
  const [showMissingCountry, setShowMissingCountry] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getListingsWithMissingData();
        setMissingData(data);
      } catch (error) {
        console.error('Error fetching missing data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <section className="mt-20 rounded-lg  p-6 bg-[#2c2c2c] p-6 shadow-sm lg:px-[10%] px-8 py-20">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">Missing Data</h2>
        <div className="flex justify-center py-8">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="my-32 rounded-lg  p-6 bg-[#2c2c2c] p-6 shadow-sm lg:px-[10%] px-8 py-20">
      <h2 className="mb-8 text-3xl font-semibold text-gray-200">Missing Data</h2>

      <div className="mb-6 grid gap-4 ">
        <div className="rounded-lg border border-red-200 bg-red-50 transition-all hover:scale-105 hover:shadow-md">
          <div
            className="flex items-center justify-between p-6 cursor-pointer"
            onClick={() => setShowMissingColor(!showMissingColor)}
          >
            <div className="flex items-center">
              <AlertCircle className="mr-2 h-5 w-5 text-red-700" />
              <h3 className="font-medium text-red-800">
                Missing Color: {missingData.missingColor.length}
              </h3>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowMissingColor(!showMissingColor);
              }}
              className="inline-flex items-cente cursor-pointer rounded-lg bg-red-200 px-2 py-1 text-xs font-medium text-red-800 hover:bg-red-300"
            >
              {showMissingColor ? (
                <>
                  <EyeOff className="mr-1 h-3 w-3" /> Hide
                </>
              ) : (
                <>
                  <Eye className="mr-1 h-3 w-3" /> Show
                </>
              )}
            </button>
          </div>

          {showMissingColor && missingData.missingColor.length > 0 && (
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 px-6">
              {missingData.missingColor.map((person) => (
                <PersonCard key={person.id} person={person} />
              ))}
            </div>
          )}
        </div>

        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 transition-all hover:scale-105 hover:shadow-md">
          <div className="mb-2 flex items-center justify-between cursor-pointer"
            onClick={() => setShowMissingLanguage(!showMissingLanguage)}
          >
            <div className="flex items-center">
              <AlertCircle className="mr-2 h-5 w-5 text-amber-800" />
              <h3 className="font-medium text-amber-800">
                Missing Language: {missingData.missingLanguage.length}
              </h3>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowMissingLanguage(!showMissingLanguage);
              }}
              className="cursor-pointer inline-flex items-center rounded-lg bg-amber-300 px-2 py-1 text-xs font-medium text-amber-800 hover:bg-amber-300"
            >
              {showMissingLanguage ? (
                <>
                  <EyeOff className="mr-1 h-3 w-3" /> Hide
                </>
              ) : (
                <>
                  <Eye className="mr-1 h-3 w-3" /> Show
                </>
              )}
            </button>
          </div>

          {showMissingLanguage && missingData.missingLanguage.length > 0 && (
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {missingData.missingLanguage.map((person) => (
                <PersonCard key={person.id} person={person} />
              ))}
            </div>
          )}
        </div>


        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 transition-all hover:scale-105 hover:shadow-md">
          <div className="mb-2 flex items-center justify-between cursor-pointer"
            onClick={() => setShowMissingCountry(!showMissingCountry)}
          >
            <div className="flex items-center ">
              <AlertCircle className="mr-2 h-5 w-5 text-blue-800" />
              <h3 className="font-medium text-blue-800">
                Missing Country: {missingData.missingCountry.length}
              </h3>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowMissingCountry(!showMissingCountry);
              }}
              className="cursor-pointer inline-flex items-center rounded-lg bg-blue-300 px-2 py-1 text-xs font-medium text-blue-800 hover:bg-blue-300"
            >
              {showMissingCountry ? (
                <>
                  <EyeOff className="mr-1 h-3 w-3" /> Hide
                </>
              ) : (
                <>
                  <Eye className="mr-1 h-3 w-3" /> Show
                </>
              )}
            </button>
          </div>

          {showMissingCountry && missingData.missingCountry.length > 0 && (
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {missingData.missingCountry.map((person) => (
                <PersonCard key={person.id} person={person} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MissingDataSection;