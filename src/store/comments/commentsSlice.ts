import {createSlice} from '@reduxjs/toolkit';
import * as commentsApi from '../../services/api/commentsApi';
import {
  CreateCommentParams,
  IComment,
  UpdateCommentParams,
} from '../../utils/types';

const filterCommentsByPostId = (
  comments: IComment[],
  postId: number,
): IComment[] => {
  return comments.filter((item: IComment) => item.postId === postId);
};

interface CommentsState {
  isLoading: boolean;
  comments: IComment[];
}

const initialState: CommentsState = {
  isLoading: true,
  comments: [],
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setComments: (state, action) => {
      state.comments = action.payload;
    },
    addComment: (state, action) => {
      state.comments.push(action.payload);
    },
    updateComment: (state, action) => {
      const index = state.comments.findIndex(
        comment => comment.id === action.payload.id,
      );
      if (index !== -1) {
        state.comments[index] = action.payload;
      }
    },
    removeComment: (state, action) => {
      state.comments = state.comments.filter(
        comment => comment.id !== action.payload,
      );
    },
  },
});

export const {
  setLoading,
  setComments,
  addComment,
  updateComment,
  removeComment,
} = commentsSlice.actions;

export const fetchComments = (id: number) => async (dispatch: any) => {
  try {
    const comments = await commentsApi.searchComments();
    const filteredComments = filterCommentsByPostId(comments, id);
    dispatch(setComments(filteredComments));
  } catch (e) {
  } finally {
    dispatch(setLoading(false));
  }
};

export const createNewComment =
  (comment: CreateCommentParams) => async (dispatch: any) => {
    const newComment = await commentsApi.createComment(comment);
    dispatch(addComment(newComment));
  };

export const updateExistingComment =
  (id: number, comment: UpdateCommentParams) => async (dispatch: any) => {
    try {
      const updatedComment = await commentsApi.updateComment(id, comment);
      dispatch(updateComment(updatedComment));
    } catch (e) {
    } finally {
      dispatch(setLoading(false));
    }
  };

export const deleteExistingComment = (id: number) => async (dispatch: any) => {
  try {
    await commentsApi.deleteComment(id);
    dispatch(removeComment(id));
  } catch (e) {
    console.error('err delete comment', e?.response);
  }
};

export default commentsSlice.reducer;
