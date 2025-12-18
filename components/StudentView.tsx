
import React, { useState } from 'react';
import { Question, QuestionType, QuizResult } from '../types';
import { OVERVIEW_IMAGE_PATH } from '../constants';

interface StudentViewProps {
  questions: Question[];
  onFinish: (results: QuizResult[]) => void;
}

const StudentView: React.FC<StudentViewProps> = ({ questions, onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [results, setResults] = useState<QuizResult[]>([]);
  const [showReference, setShowReference] = useState(false);

  const question = questions[currentIndex];

  const handleSelect = (answer: string) => {
    if (isAnswered) return;
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    if (!selectedAnswer) return;

    const isCorrect = selectedAnswer === question.correctAnswer.toString();
    const newResult: QuizResult = {
      questionId: question.id,
      isCorrect,
      timestamp: Date.now()
    };

    setResults([...results, newResult]);
    setIsAnswered(true);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setShowReference(false);
    } else {
      onFinish([...results]);
    }
  };

  const progress = ((currentIndex) / questions.length) * 100;

  return (
    <div className="w-full space-y-8">
      {/* Header & Control Area */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex-1">
          <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">
            <span>Aufgabe {currentIndex + 1} von {questions.length}</span>
            <span>{Math.round(progress)}% Abgeschlossen</span>
          </div>
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 transition-all duration-700 ease-in-out" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <button 
          onClick={() => setShowReference(!showReference)}
          className={`px-4 py-2.5 rounded-xl border-2 text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
            showReference 
              ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-100' 
              : 'bg-white border-slate-200 text-slate-500 hover:border-slate-400 hover:bg-slate-50'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {showReference ? 'Diagramm schließen' : 'DIN-Diagramm Hilfe'}
        </button>
      </div>

      {/* Collapsible Reference Image */}
      {showReference && (
        <div className="bg-white border-2 border-blue-100 rounded-3xl p-4 animate-in fade-in slide-in-from-top-4 shadow-xl shadow-blue-50">
          <div className="flex justify-between items-center mb-2 px-2">
             <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest">Live-Referenz: DIN 8580</span>
             <span className="text-[9px] text-slate-300 italic">Nutzen Sie das Diagramm zur Orientierung</span>
          </div>
          <img 
            src={OVERVIEW_IMAGE_PATH} 
            alt="DIN 8580 Referenz" 
            className="w-full h-auto max-h-[400px] object-contain rounded-2xl bg-white"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://placehold.co/800x600/ffffff/334155?text=Diagramm+lädt...";
            }}
          />
        </div>
      )}

      {/* Question Content */}
      <div className="space-y-10 py-4">
        <h3 className="text-2xl md:text-4xl font-black text-slate-800 leading-[1.1] tracking-tight">
          {question.text}
        </h3>

        <div className="grid grid-cols-1 gap-4">
          {question.type === QuestionType.MULTIPLE_CHOICE ? (
            question.options?.map((option, idx) => (
              <button
                key={option}
                onClick={() => handleSelect(option)}
                disabled={isAnswered}
                className={`w-full p-6 text-left border-2 rounded-[1.5rem] transition-all flex items-center group relative overflow-hidden ${
                  selectedAnswer === option
                    ? isAnswered
                      ? option === question.correctAnswer
                        ? 'bg-green-50 border-green-500 ring-4 ring-green-100'
                        : 'bg-red-50 border-red-500 ring-4 ring-red-100'
                      : 'border-blue-600 bg-blue-50 shadow-xl -translate-y-1'
                    : isAnswered && option === question.correctAnswer
                      ? 'bg-green-50 border-green-500'
                      : 'border-slate-100 hover:border-slate-300 bg-white'
                }`}
              >
                <span className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center mr-5 text-sm font-black transition-colors ${
                  selectedAnswer === option 
                    ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200' 
                    : 'bg-slate-50 border-slate-100 text-slate-400 group-hover:text-slate-600 group-hover:border-slate-300'
                }`}>
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className={`font-bold text-xl ${selectedAnswer === option ? 'text-blue-900' : 'text-slate-700'}`}>
                  {option}
                </span>
              </button>
            ))
          ) : (
            <div className="grid grid-cols-2 gap-6">
              {['true', 'false'].map((val) => (
                <button
                  key={val}
                  onClick={() => handleSelect(val)}
                  disabled={isAnswered}
                  className={`p-12 text-center border-2 rounded-[2rem] transition-all group ${
                    selectedAnswer === val
                      ? isAnswered
                        ? val === question.correctAnswer.toString()
                          ? 'bg-green-50 border-green-500 ring-4 ring-green-100'
                          : 'bg-red-50 border-red-500 ring-4 ring-red-100'
                        : 'border-blue-600 bg-blue-50 shadow-xl -translate-y-1'
                      : isAnswered && val === question.correctAnswer.toString()
                        ? 'bg-green-50 border-green-500'
                        : 'border-slate-100 hover:border-slate-300 bg-white'
                  }`}
                >
                  <span className={`text-2xl font-black uppercase tracking-[0.2em] ${selectedAnswer === val ? 'text-blue-700' : 'text-slate-400'}`}>
                    {val === 'true' ? 'Wahr' : 'Falsch'}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Feedback Section */}
        {isAnswered && (
          <div className={`p-10 rounded-[2.5rem] border-l-[12px] shadow-sm animate-in fade-in slide-in-from-top-6 ${
            selectedAnswer === question.correctAnswer.toString() 
              ? 'bg-green-50 border-green-500 text-green-950' 
              : 'bg-amber-50 border-amber-500 text-amber-950'
          }`}>
            <div className="flex items-start gap-6">
              <div className={`mt-1 flex-shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center font-black text-white text-lg shadow-md ${
                selectedAnswer === question.correctAnswer.toString() ? 'bg-green-500' : 'bg-amber-500'
              }`}>
                {selectedAnswer === question.correctAnswer.toString() ? '✓' : '!'}
              </div>
              <div className="space-y-3">
                <p className="font-black text-[11px] uppercase tracking-[0.3em] opacity-40">
                  {selectedAnswer === question.correctAnswer.toString() ? 'Ergebnis: Korrekt' : 'Lösung & Erklärung'}
                </p>
                <p className="text-xl leading-relaxed font-bold italic tracking-tight">
                  "{question.explanation}"
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="pt-10 flex justify-end">
          {!isAnswered ? (
            <button
              onClick={handleSubmit}
              disabled={!selectedAnswer}
              className={`px-20 py-6 rounded-2xl font-black uppercase tracking-[0.25em] text-white shadow-2xl transition-all active:scale-95 text-lg ${
                selectedAnswer 
                  ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-200' 
                  : 'bg-slate-100 cursor-not-allowed text-slate-300'
              }`}
            >
              Prüfen
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-20 py-6 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-[0.25em] hover:bg-black shadow-2xl active:scale-95 transition-all animate-in fade-in zoom-in-95 text-lg"
            >
              {currentIndex < questions.length - 1 ? 'Weiter' : 'Ergebnis'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentView;
