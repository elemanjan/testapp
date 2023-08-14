import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import * as commentsApi from '../../services/api/commentsApi';

interface Comment {
  id: number;
  postId: number;
  text: string;
}

interface CommentsState {
  comments: Comment[];
}

const initialState: CommentsState = {
  comments: [],
};

export const createCommentAsync = createAsyncThunk(
  'comments/createComment',
  async (comment: {text: string; postId: number}) => {
    return await commentsApi.createComment(comment);
  },
);

export const updateCommentAsync = createAsyncThunk(
  'comments/updateComment',
  async (payload: {id: number; text: string}) => {
    return await commentsApi.updateComment(payload.id, payload.text);
  },
);

export const deleteCommentAsync = createAsyncThunk(
  'comments/deleteComment',
  async (id: number) => {
    await commentsApi.deleteComment(id);
    return id;
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(
        createCommentAsync.fulfilled,
        (state, action: PayloadAction<Comment>) => {
          state.comments.push(action.payload);
        },
      )
      .addCase(
        updateCommentAsync.fulfilled,
        (state, action: PayloadAction<Comment>) => {
          const index = state.comments.findIndex(
            comment => comment.id === action.payload.id,
          );
          if (index !== -1) {
            state.comments[index] = action.payload;
          }
        },
      )
      .addCase(
        deleteCommentAsync.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.comments = state.comments.filter(
            comment => comment.id !== action.payload,
          );
        },
      );
  },
});

export default commentsSlice.reducer;
