import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {addPost} from '../store/posts/postsSlice';
import {PostFormInput} from '../components/CustomInput';

const AddPostScreen: React.FC = ({navigation}) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleAddPost = () => {
    // Создаем новый пост с введенными данными и добавляем его в список
    if (title && body) {
      const newPost = {title, body};
      dispatch(addPost(newPost));
      navigation.goBack(); // Возвращаемся назад после добавления
    }
  };

  return (
    <View style={styles.container}>
      <PostFormInput
        label="Заголовок"
        value={title}
        onChangeText={setTitle}
        placeholder="Введите заголовок"
      />
      <PostFormInput
        label="Тело поста"
        value={body}
        onChangeText={setBody}
        placeholder="Введите текст поста"
        multiline
      />
      <Button title="Добавить" onPress={handleAddPost} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  label: {
    color: '#000',
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    color: '#000',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  inputBody: {
    height: 200,
    textAlignVertical: 'top',
  },
});

export default AddPostScreen;
