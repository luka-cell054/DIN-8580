
import React, { useState, useCallback } from 'react';
import { ViewState, QuizResult } from './types';
import { QUESTIONS, OVERVIEW_IMAGE_PATH } from './constants';
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
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 min-h-screen flex flex-col">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-black text-slate-800 tracking-tight sm:text-5xl uppercase">
          DIN 8580 <span className="text-blue-600">Quiz</span>
        </h1>
        <p className="text-slate-500 mt-3 font-bold uppercase tracking-[0.2em] text-xs">Fertigungsverfahren Systematik</p>
      </header>

      <main className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100 p-6 md:p-12 flex-grow flex flex-col">
        {view === 'START' && (
          <div className="space-y-10 flex-grow flex flex-col">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <h2 className="text-2xl font-black text-slate-800">Interaktive Wissensaktivierung</h2>
              <p className="text-slate-600 font-medium">
                Studieren Sie das untenstehende Diagramm der DIN 8580. Es dient als Grundlage für die folgenden 10 Fragen.
              </p>
            </div>

            {/* Zentrales Übersichtsbild */}
            <div className="relative bg-slate-50 border-2 border-slate-100 rounded-3xl overflow-hidden shadow-inner group">
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-full text-[10px] font-black text-slate-500 uppercase tracking-widest shadow-sm">
                  Referenz: Hauptgruppen
                </span>
              </div>
              <div className="p-4 md:p-8 bg-white flex justify-center items-center min-h-[300px]">
                <img 
                  src={OVERVIEW_IMAGE_PATH} 
                  alt="Fertigungsverfahren nach DIN 8580" 
                  className="max-h-[550px] w-full object-contain transition-transform duration-700 group-hover:scale-[1.01]"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://placehold.co/1200x1600/ffffff/334155?text=Diagramm+wird+geladen...";
                    // Trigger a retry after a short delay if it's a transient loading issue
                    setTimeout(() => {
                        const target = e.target as HTMLImageElement;
                        if (target.src.includes('placehold.co')) {
                           target.src = OVERVIEW_IMAGE_PATH + '?t=' + Date.now();
                        }
                    }, 2000);
                  }}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <button 
                onClick={() => setView('QUIZ')}
                className="px-14 py-6 bg-blue-600 text-white font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-blue-700 transition-all shadow-2xl shadow-blue-200 active:scale-95 flex items-center justify-center gap-4 text-lg"
              >
                <span>Jetzt Starten</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              <button 
                onClick={() => setView('TEACHER')}
                className="px-14 py-6 bg-slate-100 text-slate-600 font-black uppercase tracking-[0.2em] text-xs rounded-2xl hover:bg-slate-200 transition-all active:scale-95"
              >
                Statistik
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
          <div className="text-center space-y-10 py-10 flex-grow flex flex-col justify-center">
            <div className="space-y-4">
              <div className="inline-flex items-center justify-center w-28 h-28 bg-blue-50 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-4xl font-black text-slate-800 uppercase tracking-tight">Fertig!</h2>
              <p className="text-slate-500 font-medium">Sie haben die Systematik der DIN 8580 erfolgreich bearbeitet.</p>
            </div>

            <div className="bg-slate-50 rounded-[2rem] p-12 max-w-sm mx-auto border border-slate-100 shadow-inner relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <svg className="w-24 h-24" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                </div>
              <p className="text-7xl font-black text-blue-600 leading-none">
                {currentResults.filter(r => r.isCorrect).length}
                <span className="text-3xl text-slate-300 mx-2">/</span>
                <span className="text-4xl text-slate-400 font-bold">{QUESTIONS.length}</span>
              </p>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mt-8">Ihr Ergebnis</p>
            </div>

            <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={resetQuiz}
                className="px-12 py-5 bg-blue-600 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 active:scale-95"
              >
                Erneut Versuchen
              </button>
              <button 
                onClick={() => setView('TEACHER')}
                className="px-12 py-5 bg-slate-900 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-black transition-all active:scale-95"
              >
                Kurs-Schnitt ansehen
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

      <footer className="mt-12 text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] pb-8">
        Maschinenbau &bull; Didaktik &bull; {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default App;
