# Quizly — Aplikasi Kuis Trivia

Aplikasi kuis trivia berbasis ReactJS yang mengambil soal secara langsung dari **Open Trivia Database (OpenTDB) API**. Pengguna dapat mengatur kategori, tingkat kesulitan, jumlah soal, dan batas waktu sebelum memulai kuis.

---

## Fitur

### 1. Login Pengguna
- Pengguna memasukkan nama sebelum memulai kuis.
- Nama disimpan ke `localStorage` (`quiz_user`).
- Jika ada sesi kuis yang tersimpan, pengguna langsung dilanjutkan ke sesi tersebut setelah login.

### 2. Konfigurasi Kuis
- **Kategori** — pilih dari semua kategori yang tersedia di OpenTDB, atau pilih "Any Category".
- **Tingkat Kesulitan** — Any / Easy / Medium / Hard.
- **Jumlah Soal** — 1–50 soal.
- **Tipe Soal** — Multiple Choice atau True / False.
- **Batas Waktu** — minimal 1 menit.

### 3. Pengambilan Soal dari API
- Soal diambil dari `https://opentdb.com/api.php` sesuai konfigurasi pengguna.
- HTML entities dalam teks soal dan jawaban di-decode secara otomatis.
- Urutan pilihan jawaban diacak setiap sesi.

### 4. Pengerjaan Kuis
- Satu halaman menampilkan satu soal (kategori dan tingkat kesulitan ditampilkan sebagai badge).
- Memilih jawaban langsung berpindah ke soal berikutnya.
- Soal dapat **di-skip** dan dikerjakan belakangan.
- **Question Navigator** — grid tombol bulat menampilkan status setiap soal:
  - Biru solid → sudah dijawab
  - Ring biru → soal aktif saat ini
  - Kuning → di-skip
  - Abu-abu → belum dijawab
- Klik tombol navigator untuk loncat ke soal yang belum dijawab.
- Progress bar menampilkan persentase soal yang sudah dijawab.
- Timer menghitung mundur; tampilan berubah merah ketika sisa waktu ≤ 60 detik.
- Tombol **Finish Quiz** tersedia kapan saja untuk mengakhiri kuis lebih awal.

### 5. Hasil Kuis
- Menampilkan persentase skor dengan badge: **Excellent** (≥80%), **Good Work** (≥60%), atau **Keep Going** (<60%).
- Ringkasan statistik: Total, Correct, Wrong, Skipped/Unanswered.
- Review semua jawaban: jawaban pengguna dibandingkan dengan jawaban yang benar.

### 6. Resume Kuis (Persistent Progress)
- Progress kuis disimpan ke `localStorage` (`quiz_progress`) setiap kali state berubah.
- Timer menggunakan timestamp absolut (`endTime`) sehingga tetap akurat walaupun halaman direfresh.
- Pengguna dapat melanjutkan kuis setelah browser ditutup atau direfresh.

---

## Teknologi

| Layer | Teknologi |
|---|---|
| UI Framework | React 19 |
| Build Tool | Vite 8 |
| Styling | Tailwind CSS v4 (via `@tailwindcss/vite`) |
| Language | JavaScript (ES6+) |
| External API | Open Trivia Database (OpenTDB) |
| Persistence | Browser localStorage |

---

## Struktur Folder

```
src/
├── main.jsx                    # Entry point
├── App.jsx                     # Root — page-switch berdasarkan state
├── App.css
│
├── constants/
│   └── storageKeys.js          # KEY: "quiz_user", "quiz_progress"
│
├── hooks/
│   └── useQuiz.js              # Seluruh state dan logika kuis
│
├── services/
│   └── quizApi.js              # fetchQuizQuestions(), fetchCategories()
│
├── utils/
│   ├── decodeHtml.js           # Decode HTML entities dari API
│   ├── shuffleArray.js         # Fisher-Yates (sederhana)
│   ├── formatTime.js           # Detik → "MM:SS"
│   └── getApiErrorMessage.js   # Terjemahan response_code OpenTDB
│
├── components/
│   └── QuestionNavigator.jsx   # Grid navigator status soal
│
└── features/
    ├── auth/
    │   └── LoginPage.jsx
    ├── setup/
    │   └── QuizSetupPage.jsx
    ├── quiz/
    │   ├── QuizPage.jsx
    │   └── QuestionCard.jsx
    └── result/
        └── ResultPage.jsx
```

---

## Alur Aplikasi

```
login → setup → playing → finished
                 ↑           |
                 └─ restart ─┘
```

1. Pengguna buka aplikasi → halaman **Login**.
2. Masukkan nama → halaman **Setup** (atau resume sesi aktif).
3. Konfigurasi kuis → klik "Start Quiz" → API dipanggil.
4. Halaman **Playing**: jawab soal satu per satu, skip, atau loncat via navigator.
5. Kuis selesai (semua soal terjawab / waktu habis / klik Finish Quiz) → halaman **Result**.
6. Klik "Start New Quiz" untuk kembali ke Setup, atau "Logout" untuk kembali ke Login.

---

## Local Storage

| Key | Isi |
|---|---|
| `quiz_user` | Nama pengguna (string) |
| `quiz_progress` | JSON: `page`, `questions`, `currentIndex`, `answers`, `skippedIndices`, `endTime`, `timeLeft` |

Data `quiz_progress` dihapus otomatis saat pengguna logout atau memulai kuis baru.

---

## OpenTDB API

| Endpoint | Kegunaan |
|---|---|
| `https://opentdb.com/api_category.php` | Daftar kategori |
| `https://opentdb.com/api.php?amount=N&type=T&...` | Soal kuis |

**Response codes:**

| Code | Keterangan |
|---|---|
| 0 | Berhasil |
| 1 | Soal tidak cukup — kurangi jumlah soal |
| 2 | Parameter tidak valid |
| 5 | Rate limit — tunggu ~5 detik lalu coba lagi |

---

## Cara Menjalankan

### Prasyarat
- Node.js ≥ 18

### Langkah

```bash
# Clone repository
git clone https://github.com/MohdFarhanS/triviahub-react.git
cd triviahub-react

# Install dependencies
npm install

# Jalankan development server
npm run dev
```

Buka `http://localhost:5173` di browser.

### Perintah Lain

```bash
npm run build    # Build production ke folder dist/
npm run preview  # Preview hasil build
npm run lint     # Jalankan ESLint
```

---

## Validasi Input

| Field | Aturan |
|---|---|
| Nama pengguna | Tidak boleh kosong |
| Jumlah soal | 1–50 |
| Batas waktu | Minimal 1 menit |

---

## Pengembang

**Mohd. Farhan. S**  
Mahasiswa Teknik Informatika — Universitas Islam Riau
