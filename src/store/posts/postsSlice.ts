import {createSlice} from '@reduxjs/toolkit';
import * as postsApi from '../../services/api/postApi';
import {CreatePostParams, UpdatePostParams} from '../../utils/types';

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    isLoading: true,
    posts: [],
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },
    updatePost: (state, action) => {
      const index = state.posts.findIndex(
        post => post.id === action.payload.id,
      );
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
    },
    removePost: (state, action) => {
      state.posts = state.posts.filter(post => post.id !== action.payload);
    },
  },
});

export const {setLoading, setPosts, addPost, updatePost, removePost} =
  postsSlice.actions;

export const fetchPosts = () => async (dispatch: any) => {
  try {
    const posts = await postsApi.getPosts();
    dispatch(setPosts(posts));
  } catch (e) {
  } finally {
    dispatch(setLoading(false));
  }
};

export const createNewPost =
  (post: CreatePostParams) => async (dispatch: any) => {
    const newPost = await postsApi.createPost(post);
    dispatch(addPost(newPost));
  };

export const updateExistingPost =
  (id: number, post: UpdatePostParams) => async (dispatch: any) => {
    try {
      const updatedPost = await postsApi.updatePost(id, post);
      dispatch(updatePost(updatedPost));
    } catch (e) {
    } finally {
      dispatch(setLoading(false));
    }
  };

export const deleteExistingPost = (id: number) => async (dispatch: any) => {
  await postsApi.deletePost(id);
  dispatch(removePost(id));
};

export default postsSlice.reducer;
