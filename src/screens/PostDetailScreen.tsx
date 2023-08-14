import React, {useCallback, useLayoutEffect, useState} from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {HeaderRightButton} from '../components/HeaderRightButton';
import {CustomInput} from '../components/CustomInput';
import CommentList from '../components/CommentList';
import {IComment, IPost} from '../utils/types';
import {AppStackScreenProps} from '../navigation/types';
import {updateExistingPost} from '../store/posts/postsSlice';

const PostDetailScreen: React.FC<AppStackScreenProps<'PostDetail'>> = props => {
  const dispatch = useDispatch();
  const [isEdit, setEdit] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const postId = props.route.params.post.id;
  const post = useSelector((state: any) =>
    state.posts.posts.find((item: IPost) => item.id === postId),
  );

  const handleUpdatePost = useCallback(() => {
    if (isEdit) {
      // @ts-ignore
      dispatch(updateExistingPost(postId, {title, body}));
      props.navigation.goBack();
    }
    setEdit(prevState => !prevState);
  }, [title, body]);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderRightButton
          onPress={handleUpdatePost}
          title={isEdit ? 'Сохранить' : 'Редактировать'}
        />
      ),
    });
  }, [isEdit, props.navigation]);

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

      {/*<CommentList*/}
      {/*  comments={post.comments} // Замените на свойство комментариев в объекте поста*/}
      {/*  postId={postId}*/}
      {/*/>*/}

      {/*/!* Ввод нового комментария *!/*/}
      {/*<CustomInput*/}
      {/*  value={newComment}*/}
      {/*  onChangeText={setNewComment}*/}
      {/*  placeholder="Введите новый комментарий"*/}
      {/*/>*/}
      {/*<Button title="Добавить комментарий" onPress={handleAddComment} />*/}
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
});

export default PostDetailScreen;
