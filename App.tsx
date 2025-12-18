
import React, { useState, useCallback } from 'react';
import { ViewState, QuizResult } from './types';
import { QUESTIONS } from './constants';
import StudentView from './components/StudentView';
import TeacherView from './components/TeacherView';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('START');
  const [currentResults, setCurrentResults] = useState<QuizResult[]>([]);
  
  const [allResults, setAllResults] = useState<QuizResult[]>(() => {
    const saved = localStorage.getItem('din8580_quiz_results');
    return saved ? JSON.parse(saved) : [];
  });

  const saveResults = useCallback((results: QuizResult[]) => {
    const updated = [...allResults, ...results];
    setAllResults(updated);
    localStorage.setItem('din8580_quiz_results', JSON.stringify(updated));
  }, [allResults]);

  const handleQuizFinish = (results: QuizResult[]) => {
    setCurrentResults(results);
    saveResults(results);
    setView('RESULT');
  };

  const resetQuiz = () => {
    setCurrentResults([]);
    setView('START');
  };

  const clearGlobalData = () => {
    if (confirm("Möchten Sie wirklich alle anonymen Statistiken löschen?")) {
      localStorage.removeItem('din8580_quiz_results');
      setAllResults([]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight sm:text-4xl">
          DIN 8580 Systematik
        </h1>
        <p className="text-slate-500 mt-2 font-medium">Interaktive Wissensaktivierung Fertigungstechnik</p>
      </header>

      <main className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 md:p-10 min-h-[500px] flex flex-col">
        {view === 'START' && (
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <h2 className="text-2xl font-bold text-slate-800">Grundlagen der Fertigungsverfahren</h2>
              <p className="text-slate-600">
                Bevor Sie mit dem Quiz beginnen, nutzen Sie die folgende Übersicht, um sich die sechs Hauptgruppen der DIN 8580 in Erinnerung zu rufen.
              </p>
            </div>

            {/* Übersichtsbild */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
              <div className="relative bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="bg-slate-50 border-b border-slate-100 px-4 py-2 flex justify-between items-center">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Referenz: DIN 8580 Strukturbaum</span>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                    <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                    <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                  </div>
                </div>
                <div className="p-2 md:p-4 bg-white flex justify-center">
                  <img 
                    src="overview.png" 
                    alt="Fertigungsverfahren nach DIN 8580 Übersicht" 
                    className="max-h-[400px] w-auto object-contain rounded-lg"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://placehold.co/800x600/ffffff/64748b?text=DIN+8580+Übersichtsdiagramm";
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <button 
                onClick={() => setView('QUIZ')}
                className="px-10 py-4 bg-blue-600 text-white font-black uppercase tracking-widest rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-95 flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                Quiz starten
              </button>
              <button 
                onClick={() => setView('TEACHER')}
                className="px-10 py-4 bg-slate-50 text-slate-700 font-bold uppercase tracking-widest text-sm rounded-xl hover:bg-slate-100 border border-slate-200 transition-all active:scale-95"
              >
                Lehrer-Dashboard
              </button>
            </div>
          </div>
        )}

        {view === 'QUIZ' && (
          <StudentView 
            questions={QUESTIONS} 
            onFinish={handleQuizFinish} 
          />
        )}

        {view === 'RESULT' && (
          <div className="text-center space-y-8 py-10">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-4 animate-bounce">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h2 className="text-3xl font-black text-slate-800">Ausgezeichnet!</h2>
              <p className="text-slate-500 mt-2">Sie haben das Quiz zur DIN 8580 abgeschlossen.</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-8 max-w-sm mx-auto border border-slate-100">
              <p className="text-5xl font-black text-blue-600">
                {currentResults.filter(r => r.isCorrect).length} <span className="text-2xl text-slate-300">/ {QUESTIONS.length}</span>
              </p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-4">Punkte erreicht</p>
            </div>
            <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={resetQuiz}
                className="px-8 py-4 bg-blue-600 text-white font-black uppercase tracking-widest rounded-xl hover:bg-blue-700 transition-all"
              >
                Neustart
              </button>
              <button 
                onClick={() => setView('TEACHER')}
                className="px-8 py-4 bg-slate-800 text-white font-black uppercase tracking-widest rounded-xl hover:bg-slate-900 transition-all"
              >
                Kurs-Schnitt
              </button>
            </div>
          </div>
        )}

        {view === 'TEACHER' && (
          <TeacherView 
            allResults={allResults} 
            questions={QUESTIONS} 
            onBack={() => setView('START')}
            onClear={clearGlobalData}
          />
        )}
      </main>

      <footer className="mt-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Live-Modus Aktiv</span>
        </div>
        <p className="text-slate-400 text-[10px] mt-4 uppercase tracking-[0.2em]">
          &copy; {new Date().getFullYear()} Didaktik-Framework &bull; DIN 8580 Modul
        </p>
      </footer>
    </div>
  );
};

export default App;
