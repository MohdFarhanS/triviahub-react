# Aplikasi Kuis ReactJS

## Deskripsi

Aplikasi Kuis adalah website berbasis ReactJS yang digunakan untuk mengerjakan soal kuis secara online menggunakan data dari Open Trivia Database (OpenTDB) API.

Pengguna dapat melakukan login, mengatur jumlah soal, memilih tipe soal, menentukan waktu pengerjaan, menjawab soal satu per satu, serta melihat hasil akhir setelah kuis selesai.

Aplikasi juga memiliki fitur penyimpanan progres menggunakan Local Storage sehingga pengguna dapat melanjutkan kuis apabila halaman browser direfresh atau ditutup secara tidak sengaja.

---

## Fitur

### 1. Login Pengguna

* Pengguna memasukkan nama sebelum memulai kuis.
* Nama pengguna disimpan ke Local Storage.

### 2. Pengaturan Kuis

* Menentukan jumlah soal.
* Menentukan tipe soal:

  * Multiple Choice
  * True / False
* Menentukan waktu pengerjaan (menit).

### 3. Pengambilan Soal dari API

* Data soal diambil dari OpenTDB API.
* Soal diambil secara dinamis sesuai konfigurasi pengguna.

### 4. Pengerjaan Kuis

* Satu halaman menampilkan satu soal.
* Setelah memilih jawaban, pengguna langsung diarahkan ke soal berikutnya.
* Menampilkan progress pengerjaan.
* Menampilkan timer.

### 5. Hasil Kuis

Menampilkan:

* Total soal.
* Jumlah soal yang dijawab.
* Jumlah jawaban benar.
* Jumlah jawaban salah.
* Jumlah soal yang belum dijawab.
* Detail jawaban pengguna.

### 6. Resume Kuis

* Progress kuis disimpan menggunakan Local Storage.
* Pengguna dapat melanjutkan kuis setelah browser direfresh.

---

## Teknologi yang Digunakan

### Frontend

* ReactJS
* Vite
* JavaScript (ES6+)
* CSS3

### API

* Open Trivia Database (OpenTDB)

URL API:

https://opentdb.com/api.php

---

## Struktur Folder

src/

├── App.jsx

├── App.css

├── main.jsx

├── constants/

│ └── storageKeys.js

├── utils/

│ ├── decodeHtml.js

│ ├── shuffleArray.js

│ ├── formatTime.js

│ └── getApiErrorMessage.js

├── services/

│ └── quizApi.js

├── hooks/

│ └── useQuiz.js

└── features/

├── auth/

│ └── LoginPage.jsx

├── setup/

│ └── QuizSetupPage.jsx

├── quiz/

│ ├── QuizPage.jsx

│ └── QuestionCard.jsx

└── result/

└── ResultPage.jsx

---

## Alur Sistem

1. Pengguna membuka aplikasi.
2. Pengguna melakukan login.
3. Pengguna mengatur konfigurasi kuis.
4. Sistem mengambil data soal dari OpenTDB.
5. Pengguna mengerjakan soal satu per satu.
6. Timer berjalan selama kuis berlangsung.
7. Jika semua soal selesai atau waktu habis:

   * Sistem menghitung hasil.
   * Sistem menampilkan halaman hasil.
8. Pengguna dapat memulai kuis baru atau logout.

---

## Cara Menjalankan Project

### Clone Repository

git clone <repository-url>

### Masuk ke Folder Project

cd quiz-react-opentdb

### Install Dependency

npm install

### Menjalankan Development Server

npm run dev

### Build Production

npm run build

---

## Penyimpanan Data

Aplikasi menggunakan Local Storage untuk menyimpan:

### User

quiz_user

### Progress Kuis

quiz_progress

Data yang disimpan:

* Soal kuis
* Nomor soal saat ini
* Jawaban pengguna
* Sisa waktu
* Status kuis

---

## Pengujian

### Login

* Nama kosong tidak dapat login.

### Pengaturan Kuis

* Jumlah soal minimal 1.
* Jumlah soal maksimal 50.
* Waktu minimal 1 menit.

### Pengerjaan Kuis

* Jawaban tersimpan dengan benar.
* Soal berpindah otomatis setelah memilih jawaban.

### Timer

* Timer berkurang setiap detik.
* Kuis selesai otomatis ketika waktu habis.

### Hasil Kuis

* Jumlah benar dihitung dengan benar.
* Jumlah salah dihitung dengan benar.
* Jumlah soal dijawab dihitung dengan benar.

### Resume Kuis

* Progress tetap tersedia setelah refresh halaman.

---

## Pengembang

Mohd. Farhan. S

Mahasiswa Teknik Informatika

Universitas Islam Riau
