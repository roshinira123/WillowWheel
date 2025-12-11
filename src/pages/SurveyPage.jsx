import React, { useState } from 'react';
import { Info } from 'lucide-react';
import Footer from '../components/Footer';
import DatePicker from '../components/DatePicker';
import YearPicker from '../components/YearPicker';
import surveyQuestions from '../data/surveyQuestions';

const SurveyPage = ({ setCurrentPage, setSurveyData }) => {
  const steps = surveyQuestions;
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [infoModal, setInfoModal] = useState(null);

  const current = steps[stepIndex];

  // generic setter that writes answer by question id
  const setAnswer = (id, val) => {
    setAnswers((s) => ({ ...s, [id]: val }));
  };

  const next = () => {
    if (stepIndex < steps.length - 1) setStepIndex((i) => i + 1);
    else setCurrentPage('results');
  };

  const back = () => {
    if (stepIndex > 0) setStepIndex((i) => i - 1);
  };

  const infoContent = {
    trim: {
      title: 'What is Vehicle Trim?',
      explanation: 'Vehicle trim refers to the specific version or package of your vehicle model. It determines the features, equipment, and options included in your car.',
      howToFind: [
        'Check your vehicle registration documents',
        'Look at the window sticker (Monroney label) if you still have it',
        'Check the driver\'s side door jamb for a sticker with trim information',
        'Look in your owner\'s manual',
        'Check your vehicle\'s dashboard or center console for trim badges',
        'Use your VIN (Vehicle Identification Number) to look up trim details online'
      ]
    },
    odometer: {
      title: 'What is Odometer Reading?',
      explanation: 'The odometer reading shows the total number of miles (or kilometers) your vehicle has traveled since it was manufactured.',
      howToFind: [
        'Look at your vehicle\'s dashboard - the odometer is usually displayed in the instrument cluster',
        'It\'s typically shown as a digital or analog display with numbers',
        'The reading is usually in miles (mi) or kilometers (km)',
        'You can find it on your vehicle registration or title documents',
        'Check your last service records - mechanics often record the odometer reading',
        'If you have a digital display, it may cycle through different screens - look for "ODO" or "Total Miles"'
      ]
    },
    liability: {
      title: 'What is Liability Coverage?',
      explanation: 'Liability coverage protects you if you\'re at fault in an accident. It covers the costs of injuries and property damage you cause to others.',
      numberExplanation: 'The numbers represent coverage limits in thousands of dollars, written as: Bodily Injury per Person / Bodily Injury per Accident / Property Damage',
      examples: [
        '25/50/20 = $25,000 per person, $50,000 per accident, $20,000 property damage',
        '25/50/25 = $25,000 per person, $50,000 per accident, $25,000 property damage',
        '50/100/50 = $50,000 per person, $100,000 per accident, $50,000 property damage',
        '100/300/100 = $100,000 per person, $300,000 per accident, $100,000 property damage'
      ],
      tips: [
        'Higher limits provide more protection but cost more',
        'State minimums vary - check your state\'s requirements',
        'Consider your assets when choosing coverage limits',
        'Property damage covers damage to other vehicles and property'
      ]
    },
    uninsured: {
      title: 'What is Uninsured Motorist Coverage?',
      explanation: 'Uninsured Motorist (UM) coverage protects you and your passengers if you\'re hit by a driver who has no insurance or insufficient insurance to cover your damages.',
      numberExplanation: 'The numbers represent coverage limits in thousands of dollars, written as: Bodily Injury per Person / Bodily Injury per Accident',
      examples: [
        '25/50/20 = $25,000 per person, $50,000 per accident, $20,000 property damage',
        '25/50/25 = $25,000 per person, $50,000 per accident, $25,000 property damage',
        '50/100/50 = $50,000 per person, $100,000 per accident, $50,000 property damage',
        '100/300/100 = $100,000 per person, $300,000 per accident, $100,000 property damage'
      ],
      tips: [
        'Protects you from drivers without insurance or with low limits',
        'Covers medical expenses, lost wages, and pain and suffering',
        'Some states require this coverage',
        'Recommended to match your liability coverage limits'
      ]
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-purple-300 to-blue-300 flex items-start pt-24 pb-16">
      <div className="max-w-4xl mx-auto w-full px-4">
        <div className="bg-white/95 backdrop-blur rounded-2xl p-6 md:p-8 shadow-xl">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Tell us about your drivers</h1>
          <p className="text-gray-600 mb-6">Please complete the form below and click Get quotes when finished.</p>

          <form onSubmit={(e) => { 
            e.preventDefault(); 
            
            localStorage.setItem('surveyData', JSON.stringify(answers));
            
            setSurveyData(answers);
            setCurrentPage('results'); 
          }} className="space-y-6">
            {steps.map((q) => {
              if (q.type === 'section') {
                return (
                  <div key={q.id} className="py-4">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-800">{q.title}</h2>
                  </div>
                );
              }

              return (
                <div key={q.id} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold text-gray-800">{q.title}</h3>
                    {(q.id === 22 || q.id === 23 || q.id === 32 || q.id === 33) && (
                      <button
                        type="button"
                        onClick={() => {
                          if (q.id === 22) setInfoModal('trim');
                          else if (q.id === 23) setInfoModal('odometer');
                          else if (q.id === 32) setInfoModal('liability');
                          else if (q.id === 33) setInfoModal('uninsured');
                        }}
                        className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-full p-1 transition-colors"
                        aria-label="More information"
                      >
                        <Info size={18} />
                      </button>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{q.question}</p>

                  {q.type === 'options' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {q.options.map((opt) => {
                        const selected = answers[q.id] === opt;
                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setAnswer(q.id, opt)}
                            className={`text-left px-4 py-3 rounded-lg border transition ${selected ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-gray-800 border-gray-200 hover:shadow-md'}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {q.type === 'number' && (
                    <input
                      type="number"
                      placeholder={q.placeholder || ''}
                      value={answers[q.id] || ''}
                      onChange={(e) => setAnswer(q.id, e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                  )}

                  {q.type === 'select' && (
                    <select
                      value={answers[q.id] || ''}
                      onChange={(e) => setAnswer(q.id, e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white"
                    >
                      <option value="">Select an option...</option>
                      {q.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  )}

                  {q.type === 'date' && (
                    <DatePicker
                      value={answers[q.id] || ''}
                      onChange={(value) => setAnswer(q.id, value)}
                      placeholder="Select date"
                    />
                  )}

                  {q.type === 'year' && (
                    <YearPicker
                      value={answers[q.id] || ''}
                      onChange={(value) => setAnswer(q.id, value)}
                      placeholder="Select year"
                    />
                  )}

                  {(q.type === 'text' || q.type === 'email' || q.type === 'tel') && (
                    <input
                      type={q.type === 'text' ? 'text' : q.type}
                      placeholder={q.placeholder || ''}
                      value={answers[q.id] || ''}
                      onChange={(e) => setAnswer(q.id, e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                  )}

                  {q.type === 'final' && (
                    <div className="text-sm text-gray-700">When you submit we'll generate personalized quotes based on your answers.</div>
                  )}
                </div>
              );
            })}

            <div className="pt-4">
              <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-full transition-all">Get quotes</button>
            </div>
          </form>
        </div>
        <div className="mt-6">
          <Footer />
        </div>
      </div>

      {/* Info Modal */}
      {infoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setInfoModal(null)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800">{infoContent[infoModal].title}</h2>
                <button
                  onClick={() => setInfoModal(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">What it means:</h3>
                  <p className="text-gray-700">{infoContent[infoModal].explanation}</p>
                </div>
                
                {infoContent[infoModal].numberExplanation && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">What the numbers mean:</h3>
                    <p className="text-gray-700 mb-3">{infoContent[infoModal].numberExplanation}</p>
                    {infoContent[infoModal].examples && (
                      <div className="bg-purple-50 rounded-lg p-4 space-y-2">
                        <p className="font-semibold text-gray-800 mb-2">Examples:</p>
                        <ul className="list-disc list-inside space-y-1 text-gray-700">
                          {infoContent[infoModal].examples.map((item, index) => (
                            <li key={index} className="text-sm">{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
                
                {infoContent[infoModal].tips && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Tips:</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      {infoContent[infoModal].tips.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {infoContent[infoModal].howToFind && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">How to find this information:</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                      {infoContent[infoModal].howToFind.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              <div className="mt-6">
                <button
                  onClick={() => setInfoModal(null)}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-all"
                >
                  Got it
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SurveyPage;