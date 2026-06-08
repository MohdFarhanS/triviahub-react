export function getApiErrorMessage(code) {
    switch (code) {
      case 1:
        return "Soal tidak cukup untuk pilihan tersebut. Coba kurangi jumlah soal.";
      case 2:
        return "Parameter API tidak valid.";
      case 5:
        return "Terlalu banyak request. Tunggu sekitar 5 detik lalu coba lagi.";
      default:
        return "Gagal mengambil soal dari API.";
    }
  }