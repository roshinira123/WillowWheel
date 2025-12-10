import React, { useState } from 'react';
import Footer from '../components/Footer';
import surveyQuestions from '../data/surveyQuestions';

const SurveyPage = ({ setCurrentPage }) => {
  const steps = surveyQuestions;
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState({});

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
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-purple-300 to-blue-300 flex items-start pt-24 pb-16">
      <div className="max-w-4xl mx-auto w-full px-4">
        <div className="bg-white/95 backdrop-blur rounded-2xl p-6 md:p-8 shadow-xl">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Tell us about your drivers</h1>
          <p className="text-gray-600 mb-6">Please complete the form below and click Get quotes when finished.</p>

          <form onSubmit={(e) => { e.preventDefault(); console.log('answers', answers); setCurrentPage('results'); }} className="space-y-6">
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
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">{q.title}</h3>
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

                  {(q.type === 'text' || q.type === 'email' || q.type === 'tel' || q.type === 'date') && (
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
    </div>
  );
};

export default SurveyPage;


