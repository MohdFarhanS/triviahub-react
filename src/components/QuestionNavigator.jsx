export default function QuestionNavigator({
  questions,
  currentIndex,
  answers,
  skippedIndices,
  onJumpTo,
}) {
  return (
    <div className="flex flex-wrap gap-2 my-4">
      {questions.map((_, index) => {
        const isAnswered = !!answers[index];
        const isCurrent = index === currentIndex;
        const isSkipped = skippedIndices.includes(index);

        let className =
          'w-7 h-7 rounded-full text-xs font-semibold flex items-center justify-center transition-colors ';

        if (isAnswered) {
          className += 'bg-blue-700 text-white cursor-default';
        } else if (isCurrent) {
          className += 'ring-2 ring-blue-700 text-blue-700 bg-white cursor-default';
        } else if (isSkipped) {
          className += 'bg-amber-400 text-white cursor-pointer hover:bg-amber-500';
        } else {
          className += 'bg-zinc-200 text-zinc-500 cursor-pointer hover:bg-zinc-300';
        }

        return (
          <button
            key={index}
            className={className}
            onClick={() => !isAnswered && onJumpTo(index)}
            disabled={isAnswered}
            aria-label={`Question ${index + 1}`}
            title={
              isAnswered
                ? 'Answered'
                : isSkipped
                ? 'Skipped'
                : isCurrent
                ? 'Current'
                : 'Go to question'
            }
          >
            {index + 1}
          </button>
        );
      })}
    </div>
  );
}
