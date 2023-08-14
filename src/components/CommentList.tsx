// CommentList.tsx
import React from 'react';
import Comment from './Comment';
import {IComment} from '../utils/types';

interface CommentListProps {
  comments: IComment[];
  onDelete: (commentId: number) => void;
  onEdit: (commentId: number, newText: string) => void;
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
