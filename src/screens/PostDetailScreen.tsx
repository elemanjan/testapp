import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {CustomInput} from '../components/CustomInput';
import {IPost} from '../utils/types';
import {AppStackScreenProps} from '../navigation/types';
import {fetchPosts, updateExistingPost} from '../store/posts/postsSlice';
import {CustomButton} from '../components/CustomButton';
import CommentList from './components/CommentList';
import {
  addComment,
  createNewComment,
  fetchComments,
} from '../store/comments/commentsSlice';

const PostDetailScreen: React.FC<AppStackScreenProps<'PostDetail'>> = props => {
  const dispatch = useDispatch();
  const [isEdit, setEdit] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [comment, setComment] = useState('');
  const postId = props.route.params.post.id;
  const post = useSelector((state: any) =>
    state.posts.posts.find((item: IPost) => item.id === postId),
  );

  useEffect(() => {
    if (postId) {
      dispatch(fetchComments(postId));
    }
  }, [dispatch]);

  useLayoutEffect(() => {
    setTitle(post.title);
    setBody(post.body);
  }, []);

  const toggleEdit = () => {
    setEdit(prevState => !prevState);
  };

  const handleUpdatePost = () => {
    // @ts-ignore
    dispatch(updateExistingPost(postId, {title, body}));
    toggleEdit();
    props.navigation.goBack();
  };

  const handleAddComment = () => {
    // @ts-ignore
    dispatch(createNewComment({text: comment}));
  };

  return (
    <View style={styles.container}>
      <CustomInput
        isDisabled={!isEdit}
        label="Заголовок"
        defaultValue={post.title}
        onChangeText={setTitle}
        placeholder="Введите заголовок"
      />
      <CustomInput
        isDisabled={!isEdit}
        label="Тело поста"
        defaultValue={post.body}
        onChangeText={setBody}
        placeholder="Введите текст поста"
        multiline
      />
      <View style={styles.buttonContainer}>
        <CustomButton
          onPress={toggleEdit}
          isDisabled={isEdit}
          title={'Редактировать'}
        />
        <CustomButton
          onPress={handleUpdatePost}
          isDisabled={!isEdit}
          title={'Сохранить'}
        />
      </View>

      <CommentList />

      <CustomInput
        value={comment}
        onChangeText={setComment}
        placeholder="Введите новый комментарий"
      />
      <Button title="Добавить комментарий" onPress={handleAddComment} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
  },
  body: {
    color: '#000',
    fontSize: 16,
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default PostDetailScreen;
