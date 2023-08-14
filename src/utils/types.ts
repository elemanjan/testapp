export interface IPost {
  id: number;
  title: string;
  body: string;
}

export interface IComment {
  id: number;
  postId: number;
  text: string;
}

export interface CreatePostParams {
  title: string;
  body: string;
}

export interface UpdatePostParams extends CreatePostParams {}
