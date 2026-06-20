import { decodeHtml } from '../utils/decodeHtml';
import { shuffleArray } from '../utils/shuffleArray';
import { getApiErrorMessage } from '../utils/getApiErrorMessage';

export async function fetchCategories() {
  const response = await fetch('https://opentdb.com/api_category.php');
  const data = await response.json();
  return data.trivia_categories;
}

export async function fetchQuizQuestions(config) {
  const params = new URLSearchParams();
  params.append('amount', config.amount);
  params.append('type', config.type);

  if (config.category && config.category !== '0') {
    params.append('category', config.category);
  }

  if (config.difficulty) {
    params.append('difficulty', config.difficulty);
  }

  const response = await fetch(
    `https://opentdb.com/api.php?${params.toString()}`
  );

  const data = await response.json();

  if (data.response_code !== 0) {
    throw new Error(getApiErrorMessage(data.response_code));
  }

  return data.results.map((item, index) => {
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
}
