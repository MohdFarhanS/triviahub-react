import { useState } from "react";

export default function QuizSetupPage({
  user,
  onStartQuiz,
  loading,
  error,
  onLogout,
}) {
  const [amount, setAmount] = useState(10);
  const [type, setType] = useState("multiple");
  const [time, setTime] = useState(5);

  function handleSubmit(event) {
    event.preventDefault();

    if (amount < 1 || amount > 50) {
      alert("Jumlah soal harus antara 1 sampai 50.");
      return;
    }

    if (time < 1) {
      alert("Waktu pengerjaan minimal 1 menit.");
      return;
    }

    onStartQuiz({
      amount: Number(amount),
      type,
      time: Number(time),
    });
  }

  return (
    <div className="container">
      <div className="topbar">
        <div>
          <h2>Pengaturan Kuis</h2>
          <p className="muted">Login sebagai: {user}</p>
        </div>

        <button className="secondary-button" onClick={onLogout}>
          Logout
        </button>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit} className="setup-form">
          <div>
            <label>Jumlah Soal</label>
            <input
              type="number"
              min="1"
              max="50"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
            />
            <small>Maksimal 50 soal.</small>
          </div>

          <div>
            <label>Tipe Soal</label>
            <select
              value={type}
              onChange={(event) => setType(event.target.value)}
            >
              <option value="multiple">Multiple Choice</option>
              <option value="boolean">True / False</option>
            </select>
          </div>

          <div>
            <label>Waktu Pengerjaan</label>
            <input
              type="number"
              min="1"
              value={time}
              onChange={(event) => setTime(event.target.value)}
            />
            <small>Waktu dalam menit.</small>
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Mengambil soal..." : "Mulai Kuis"}
          </button>
        </form>
      </div>
    </div>
  );
}