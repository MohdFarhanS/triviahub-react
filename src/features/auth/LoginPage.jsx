import { useState } from "react";

export default function LoginPage({ onLogin }) {
  const [name, setName] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (name.trim() === "") {
      alert("Nama tidak boleh kosong.");
      return;
    }

    onLogin(name);
  }

  return (
    <div className="page-center">
      <div className="card login-card">
        <h1>Quiz Portal</h1>
        <p className="muted">
          Masukkan nama terlebih dahulu untuk memulai kuis.
        </p>

        <form onSubmit={handleSubmit}>
          <label>Nama Pengguna</label>
          <input
            type="text"
            placeholder="Contoh: Farhan"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <button type="submit" style={{ marginTop: "18px", width: "100%" }}>
            Enter System
          </button>
        </form>
      </div>
    </div>
  );
}