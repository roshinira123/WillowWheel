import React, { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';

const YearPicker = ({ value, onChange, placeholder = "Select year" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(value ? parseInt(value) : null);
  const yearDropdownRef = useRef(null);
  
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i); // Last 50 years

  useEffect(() => {
    if (value) {
      setSelectedYear(parseInt(value));
    }
  }, [value]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && yearDropdownRef.current && !yearDropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, 0);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen]);

  const handleYearSelect = (year) => {
    setSelectedYear(year);
    onChange(year.toString());
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-purple-200 bg-gradient-to-r from-purple-50/50 to-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-500 transition-all hover:border-purple-300 hover:shadow-md cursor-pointer text-gray-800 font-medium shadow-sm text-left flex items-center justify-between group"
      >
        <div className="flex items-center gap-3">
          <Calendar className="text-purple-500 group-hover:text-purple-600 transition-colors" size={20} />
          <span className={selectedYear ? 'text-gray-800' : 'text-gray-400'}>
            {selectedYear || placeholder}
          </span>
        </div>
        <ChevronDown className={`text-purple-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} size={18} />
      </button>

      {isOpen && (
        <div 
          ref={yearDropdownRef}
          className="absolute z-50 mt-2 w-full bg-white rounded-xl shadow-2xl border-2 border-purple-200 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <div className="max-h-64 overflow-y-auto">
            {years.map((year) => (
              <button
                key={year}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleYearSelect(year);
                }}
                className={`w-full px-4 py-3 text-left hover:bg-purple-50 transition-colors text-sm ${
                  selectedYear === year
                    ? 'bg-purple-600 text-white font-semibold'
                    : 'text-gray-700 hover:text-purple-600'
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default YearPicker;

