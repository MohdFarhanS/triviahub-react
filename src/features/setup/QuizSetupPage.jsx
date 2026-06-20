import { useEffect, useState } from 'react';
import { fetchCategories } from '../../services/quizApi';

const DIFFICULTIES = [
  { value: '', label: 'Any' },
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
];

export default function QuizSetupPage({ user, onStartQuiz, loading, error, onLogout }) {
  const [amount, setAmount] = useState(10);
  const [type, setType] = useState('multiple');
  const [time, setTime] = useState(5);
  const [category, setCategory] = useState('0');
  const [difficulty, setDifficulty] = useState('');
  const [categories, setCategories] = useState([]);
  const [catLoading, setCatLoading] = useState(true);
  const [formErr, setFormErr] = useState('');

  useEffect(() => {
    fetchCategories()
      .then((cats) => setCategories(cats))
      .catch(() => setCategories([]))
      .finally(() => setCatLoading(false));
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    if (amount < 1 || amount > 50) {
      setFormErr('Number of questions must be between 1 and 50.');
      return;
    }
    if (time < 1) {
      setFormErr('Time limit must be at least 1 minute.');
      return;
    }
    setFormErr('');
    onStartQuiz({ amount: Number(amount), type, time: Number(time), category, difficulty });
  }

  return (
    <div className="min-h-screen bg-white px-4 py-16">
      <div className="max-w-lg mx-auto">

        <div className="flex items-center justify-between mb-8">
          <span className="text-lg font-semibold tracking-tight text-zinc-950">Quizly</span>
          <span className="text-sm text-zinc-400">
            Hi, {user} ·{' '}
            <button
              onClick={onLogout}
              className="text-zinc-400 hover:text-zinc-700 underline underline-offset-2 transition-colors bg-transparent p-0 font-normal"
            >
              Logout
            </button>
          </span>
        </div>

        <hr className="border-zinc-200 mb-8" />

        <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 mb-1">
          Configure your quiz
        </h2>
        <p className="text-sm text-zinc-500 mb-8">
          Set up your preferences before starting.
        </p>

        <form onSubmit={handleSubmit} className="space-y-0">

          <div className="py-6">
            <label className="block text-xs font-medium text-zinc-500 uppercase tracking-widest mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              disabled={catLoading}
              className="w-full px-3 py-2.5 text-sm border border-zinc-200 rounded-lg bg-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700 transition-colors disabled:text-zinc-400"
            >
              <option value="0">Any Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <hr className="border-zinc-200" />

          <div className="py-6">
            <label className="block text-xs font-medium text-zinc-500 uppercase tracking-widest mb-3">
              Difficulty
            </label>
            <div className="flex gap-2">
              {DIFFICULTIES.map((d) => (
                <button
                  key={d.value}
                  type="button"
                  onClick={() => setDifficulty(d.value)}
                  className={`px-4 py-1.5 text-sm rounded-full border font-medium transition-colors ${
                    difficulty === d.value
                      ? 'bg-blue-700 border-blue-700 text-white'
                      : 'bg-white border-zinc-200 text-zinc-600 hover:border-zinc-400'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          <hr className="border-zinc-200" />

          <div className="py-6">
            <label className="block text-xs font-medium text-zinc-500 uppercase tracking-widest mb-2">
              Number of Questions
            </label>
            <input
              type="number"
              min="1"
              max="50"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2.5 text-sm border border-zinc-200 rounded-lg bg-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700 transition-colors"
            />
            <p className="mt-1.5 text-xs text-zinc-400">Maximum 50 questions.</p>
          </div>

          <hr className="border-zinc-200" />

          <div className="py-6">
            <label className="block text-xs font-medium text-zinc-500 uppercase tracking-widest mb-2">
              Question Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-3 py-2.5 text-sm border border-zinc-200 rounded-lg bg-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700 transition-colors"
            >
              <option value="multiple">Multiple Choice</option>
              <option value="boolean">True / False</option>
            </select>
          </div>

          <hr className="border-zinc-200" />

          <div className="py-6">
            <label className="block text-xs font-medium text-zinc-500 uppercase tracking-widest mb-2">
              Time Limit (minutes)
            </label>
            <input
              type="number"
              min="1"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-3 py-2.5 text-sm border border-zinc-200 rounded-lg bg-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700 transition-colors"
            />
          </div>

          <hr className="border-zinc-200" />

          {(formErr || error) && (
            <p className="pt-4 text-sm text-red-600">{formErr || error}</p>
          )}

          <div className="pt-6">
            <button
              type="submit"
              disabled={loading || catLoading}
              className="w-full py-2.5 px-4 bg-blue-700 hover:bg-blue-800 disabled:bg-zinc-200 disabled:text-zinc-400 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              {loading ? 'Loading questions...' : 'Start Quiz →'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
