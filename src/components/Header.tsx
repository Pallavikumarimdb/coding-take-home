import React from 'react';
import { Database, Github } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="relative border-b border-gray-200 bg-[#2c2c2c] px-4 py-4">
      <a
        href="https://github.com/Pallavikumarimdb/coding-take-home"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-200 hover:text-white"
      >
        <Github className="h-6 w-6" />
      </a>
      <div className="flex justify-center">
        <div className="flex items-center">
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