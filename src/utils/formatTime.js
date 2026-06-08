export function formatTime(seconds) {
    const minute = Math.floor(seconds / 60);
    const second = seconds % 60;
  
    return `${String(minute).padStart(2, "0")}:${String(second).padStart(2, "0")}`;
  }