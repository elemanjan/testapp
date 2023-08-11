// CommentList.tsx
import React from 'react';
import {View} from 'react-native';
import Comment from './Comment';

interface CommentListProps {
  comments: CommentData[];
  onDelete: (commentId: number) => void;
  onEdit: (commentId: number, newText: string) => void;
}

interface CommentData {
  id: number;
  postId: number;
  text: string;
}

const CommentList: React.FC<CommentListProps> = ({
  comments,
  onDelete,
  onEdit,
}) => {
  const latestComment =
    comments.length > 0 ? comments[comments.length - 1] : null;

  return (
    <Comment
      key={latestComment?.id}
      id={latestComment?.id ?? 0}
      postId={latestComment?.postId ?? 0}
      text={latestComment?.text ?? ''}
      onDelete={onDelete}
      onEdit={onEdit}
    />
  );
};

export default CommentList;
