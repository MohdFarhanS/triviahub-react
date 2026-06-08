export default function ResultPage({
    user,
    questions,
    answers,
    onRestart,
    onLogout,
  }) {
    const totalQuestions = questions.length;
    const answeredCount = answers.length;
  
    const correctCount = answers.filter((answer) => answer.isCorrect).length;
    const wrongCount = answers.filter((answer) => !answer.isCorrect).length;
    const unansweredCount = totalQuestions - answeredCount;
  
    return (
      <div className="container">
        <div className="topbar">
          <div>
            <h2>Hasil Kuis</h2>
            <p className="muted">Peserta: {user}</p>
          </div>
  
          <button className="secondary-button" onClick={onLogout}>
            Logout
          </button>
        </div>
  
        <div className="result-grid">
          <div className="result-box">
            <span>Total Soal</span>
            <strong>{totalQuestions}</strong>
          </div>
  
          <div className="result-box">
            <span>Jumlah Dijawab</span>
            <strong>{answeredCount}</strong>
          </div>
  
          <div className="result-box correct">
            <span>Benar</span>
            <strong>{correctCount}</strong>
          </div>
  
          <div className="result-box wrong">
            <span>Salah</span>
            <strong>{wrongCount}</strong>
          </div>
  
          <div className="result-box">
            <span>Belum Dijawab</span>
            <strong>{unansweredCount}</strong>
          </div>
        </div>
  
        <div className="card">
          <h3>Detail Jawaban</h3>
  
          {answers.length === 0 ? (
            <p className="muted">Belum ada soal yang dijawab.</p>
          ) : (
            <div className="review-list">
              {answers.map((item, index) => (
                <div className="review-item" key={index}>
                  <p>
                    <strong>
                      {index + 1}. {item.question}
                    </strong>
                  </p>
  
                  <p>Jawaban kamu: {item.selectedAnswer}</p>
                  <p>Jawaban benar: {item.correctAnswer}</p>
  
                  <p className={item.isCorrect ? "text-correct" : "text-wrong"}>
                    {item.isCorrect ? "Benar" : "Salah"}
                  </p>
                </div>
              ))}
            </div>
          )}
  
          <button onClick={onRestart}>Mulai Kuis Baru</button>
        </div>
      </div>
    );
  }