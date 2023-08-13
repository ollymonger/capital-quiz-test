import axios from 'axios';
import { PostAnswerResult } from '../../types/PostAnswerResult';

export const postAnswer = async ({
  answer,
  question,
}: {
  answer: string;
  question: string | null;
}): Promise<PostAnswerResult | null> => {
  if (!question) {
    console.error('No question sent to backend!');
    return null;
  }
  try {
    const res = await axios.post('http://localhost:8080/post/answer', {
      answer,
      country: question,
    });

    console.log(res.data);
    return res.data;
  } catch (e) {
    console.error('Error fetching question data:', e);
    return null;
  }
};
