import React, {useLayoutEffect, useState} from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';
import {HeaderRightButton} from '../components/HeaderRightButton';
import {CustomInput, PostFormInput} from '../components/CustomInput';
import CommentList from '../components/CommentList';

interface CommentData {
  id: number;
  postId: number;
  text: string;
}

const initialComments: CommentData[] = [
  {id: 1, postId: 1, text: 'Great post!'},
  {id: 2, postId: 1, text: 'Thanks for sharing.'},
];
const PostDetailScreen: React.FC = props => {
  const [isEdit, setEdit] = useState(false);
  const {post} = props.route.params;
  const [comments, setComments] = useState<CommentData[]>(initialComments);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    // Mock adding a new comment locally for demonstration
    const newCommentData: CommentData = {
      id: comments.length + 1, // Generate a new comment ID
      postId: post.id,
      text: newComment,
    };
    setComments([...comments, newCommentData]);
    setNewComment('');
  };

  const handleDeleteComment = (commentId: number) => {
    const updatedComments = comments.filter(
      comment => comment.id !== commentId,
    );
    setComments(updatedComments);
  };

  const handleEditComment = (commentId: number, newText: string) => {
    const updatedComments = comments.map(comment =>
      comment.id === commentId ? {...comment, text: newText} : comment,
    );
    setComments(updatedComments);
  };

  const handleUpdatePost = () => {
    setEdit(prevState => !prevState);
  };

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderRightButton
          onPress={handleUpdatePost}
          title={isEdit ? 'Сохранить' : 'Редактировать'}
        />
      ),
    });
  }, [props.navigation, isEdit]);

  return (
    <View style={styles.container}>
      <CustomInput
        isDisabled={!isEdit}
        label="Заголовок"
        value={post.title}
        // onChangeText={setTitle}
        placeholder="Введите заголовок"
      />
      <CustomInput
        isDisabled={!isEdit}
        label="Тело поста"
        value={post.body}
        // onChangeText={setBody}
        placeholder="Введите текст поста"
        multiline
      />

      <CommentList
        comments={comments}
        onDelete={handleDeleteComment}
        onEdit={handleEditComment}
      />
      {/* Ввод нового комментария */}
      <CustomInput
        value={newComment}
        onChangeText={setNewComment}
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
});

export default PostDetailScreen;
