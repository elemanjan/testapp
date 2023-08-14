import axios from 'axios';
import {baseUrl} from '../../config/url';
import {
  CreateCommentParams,
  IComment,
  UpdateCommentParams,
} from '../../utils/types';

export const createComment = async (comment: CreateCommentParams) => {
  const response = await axios.post(`${baseUrl}/comments`, comment);
  return response.data;
};

export const updateComment = async (id: number, body: UpdateCommentParams) => {
  const response = await axios.put(`${baseUrl}/comments/${id}`, {body});
  return response.data;
};

export const deleteComment = async (id: number) => {
  await axios.delete(`${baseUrl}/comments/${id}`);
};

export const searchComments = async (): Promise<IComment[]> => {
  const response = await axios.get(`${baseUrl}/comments`);
  return response.data;
};
