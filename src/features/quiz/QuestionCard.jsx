const answerLabels = ['A', 'B', 'C', 'D'];

export default function QuestionCard({ question, onAnswer }) {
  return (
    <div>
      <div className="flex gap-2 mb-5">
        <span className="text-xs bg-zinc-100 text-zinc-600 px-2.5 py-1 rounded-full font-medium">
          {question.category}
        </span>
        <span className="text-xs bg-zinc-100 text-zinc-600 px-2.5 py-1 rounded-full font-medium capitalize">
          {question.difficulty}
        </span>
      </div>

      <h3 className="text-xl font-semibold text-zinc-950 leading-snug mb-6">
        {question.question}
      </h3>

      <div className="space-y-3">
        {question.answers.map((answer, index) => (
          <button
            key={index}
            onClick={() => onAnswer(answer)}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-left border border-zinc-200 rounded-lg bg-white hover:border-blue-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
          >
            <span className="text-xs font-bold text-zinc-400 w-4 shrink-0">
              {answerLabels[index] || index + 1}.
            </span>
            <span>{answer}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
