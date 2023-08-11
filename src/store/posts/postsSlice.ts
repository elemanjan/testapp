import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface Post {
  id: number;
  title: string;
  body: string;
}

interface PostsState {
  posts: Post[];
}

const initialState: PostsState = {
  posts: [],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
    addPost: (state, action: PayloadAction<Post>) => {
      const newPost = {
        id: state.posts.length + 1,
        title: action.payload.title,
        body: action.payload.body,
      };
      state.posts.push(newPost);
    },
  },
});

export const {setPosts, addPost} = postsSlice.actions;
export default postsSlice.reducer;
