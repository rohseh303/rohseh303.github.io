'use client';

import { useState } from 'react';

interface FilterBarProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: string[]) => void;
  filterOptions: {
    label: string;
    value: string;
    group: string;
  }[];
  searchPlaceholder?: string;
}

export default function FilterBar({ 
  onSearch, 
  onFilterChange, 
  filterOptions,
  searchPlaceholder = "Search..."
}: FilterBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };
  
  const toggleFilter = (value: string) => {
    const newFilters = activeFilters.includes(value)
      ? activeFilters.filter(f => f !== value)
      : [...activeFilters, value];
    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const groupedFilters = filterOptions.reduce((acc, option) => {
    if (!acc[option.group]) acc[option.group] = [];
    acc[option.group].push(option);
    return acc;
  }, {} as Record<string, typeof filterOptions>);
  
  return (
    <div className="mb-8">
      <div className="bg-black border-terminal p-4 mb-6">
        <label className="block text-xs uppercase tracking-wider mb-2">
          SEARCH
        </label>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder={searchPlaceholder}
          className="w-full bg-transparent border-terminal border-b px-2 py-1 focus:outline-none focus:border-[rgba(255,255,255,0.3)]"
        />
      </div>
      
      <div className="space-y-4">
        {Object.entries(groupedFilters).map(([group, options]) => (
          <div key={group}>
            <p className="text-xs uppercase tracking-wider text-[#a0a0a0] mb-2">
              {group}
            </p>
            <div className="flex flex-wrap gap-2">
              {options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => toggleFilter(option.value)}
                  className={`
                    text-xs uppercase tracking-wider px-3 py-1 border-terminal
                    transition-colors
                    ${activeFilters.includes(option.value)
                      ? 'bg-white text-black border-white'
                      : 'hover:border-[rgba(255,255,255,0.2)]'
                    }
                  `}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
