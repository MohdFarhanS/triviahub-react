import { useState } from 'react';

export default function LoginPage({ onLogin }) {
  const [name, setName] = useState('');
  const [err, setErr] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    if (name.trim() === '') {
      setErr('Name cannot be empty.');
      return;
    }
    setErr('');
    onLogin(name);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-white">
      <div className="w-full max-w-sm">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-950">
            Quizly
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            Test your knowledge. One question at a time.
          </p>
        </div>

        <hr className="border-zinc-200 mb-8" />

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-medium text-zinc-500 uppercase tracking-widest mb-2">
              Your Name
            </label>
            <input
              type="text"
              placeholder="e.g. Farhan"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2.5 text-sm border border-zinc-200 rounded-lg bg-white text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:border-blue-700 transition-colors"
            />
            {err && <p className="mt-1.5 text-xs text-red-600">{err}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold rounded-lg transition-colors"
          >
            Enter Quiz →
          </button>
        </form>
      </div>
    </div>
  );
}
