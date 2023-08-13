import axios from 'axios';
import { FetchQuestionResult } from '../../types/FetchQuestionResult';

export const fetchQuestion = async (): Promise<FetchQuestionResult | null> => {
  try {
    const res = await axios.get('http://localhost:8080/get/question');
    return res.data;
  } catch (e) {
    console.error('Error fetching question data:', e);
    return null;
  }
};
