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
    skippedIndices,
    timeLeft,
    loading,
    error,
    handleLogin,
    handleStartQuiz,
    handleAnswer,
    handleSkip,
    handleJumpTo,
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
        skippedIndices={skippedIndices}
        timeLeft={timeLeft}
        onAnswer={handleAnswer}
        onSkip={handleSkip}
        onJumpTo={handleJumpTo}
        onFinishQuiz={handleFinishQuiz}
      />
    );
  }

  return (
    <ResultPage
      user={user}
      questions={questions}
      answers={answers}
      skippedIndices={skippedIndices}
      onRestart={handleRestart}
      onLogout={handleLogout}
    />
  );
}
