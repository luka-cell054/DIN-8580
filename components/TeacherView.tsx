
import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Question, QuizResult } from '../types';

interface TeacherViewProps {
  allResults: QuizResult[];
  questions: Question[];
  onBack: () => void;
  onClear: () => void;
}

const TeacherView: React.FC<TeacherViewProps> = ({ allResults, questions, onBack, onClear }) => {
  const stats = useMemo(() => {
    return questions.map(q => {
      const qResults = allResults.filter(r => r.questionId === q.id);
      const correctCount = qResults.filter(r => r.isCorrect).length;
      const totalCount = qResults.length;
      const percentage = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0;
      
      return {
        id: `Q${q.id}`,
        fullId: q.id,
        correct: correctCount,
        wrong: totalCount - correctCount,
        total: totalCount,
        percentage
      };
    });
  }, [allResults, questions]);

  const totalParticipants = Math.round(allResults.length / questions.length);

  return (
    <div className="w-full space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Ergebnisanalyse</h2>
          <p className="text-sm text-slate-500">
            Anonymisierte Auswertung von ca. {totalParticipants} Teilnahmen
          </p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={onClear}
            className="px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-100"
          >
            Statistiken zurücksetzen
          </button>
          <button 
            onClick={onBack}
            className="px-4 py-2 bg-slate-800 text-white text-sm font-semibold rounded-lg hover:bg-slate-900 transition-colors"
          >
            Zurück
          </button>
        </div>
      </div>

      {allResults.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 rounded-xl border border-dashed border-slate-300">
          <p className="text-slate-500">Bisher wurden keine Quiz-Ergebnisse aufgezeichnet.</p>
        </div>
      ) : (
        <div className="space-y-10">
          {/* Summary Chart */}
          <div className="bg-slate-50 p-6 rounded-xl">
            <h3 className="text-sm font-bold text-slate-500 uppercase mb-6 text-center">Erfolgsquote pro Frage (%)</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="id" axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
                  <Tooltip 
                    cursor={{fill: '#f1f5f9'}}
                    contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
                    formatter={(value: number) => [`${value}% Erfolgsquote`, '']}
                  />
                  <Bar dataKey="percentage" radius={[6, 6, 0, 0]}>
                    {stats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.percentage > 70 ? '#10b981' : entry.percentage > 40 ? '#3b82f6' : '#f59e0b'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Detailed Table */}
          <div className="overflow-x-auto border border-slate-100 rounded-xl shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Frage</th>
                  <th className="px-6 py-4">Thema</th>
                  <th className="px-6 py-4 text-center">Teilnahmen</th>
                  <th className="px-6 py-4 text-center">Richtig</th>
                  <th className="px-6 py-4 text-center">Falsch</th>
                  <th className="px-6 py-4 text-right">Quote</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {stats.map((stat, idx) => {
                  const q = questions.find(q => q.id === stat.fullId);
                  return (
                    <tr key={stat.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-400">{stat.id}</td>
                      <td className="px-6 py-4 max-w-xs truncate font-medium text-slate-700">{q?.text}</td>
                      <td className="px-6 py-4 text-center text-slate-600">{stat.total}</td>
                      <td className="px-6 py-4 text-center text-green-600 font-semibold">{stat.correct}</td>
                      <td className="px-6 py-4 text-center text-red-500">{stat.wrong}</td>
                      <td className="px-6 py-4 text-right">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                          stat.percentage > 70 ? 'bg-green-100 text-green-700' :
                          stat.percentage > 40 ? 'bg-blue-100 text-blue-700' :
                          'bg-amber-100 text-amber-700'
                        }`}>
                          {stat.percentage}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherView;
