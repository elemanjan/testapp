import axios from 'axios';
import {baseUrl} from '../../config/url';
import {CreatePostParams, UpdatePostParams} from '../../utils/types';

export const getPosts = async () => {
  const response = await axios.get(`${baseUrl}/posts`);
  return response.data;
};

export const createPost = async (post: CreatePostParams) => {
  const response = await axios.post(`${baseUrl}/posts`, post);
  return response.data;
};

export const updatePost = async (id: number, post: UpdatePostParams) => {
  const response = await axios.put(`${baseUrl}/posts/${id}`, post);
  return response.data;
};

export const deletePost = async (id: number) => {
  const response = await axios.delete(`${baseUrl}/posts/${id}`);
  return response.data;
};
