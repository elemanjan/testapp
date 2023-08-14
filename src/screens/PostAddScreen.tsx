import React, {useState} from 'react';
import {Button, StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {createNewPost} from '../store/posts/postsSlice';
import {CustomInput} from '../components/CustomInput';
import {AppStackScreenProps} from '../navigation/types';

const AddPostScreen: React.FC<AppStackScreenProps<'AddPost'>> = props => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleAddPost = () => {
    // @ts-ignore
    dispatch(createNewPost({title, body}));
    props.navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <CustomInput
        label="Заголовок"
        value={title}
        onChangeText={setTitle}
        placeholder="Введите заголовок"
      />
      <CustomInput
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
