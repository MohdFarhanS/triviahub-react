import { useQuiz } from "./hooks/useQuiz";

import LoginPage from "./features/auth/LoginPage";
import QuizSetupPage from "./features/setup/QuizSetupPage";
import QuizPage from "./features/quiz/QuizPage";
import ResultPage from "./features/result/ResultPage";

export default function App() {
  const {
    user,
    page,
    questions,
    currentIndex,
    answers,
    timeLeft,
    loading,
    error,
    handleLogin,
    handleStartQuiz,
    handleAnswer,
    handleFinishQuiz,
    handleRestart,
    handleLogout,
  } = useQuiz();

  if (page === "login") {
    return <LoginPage onLogin={handleLogin} />;
  }

  if (page === "setup") {
    return (
      <QuizSetupPage
        user={user}
        onStartQuiz={handleStartQuiz}
        loading={loading}
        error={error}
        onLogout={handleLogout}
      />
    );
  }

  if (page === "playing") {
    return (
      <QuizPage
        user={user}
        questions={questions}
        currentIndex={currentIndex}
        answers={answers}
        timeLeft={timeLeft}
        onAnswer={handleAnswer}
        onFinishQuiz={handleFinishQuiz}
      />
    );
  }

  return (
    <ResultPage
      user={user}
      questions={questions}
      answers={answers}
      onRestart={handleRestart}
      onLogout={handleLogout}
    />
  );
}