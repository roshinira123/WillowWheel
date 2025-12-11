const surveyQuestions = [
  { type: 'section', id: 's1', title: 'Section 1: Primary Policyholder Information' },
  { id: 1, title: 'Full Name', question: 'Full Name', type: 'text' },
  { id: 2, title: 'Date of Birth', question: 'Date of Birth', type: 'date' },
  { id: 3, title: 'Phone Number', question: 'Phone Number', type: 'text' },
  { id: 4, title: 'Email Address', question: 'Email Address', type: 'text' },
  { id: 5, title: 'Home Address', question: 'Home Address', type: 'text' },
  { id: 6, title: 'Home Ownership', question: 'Do you own or rent your home?', type: 'options', options: ['Own', 'Rent'] },

  { type: 'section', id: 's2', title: 'Section 2: Household Members (Optional)' },
  { id: 7, title: 'Other Adults', question: 'Do any other adults live in your household?', type: 'options', options: ['Yes', 'No'] },

  { type: 'section', id: 's3', title: 'Section 3: Drivers on the Policy' },
  { id: 8, title: 'Driver Name', question: 'Full Name (as shown on license)', type: 'text' },
  { id: 9, title: 'Driver Date of Birth', question: 'Date of Birth', type: 'date' },
  { id: 10, title: 'Gender', question: 'Gender (Optional)', type: 'select', options: ['Male', 'Female', 'Other', 'Prefer not to say'] },
  { id: 11, title: 'Driving Experience', question: 'Years of Driving Experience', type: 'text' },
  { id: 12, title: 'License Number', question: "Driver's License Number", type: 'text' },
  { id: 13, title: 'License State', question: 'State of License', type: 'text' },
  { id: 14, title: 'Accidents (3 years)', question: 'Any accidents in the last 3 years?', type: 'options', options: ['Yes', 'No'] },
  { id: 15, title: 'Accidents (6 years)', question: 'Any accidents in the last 6 years?', type: 'options', options: ['Yes', 'No'] },
  { id: 16, title: 'Tickets (3 years)', question: 'Any tickets in the last 3 years?', type: 'options', options: ['Yes', 'No'] },
  { id: 17, title: 'Tickets (6 years)', question: 'Any tickets in the last 6 years?', type: 'options', options: ['Yes', 'No'] },
  { id: 18, title: 'Major Violations', question: 'Any major violations in the last 10 years?', type: 'options', options: ['Yes', 'No'] },

  { type: 'section', id: 's4', title: 'Section 4: Vehicles' },
  { id: 19, title: 'Vehicle Year', question: 'Year', type: 'year' },
  { id: 20, title: 'Vehicle Make', question: 'Make', type: 'text' },
  { id: 21, title: 'Vehicle Model', question: 'Model', type: 'text' },
  { id: 22, title: 'Vehicle Trim', question: 'Trim Level (if known)', type: 'text' },
  { id: 23, title: 'Odometer', question: 'Odometer Reading', type: 'text' },
  { id: 24, title: 'Primary Driver', question: 'Primary Driver', type: 'text' },
  { id: 25, title: 'Business Use', question: 'Used for Business?', type: 'options', options: ['Yes', 'No'] },
  { id: 26, title: 'Annual Miles', question: 'Estimated Annual Miles', type: 'text' },
  { id: 27, title: 'Commute Distance', question: 'Miles to Work (one way)', type: 'text' },
  { id: 28, title: 'Commute Frequency', question: 'Days Driven to Work Per Week', type: 'text' },

  { type: 'section', id: 's5', title: 'Section 5: Vehicle Customizations (Optional)' },
  { id: 29, title: 'Non-factory features', question: 'Does your vehicle have any non-factory features?', type: 'options', options: ['Yes', 'No'] },

  { type: 'section', id: 's6', title: 'Section 6: Driver Discounts & Education' },
  { id: 30, title: 'Student Discount', question: "Is the driver currently a full-time student with a 'B' average or higher?", type: 'options', options: ['Yes', 'No'] },
  { id: 31, title: 'Defensive Driving', question: 'Has any driver completed a senior or defensive driving course?', type: 'options', options: ['Yes', 'No'] },

  { type: 'section', id: 's7', title: 'Section 7: Coverage Preferences' },
  { id: 32, title: 'Liability Coverage', question: 'Liability Coverage', type: 'options', options: ['25/50/20', '25/50/25', '50/100/50', '100/300/100'] },
  { id: 33, title: 'Uninsured Motorist', question: 'Uninsured Motorist', type: 'options', options: ['25/50/20', '25/50/25', '50/100/50', '100/300/100'] },
  { id: 34, title: 'Medical Payments', question: 'Medical Payments', type: 'options', options: ['$1,000', '$2,000', '$5,000', '$10,000', '$25,000'] },
  { id: 35, title: 'Comprehensive Deductible', question: 'Comprehensive Deductible', type: 'options', options: ['$250', '$500', '$1,000'] },
  { id: 36, title: 'Collision Deductible', question: 'Collision Deductible', type: 'options', options: ['$250', '$500', '$1,000'] },
  { id: 37, title: 'Roadside Assistance', question: 'Roadside Assistance', type: 'options', options: ['Yes', 'No'] },
  { id: 38, title: 'Rental Car Coverage', question: 'Rental Car Coverage', type: 'options', options: ['Yes', 'No'] },

  { type: 'section', id: 's8', title: 'Section 8: Current Insurance (Optional)' },
  { id: 39, title: 'Current Insurance Company', question: 'Current Insurance Company', type: 'text' },
  { id: 40, title: 'Policy Renewal Date', question: 'Policy Renewal Date', type: 'date' },
];

export default surveyQuestions;
