import { useEffect, useMemo, useState } from 'react';
import { USER_KEY, QUIZ_KEY } from '../constants/storageKeys';
import { fetchQuizQuestions } from '../services/quizApi';

function getSavedQuiz() {
  const savedData = localStorage.getItem(QUIZ_KEY);
  if (!savedData) return null;
  try {
    return JSON.parse(savedData);
  } catch {
    localStorage.removeItem(QUIZ_KEY);
    return null;
  }
}

function findNextIndex(questions, currentIndex, answers, skippedIndices) {
  const total = questions.length;
  for (let i = 1; i <= total; i++) {
    const idx = (currentIndex + i) % total;
    if (!answers[idx] && !skippedIndices.includes(idx)) {
      return idx;
    }
  }
  return null;
}

export function useQuiz() {
  const savedQuiz = useMemo(() => getSavedQuiz(), []);

  const [user, setUser] = useState(() => localStorage.getItem(USER_KEY) || '');

  const [page, setPage] = useState(() => {
    const savedUser = localStorage.getItem(USER_KEY);
    if (!savedUser) return 'login';
    if (savedQuiz?.page === 'playing' || savedQuiz?.page === 'finished') {
      return savedQuiz.page;
    }
    return 'setup';
  });

  const [questions, setQuestions] = useState(() => savedQuiz?.questions || []);
  const [currentIndex, setCurrentIndex] = useState(() => savedQuiz?.currentIndex || 0);
  const [answers, setAnswers] = useState(() => savedQuiz?.answers || {});
  const [skippedIndices, setSkippedIndices] = useState(() => savedQuiz?.skippedIndices || []);
  const [endTime, setEndTime] = useState(() => savedQuiz?.endTime || null);
  const [timeLeft, setTimeLeft] = useState(() => savedQuiz?.timeLeft || 0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function handleLogin(name) {
    const cleanName = name.trim();
    localStorage.setItem(USER_KEY, cleanName);
    setUser(cleanName);

    const savedData = getSavedQuiz();
    if (savedData?.page === 'playing' || savedData?.page === 'finished') {
      setQuestions(savedData.questions || []);
      setCurrentIndex(savedData.currentIndex || 0);
      setAnswers(savedData.answers || {});
      setSkippedIndices(savedData.skippedIndices || []);
      setEndTime(savedData.endTime || null);
      setTimeLeft(savedData.timeLeft || 0);
      setPage(savedData.page);
    } else {
      setPage('setup');
    }
  }

  async function handleStartQuiz(config) {
    setLoading(true);
    setError('');
    try {
      const quizQuestions = await fetchQuizQuestions(config);
      const durationInSeconds = config.time * 60;
      const finishTime = Date.now() + durationInSeconds * 1000;

      setQuestions(quizQuestions);
      setCurrentIndex(0);
      setAnswers({});
      setSkippedIndices([]);
      setEndTime(finishTime);
      setTimeLeft(durationInSeconds);
      setPage('playing');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function handleAnswer(selectedAnswer) {
    const currentQuestion = questions[currentIndex];
    const answerData = {
      question: currentQuestion.question,
      selectedAnswer,
      correctAnswer: currentQuestion.correctAnswer,
      isCorrect: selectedAnswer === currentQuestion.correctAnswer,
    };

    const newAnswers = { ...answers, [currentIndex]: answerData };
    setAnswers(newAnswers);

    const nextIdx = findNextIndex(questions, currentIndex, newAnswers, skippedIndices);
    if (nextIdx === null) {
      setPage('finished');
    } else {
      setCurrentIndex(nextIdx);
    }
  }

  function handleSkip() {
    const newSkipped = [...skippedIndices, currentIndex];
    setSkippedIndices(newSkipped);

    const nextIdx = findNextIndex(questions, currentIndex, answers, newSkipped);
    if (nextIdx === null) {
      setPage('finished');
    } else {
      setCurrentIndex(nextIdx);
    }
  }

  function handleJumpTo(index) {
    if (answers[index]) return;
    setCurrentIndex(index);
  }

  function handleFinishQuiz() {
    setPage('finished');
  }

  function handleRestart() {
    localStorage.removeItem(QUIZ_KEY);
    setQuestions([]);
    setCurrentIndex(0);
    setAnswers({});
    setSkippedIndices([]);
    setEndTime(null);
    setTimeLeft(0);
    setError('');
    setPage('setup');
  }

  function handleLogout() {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(QUIZ_KEY);
    setUser('');
    setQuestions([]);
    setCurrentIndex(0);
    setAnswers({});
    setSkippedIndices([]);
    setEndTime(null);
    setTimeLeft(0);
    setError('');
    setPage('login');
  }

  useEffect(() => {
    if (page !== 'playing' || !endTime) return;

    function updateTimer() {
      const remaining = Math.max(0, Math.ceil((endTime - Date.now()) / 1000));
      setTimeLeft(remaining);
      if (remaining <= 0) setPage('finished');
    }

    updateTimer();
    const intervalId = setInterval(updateTimer, 1000);
    return () => clearInterval(intervalId);
  }, [page, endTime]);

  useEffect(() => {
    if (page === 'playing' || page === 'finished') {
      localStorage.setItem(
        QUIZ_KEY,
        JSON.stringify({
          page,
          questions,
          currentIndex,
          answers,
          skippedIndices,
          endTime,
          timeLeft,
        })
      );
    }
  }, [page, questions, currentIndex, answers, skippedIndices, endTime, timeLeft]);

  return {
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
  };
}
