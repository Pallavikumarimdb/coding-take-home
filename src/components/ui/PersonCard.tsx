import React from 'react';
import type { Person } from '../../types';
import { Mail, Globe, Palette, Languages } from 'lucide-react';

interface PersonCardProps {
  person: Person;
}

const PersonCard: React.FC<PersonCardProps> = ({ person }) => {
  const getColorBackground = (color: string | null) => {
    if (!color) return 'bg-gray-100 ';

    const colorMap: Record<string, string> = {
      'Blue': 'bg-blue-100',
      'Red': 'bg-red-100',
      'Green': 'bg-green-100',
      'Yellow': 'bg-yellow-100',
      'Purple': 'bg-purple-100',
      'Orange': 'bg-orange-100',
      'Teal': 'bg-teal-100'
    };

    return colorMap[color] || 'bg-gray-100';
  };


  const getColorBorder = (color: string | null) => {
    if (!color) return 'border-gray-200 ';

    const colorMap: Record<string, string> = {
      'Blue': 'border-blue-200',
      'Red': 'border-red-200',
      'Green': 'border-green-200',
      'Yellow': 'border-yellow-200',
      'Purple': 'border-purple-200',
      'Orange': 'border-orange-200',
      'Teal': 'border-teal-200'
    };

    return colorMap[color] || 'border-gray-200';
  };

  return (
    <div className={`rounded-lg rounded-lg border border-gray-400 p-4 transition-all duration-200  hover:shadow-md`}>
      <div className="overflow-hidden">
        <div className='flex items-start justify-between overflow-hidden text-clip'>
          <h3 className="font-medium text-gray-900">
            {person.first_name} {person.last_name}
          </h3>
          <div className="">
            <span className={`text-gray-700 text-sm`}>
              ID: {person.id}
            </span>
          </div>
        </div>
        <div className="mt-1 flex items-center text-sm text-gray-800">
          <Mail className="mr-1 h-4 w-4" />
          <a
            href={`mailto:${person.email}`}
            className="hover:text-blue-500 hover:underline transition-colors duration-200 overflow-hidden text-clip"
          >
            {person.email}
          </a>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <div className={`inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-sm font-small text-blue-800  shadow-sm transition-all hover:scale-105 hover:shadow-md`}>
          <Languages className='h-4 w-4' />
          {person.language || 'Missing language'}
        </div>

        <div className={`inline-flex items-center gap-2 rounded-full bg-amber-100 text-amber-800 px-3 py-1 text-sm font-small shadow-sm transition-all hover:scale-105 hover:shadow-md`}>
          <Globe className='h-4 w-4' />
          {person.country || 'Missing country'}
        </div>

        
        <div className={`inline-flex items-center gap-2 rounded-full ${getColorBackground(person.color)} ${getColorBorder(person.color)} px-3 py-1 text-sm font-small text-purple-800 shadow-sm transition-all hover:scale-105 hover:shadow-md`}>
          <Palette className='h-4 w-4' />
          {person.color || 'Missing color'}
        </div>
      </div>

    </div>
  );
};

export default PersonCard;