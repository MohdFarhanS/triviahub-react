import QuestionCard from "./QuestionCard";
import { formatTime } from "../../utils/formatTime";

export default function QuizPage({
  user,
  questions,
  currentIndex,
  answers,
  timeLeft,
  onAnswer,
  onFinishQuiz,
}) {
  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const answeredCount = answers.length;
  const progressPercent =
    totalQuestions > 0 ? ((currentIndex + 1) / totalQuestions) * 100 : 0;

  if (!currentQuestion) {
    return (
      <div className="page-center">
        <div className="card">
          <p>Soal tidak ditemukan.</p>
          <button onClick={onFinishQuiz}>Lihat Hasil</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="quiz-header">
        <div>
          <h2>Kuis Berlangsung</h2>
          <p className="muted">Peserta: {user}</p>
        </div>

        <div className="timer-box">
          <span>Timer</span>
          <strong>{formatTime(timeLeft)}</strong>
        </div>
      </div>

      <div className="progress-info">
        <p>
          Soal {currentIndex + 1} dari {totalQuestions}
        </p>
        <p>
          Dikerjakan: {answeredCount} / {totalQuestions}
        </p>
      </div>

      <div className="progress-bar-wrapper">
        <div
          className="progress-bar-fill"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <QuestionCard question={currentQuestion} onAnswer={onAnswer} />
    </div>
  );
}