import React from 'react';
import { Database } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="border-b border-gray-200 bg-[#2c2c2c] px-4 py-4 ">
      <div className=" mx-auto grid items-center justify-center">
        <div className="flex items-center justify-center">
          <Database className="mr-2 h-8 w-8 text-[#715da5]" />
          <h1 className="text-2xl font-bold text-gray-900">
            <span className="text-slate-200">DataDashboard</span>
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;