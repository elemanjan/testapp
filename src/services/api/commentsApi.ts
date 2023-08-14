import axios from 'axios';
import {baseUrl} from '../../config/url';

export const createComment = async (comment: {
  text: string;
  postId: number;
}) => {
  const response = await axios.post(`${baseUrl}/comments`, comment);
  return response.data;
};

export const updateComment = async (id: number, body: string) => {
  const response = await axios.put(`${baseUrl}/comments/${id}`, {body});
  return response.data;
};

export const deleteComment = async (id: number) => {
  await axios.delete(`${baseUrl}/comments/${id}`);
};
