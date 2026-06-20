function getBadge(scorePercent) {
  if (scorePercent >= 80) return { label: 'Excellent', className: 'text-amber-500' };
  if (scorePercent >= 60) return { label: 'Good Work', className: 'text-blue-700' };
  return { label: 'Keep Going', className: 'text-zinc-500' };
}

export default function ResultPage({ user, questions, answers, skippedIndices, onRestart, onLogout }) {
  const totalQuestions = questions.length;
  const answeredList = Object.values(answers);
  const correctCount = answeredList.filter((a) => a.isCorrect).length;
  const wrongCount = answeredList.filter((a) => !a.isCorrect).length;
  const skippedCount = skippedIndices.length;
  const unansweredCount = totalQuestions - answeredList.length - skippedCount;

  const scorePercent = totalQuestions > 0
    ? Math.round((correctCount / totalQuestions) * 100)
    : 0;

  const badge = getBadge(scorePercent);

  const answerEntries = Object.entries(answers)
    .map(([idx, data]) => ({ index: Number(idx), ...data }))
    .sort((a, b) => a.index - b.index);

  return (
    <div className="min-h-screen bg-white px-4 py-16">
      <div className="max-w-3xl mx-auto">

        <div className="flex items-center justify-between mb-8">
          <span className="text-lg font-semibold tracking-tight text-zinc-950">Quizly</span>
          <span className="text-sm text-zinc-400">
            {user} ·{' '}
            <button
              onClick={onLogout}
              className="text-zinc-400 hover:text-zinc-700 underline underline-offset-2 transition-colors bg-transparent p-0 font-normal"
            >
              Logout
            </button>
          </span>
        </div>

        <hr className="border-zinc-200 mb-8" />

        <div className="mb-8">
          <p className="text-xs font-medium text-zinc-500 uppercase tracking-widest mb-2">
            Your Score
          </p>
          <div className="flex items-baseline gap-4">
            <span className="text-6xl font-bold tracking-tight text-zinc-950">
              {scorePercent}%
            </span>
            <span className={`text-xl font-semibold ${badge.className}`}>
              {badge.label}
            </span>
          </div>
        </div>

        <hr className="border-zinc-200 mb-8" />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-zinc-200 border border-zinc-200 rounded-lg overflow-hidden mb-8">
          {[
            { label: 'Total', value: totalQuestions, className: 'text-zinc-950' },
            { label: 'Correct', value: correctCount, className: 'text-green-700' },
            { label: 'Wrong', value: wrongCount, className: 'text-red-600' },
            { label: 'Skipped', value: skippedCount + unansweredCount, className: 'text-amber-500' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white px-5 py-4">
              <p className="text-xs font-medium text-zinc-500 uppercase tracking-widest mb-1">
                {stat.label}
              </p>
              <p className={`text-3xl font-bold ${stat.className}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        <hr className="border-zinc-200 mb-8" />

        <h3 className="text-xs font-medium text-zinc-500 uppercase tracking-widest mb-6">
          Answer Review
        </h3>

        {answerEntries.length === 0 ? (
          <p className="text-sm text-zinc-400">No questions were answered.</p>
        ) : (
          <div>
            {answerEntries.map((item, i) => (
              <div key={item.index}>
                <div className="py-4">
                  <p className="text-sm font-semibold text-zinc-950 mb-2">
                    {item.index + 1}. {item.question}
                  </p>
                  <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
                    <span className="text-zinc-500">
                      Your answer:{' '}
                      <span className={item.isCorrect ? 'text-green-700 font-medium' : 'text-red-600 font-medium'}>
                        {item.selectedAnswer}
                      </span>
                      {item.isCorrect ? ' ✓' : ' ✗'}
                    </span>
                    {!item.isCorrect && (
                      <span className="text-zinc-500">
                        Correct: <span className="text-green-700 font-medium">{item.correctAnswer}</span>
                      </span>
                    )}
                  </div>
                </div>
                {i < answerEntries.length - 1 && <hr className="border-zinc-100" />}
              </div>
            ))}
          </div>
        )}

        <hr className="border-zinc-200 mt-8 mb-6" />

        <div className="flex items-center gap-4">
          <button
            onClick={onRestart}
            className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold rounded-lg transition-colors"
          >
            Start New Quiz
          </button>
          <button
            onClick={onLogout}
            className="text-sm text-zinc-400 hover:text-zinc-700 transition-colors bg-transparent p-0 font-normal"
          >
            Logout
          </button>
        </div>

      </div>
    </div>
  );
}
