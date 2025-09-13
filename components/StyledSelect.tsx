
import React from 'react';
import type { SelectOption } from '../types';

interface StyledSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
}

export const StyledSelect: React.FC<StyledSelectProps> = ({ label, value, onChange, options }) => {
  return (
    <div>
      <label htmlFor={label} className="block text-sm font-medium text-gray-300 mb-1">
        {label}
      </label>
      <div className="relative">
        <select
          id={label}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-3 pr-10 py-2.5 bg-gray-700/50 border border-gray-600 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-white"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} className="bg-gray-800 text-white">
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  );
};
