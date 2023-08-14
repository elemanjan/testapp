import React from 'react';
import Comment from './Comment';
import {useSelector} from 'react-redux';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

interface CommentListProps {}

const CommentList: React.FC<CommentListProps> = () => {
  // @ts-ignore
  const comments = useSelector(state => state.comments.comments);
  // @ts-ignore
  const isLoading = useSelector(state => state.comments.isLoading);

  const latestComment =
    comments.length > 0 ? comments[comments.length - 1] : null;

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <View style={styles.container}>
      <Comment
        key={latestComment?.id}
        id={latestComment?.id ?? 0}
        postId={latestComment?.postId ?? 0}
        text={latestComment?.text ?? ''}
      />
    </View>
  );
};

export default CommentList;

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
});
