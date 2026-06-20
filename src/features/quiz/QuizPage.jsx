import QuestionCard from './QuestionCard';
import QuestionNavigator from '../../components/QuestionNavigator';
import { formatTime } from '../../utils/formatTime';

export default function QuizPage({
  user,
  questions,
  currentIndex,
  answers,
  skippedIndices,
  timeLeft,
  onAnswer,
  onSkip,
  onJumpTo,
  onFinishQuiz,
}) {
  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(answers).length;
  const progressPercent = totalQuestions > 0 ? (answeredCount / totalQuestions) * 100 : 0;
  const isUrgent = timeLeft <= 60 && timeLeft > 0;

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="text-center">
          <p className="text-sm text-zinc-500 mb-4">No question found.</p>
          <button
            onClick={onFinishQuiz}
            className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold rounded-lg transition-colors"
          >
            View Results
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-4 py-16">
      <div className="max-w-3xl mx-auto">

        <div className="flex items-center justify-between mb-8">
          <span className="text-lg font-semibold tracking-tight text-zinc-950">Quizly</span>
          <div className="flex items-center gap-6">
            <span className="text-sm text-zinc-400">{user}</span>
            <span
              className={`text-sm font-semibold tabular-nums ${
                isUrgent ? 'text-red-600' : 'text-zinc-700'
              }`}
            >
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        <hr className="border-zinc-200 mb-6" />

        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-zinc-500 uppercase tracking-widest">
            Question {currentIndex + 1} of {totalQuestions}
          </span>
          <span className="text-xs text-zinc-400">
            {answeredCount} answered
          </span>
        </div>

        <div className="w-full h-1 bg-zinc-100 rounded-full mb-2 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${progressPercent}%`,
              backgroundColor: progressPercent >= 100 ? '#F59E0B' : '#1D4ED8',
            }}
          />
        </div>

        <QuestionNavigator
          questions={questions}
          currentIndex={currentIndex}
          answers={answers}
          skippedIndices={skippedIndices}
          onJumpTo={onJumpTo}
        />

        <hr className="border-zinc-200 mb-8" />

        <QuestionCard question={currentQuestion} onAnswer={onAnswer} />

        <hr className="border-zinc-200 mt-8 mb-6" />

        <div className="flex items-center justify-between">
          <button
            onClick={onSkip}
            className="text-sm text-zinc-400 hover:text-zinc-700 underline underline-offset-2 transition-colors bg-transparent p-0 font-normal"
          >
            Skip question →
          </button>
          <button
            onClick={onFinishQuiz}
            className="px-4 py-2 border border-zinc-200 hover:border-zinc-400 text-sm font-medium text-zinc-600 rounded-lg transition-colors bg-transparent"
          >
            Finish Quiz
          </button>
        </div>

      </div>
    </div>
  );
}
