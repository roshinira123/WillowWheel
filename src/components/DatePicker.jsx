import React, { useState, useEffect, useRef } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';

const DatePicker = ({ value, onChange, placeholder = "Select date" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(value ? new Date(value) : null);
  const [displayDate, setDisplayDate] = useState(selectedDate || new Date());
  const [yearDropdownOpen, setYearDropdownOpen] = useState(false);
  const yearDropdownRef = useRef(null);
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const fullMonthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - 80 + i);
  const daysInMonth = new Date(displayDate.getFullYear(), displayDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(displayDate.getFullYear(), displayDate.getMonth(), 1).getDay();

  useEffect(() => {
    if (value) {
      const date = new Date(value);
      setSelectedDate(date);
      setDisplayDate(date);
    }
  }, [value]);

  // Close year dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (yearDropdownOpen && yearDropdownRef.current && !yearDropdownRef.current.contains(event.target)) {
        setYearDropdownOpen(false);
      }
    };

    if (yearDropdownOpen) {
      // Use setTimeout to avoid immediate closure
      setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, 0);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [yearDropdownOpen]);


  const formatDate = (date) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleDateSelect = (day) => {
    const newDate = new Date(displayDate.getFullYear(), displayDate.getMonth(), day);
    setSelectedDate(newDate);
    onChange(formatDate(newDate));
    setIsOpen(false);
  };

  const handleMonthSelect = (monthIndex) => {
    setDisplayDate(new Date(displayDate.getFullYear(), monthIndex, 1));
  };

  const handleYearSelect = (year) => {
    setDisplayDate(new Date(year, displayDate.getMonth(), 1));
  };


  const getDisplayText = () => {
    if (selectedDate) {
      return `${fullMonthNames[selectedDate.getMonth()]} ${selectedDate.getDate()}, ${selectedDate.getFullYear()}`;
    }
    return placeholder;
  };

  const calendarDays = [];
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-purple-200 bg-gradient-to-r from-purple-50/50 to-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-500 transition-all hover:border-purple-300 hover:shadow-md cursor-pointer text-gray-800 font-medium shadow-sm text-left flex items-center justify-between group"
      >
        <div className="flex items-center gap-3">
          <Calendar className="text-purple-500 group-hover:text-purple-600 transition-colors" size={20} />
          <span className={selectedDate ? 'text-gray-800' : 'text-gray-400'}>{getDisplayText()}</span>
        </div>
        <ChevronDown className={`text-purple-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} size={18} />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={(e) => {
              // Don't close if clicking on the year dropdown
              if (!yearDropdownRef.current?.contains(e.target)) {
                setIsOpen(false);
                setYearDropdownOpen(false);
              }
            }}
          />
          <div className="absolute z-50 mt-2 w-full bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-50 to-white p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <button
                  type="button"
                  onClick={() => {
                    const newDate = new Date(displayDate);
                    newDate.setMonth(newDate.getMonth() - 1);
                    setDisplayDate(newDate);
                  }}
                  className="p-2 hover:bg-purple-100 rounded-lg transition-colors"
                >
                  <ChevronDown className="rotate-90 text-purple-600" size={20} />
                </button>
                <div className="flex items-center gap-2">
                  <div className="relative" ref={yearDropdownRef}>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setYearDropdownOpen(prev => !prev);
                      }}
                      className="px-4 py-2 text-sm font-semibold text-purple-600 hover:bg-purple-50 rounded-lg transition-colors flex items-center gap-2"
                    >
                      <span>{fullMonthNames[displayDate.getMonth()]}</span>
                      <span className="font-bold">{displayDate.getFullYear()}</span>
                      <ChevronDown className={`text-purple-600 transition-transform ${yearDropdownOpen ? 'rotate-180' : ''}`} size={16} />
                    </button>
                    {yearDropdownOpen && (
                      <div 
                        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white border-2 border-purple-200 rounded-lg shadow-2xl z-[60] max-h-64 overflow-y-auto min-w-[140px]"
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
                                setYearDropdownOpen(false);
                              }}
                              className={`w-full px-4 py-2.5 text-left hover:bg-purple-50 transition-colors text-sm ${
                                displayDate.getFullYear() === year
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
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const newDate = new Date(displayDate);
                    newDate.setMonth(newDate.getMonth() + 1);
                    setDisplayDate(newDate);
                  }}
                  className="p-2 hover:bg-purple-100 rounded-lg transition-colors"
                >
                  <ChevronDown className="-rotate-90 text-purple-600" size={20} />
                </button>
              </div>

              {/* Month Grid */}
              <div className="grid grid-cols-4 gap-2">
                {monthNames.map((month, index) => (
                  <button
                    key={month}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMonthSelect(index);
                    }}
                    className={`py-2.5 px-3 rounded-lg text-sm font-medium transition-all ${
                      displayDate.getMonth() === index
                        ? 'bg-purple-600 text-white shadow-md'
                        : 'bg-white text-gray-700 hover:bg-purple-50 border border-gray-200'
                    }`}
                  >
                    {month}
                  </button>
                ))}
              </div>
            </div>

            {/* Calendar Days */}
            <div className="p-4">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 px-2">Day</div>
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                    <div key={day} className="text-center text-xs font-semibold text-gray-500 py-2">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {calendarDays.map((day, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (day) handleDateSelect(day);
                      }}
                      disabled={!day}
                      className={`aspect-square rounded-lg text-sm font-medium transition-all ${
                        !day
                          ? ''
                          : selectedDate &&
                            selectedDate.getDate() === day &&
                            selectedDate.getMonth() === displayDate.getMonth() &&
                            selectedDate.getFullYear() === displayDate.getFullYear()
                          ? 'bg-purple-600 text-white shadow-md font-semibold'
                          : 'text-gray-700 hover:bg-purple-50 hover:text-purple-600'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 p-4 bg-gray-50 flex justify-end gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedDate(null);
                  onChange('');
                  setIsOpen(false);
                }}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                className="px-4 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
              >
                Done
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DatePicker;

