import { decodeHtml } from "../utils/decodeHtml";
import { shuffleArray } from "../utils/shuffleArray";
import { getApiErrorMessage } from "../utils/getApiErrorMessage";

export async function fetchQuizQuestions(config) {
  const params = new URLSearchParams();

  params.append("amount", config.amount);
  params.append("type", config.type);

  const response = await fetch(
    `https://opentdb.com/api.php?${params.toString()}`
  );

  const data = await response.json();

  if (data.response_code !== 0) {
    throw new Error(getApiErrorMessage(data.response_code));
  }

  const formattedQuestions = data.results.map((item, index) => {
    const correctAnswer = decodeHtml(item.correct_answer);

    const answers = shuffleArray([
      item.correct_answer,
      ...item.incorrect_answers,
    ]).map((answer) => decodeHtml(answer));

    return {
      id: index + 1,
      category: decodeHtml(item.category),
      difficulty: item.difficulty,
      question: decodeHtml(item.question),
      correctAnswer,
      answers,
    };
  });

  return formattedQuestions;
}