const answerLabels = ["A", "B", "C", "D"];

export default function QuestionCard({ question, onAnswer }) {
  return (
    <div className="card question-card">
      <div className="question-meta">
        <span>{question.category}</span>
        <span>{question.difficulty}</span>
      </div>

      <h3>{question.question}</h3>

      <div className="answer-list">
        {question.answers.map((answer, index) => (
          <button
            key={index}
            className="answer-button"
            onClick={() => onAnswer(answer)}
          >
            <span className="answer-label">
              {answerLabels[index] || index + 1}.
            </span>
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
}