
import React, { useState } from 'react';
import { Question, QuestionType, QuizResult } from '../types';

interface StudentViewProps {
  questions: Question[];
  onFinish: (results: QuizResult[]) => void;
}

const StudentView: React.FC<StudentViewProps> = ({ questions, onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [results, setResults] = useState<QuizResult[]>([]);

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
    } else {
      onFinish([...results]);
    }
  };

  const progress = ((currentIndex) / questions.length) * 100;

  return (
    <div className="w-full space-y-8">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <span>FRAGE {currentIndex + 1} / {questions.length}</span>
          <span>{Math.round(progress)}% Fortschritt</span>
        </div>
        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-600 transition-all duration-500 ease-out" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Content */}
      <div className="space-y-8">
        <h3 className="text-xl md:text-3xl font-bold text-slate-800 leading-tight">
          {question.text}
        </h3>

        <div className="grid grid-cols-1 gap-4">
          {question.type === QuestionType.MULTIPLE_CHOICE ? (
            question.options?.map((option, idx) => (
              <button
                key={option}
                onClick={() => handleSelect(option)}
                disabled={isAnswered}
                className={`w-full p-5 text-left border-2 rounded-2xl transition-all flex items-center group ${
                  selectedAnswer === option
                    ? isAnswered
                      ? option === question.correctAnswer
                        ? 'bg-green-50 border-green-500 ring-4 ring-green-100'
                        : 'bg-red-50 border-red-500 ring-4 ring-red-100'
                      : 'border-blue-500 bg-blue-50 shadow-lg translate-x-1'
                    : isAnswered && option === question.correctAnswer
                      ? 'bg-green-50 border-green-500'
                      : 'border-slate-100 hover:border-slate-300 bg-white hover:bg-slate-50'
                }`}
              >
                <span className={`w-10 h-10 rounded-xl border flex items-center justify-center mr-4 text-sm font-black transition-colors ${
                  selectedAnswer === option 
                    ? 'bg-blue-600 border-blue-600 text-white' 
                    : 'bg-slate-50 border-slate-200 text-slate-400 group-hover:border-slate-400 group-hover:text-slate-600'
                }`}>
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className={`font-bold text-lg ${selectedAnswer === option ? 'text-blue-900' : 'text-slate-700'}`}>
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
                  className={`p-8 text-center border-2 rounded-2xl transition-all group ${
                    selectedAnswer === val
                      ? isAnswered
                        ? val === question.correctAnswer.toString()
                          ? 'bg-green-50 border-green-500 ring-4 ring-green-100'
                          : 'bg-red-50 border-red-500 ring-4 ring-red-100'
                        : 'border-blue-500 bg-blue-50 shadow-lg'
                      : isAnswered && val === question.correctAnswer.toString()
                        ? 'bg-green-50 border-green-500'
                        : 'border-slate-100 hover:border-slate-300 bg-white'
                  }`}
                >
                  <span className={`text-xl font-black uppercase tracking-widest ${selectedAnswer === val ? 'text-blue-700' : 'text-slate-600'}`}>
                    {val === 'true' ? 'Wahr' : 'Falsch'}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Feedback Section */}
        {isAnswered && (
          <div className={`p-8 rounded-3xl border-l-[6px] shadow-sm animate-in fade-in slide-in-from-top-4 ${
            selectedAnswer === question.correctAnswer.toString() 
              ? 'bg-green-50 border-green-500 text-green-950' 
              : 'bg-amber-50 border-amber-500 text-amber-950'
          }`}>
            <div className="flex items-start gap-4">
              <div className={`mt-1 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-black text-white ${
                selectedAnswer === question.correctAnswer.toString() ? 'bg-green-500' : 'bg-amber-500'
              }`}>
                {selectedAnswer === question.correctAnswer.toString() ? '✓' : '!'}
              </div>
              <div className="space-y-2">
                <p className="font-black text-xs uppercase tracking-[0.2em] opacity-60">
                  {selectedAnswer === question.correctAnswer.toString() ? 'Ergebnis: Korrekt' : 'Ergebnis: Falsch'}
                </p>
                <p className="text-lg leading-relaxed font-semibold">
                  {question.explanation}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="pt-4 flex justify-end">
          {!isAnswered ? (
            <button
              onClick={handleSubmit}
              disabled={!selectedAnswer}
              className={`px-14 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-white shadow-2xl transition-all active:scale-95 ${
                selectedAnswer 
                  ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-200' 
                  : 'bg-slate-200 cursor-not-allowed text-slate-400'
              }`}
            >
              Antwort prüfen
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-14 py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-black shadow-2xl active:scale-95 transition-all animate-in fade-in zoom-in-95"
            >
              {currentIndex < questions.length - 1 ? 'Nächste Frage' : 'Zum Ergebnis'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentView;
