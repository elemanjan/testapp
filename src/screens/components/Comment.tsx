import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {
  deleteExistingComment,
  updateExistingComment,
} from '../../store/comments/commentsSlice';

interface CommentProps {
  id: number;
  postId: number;
  text: string;
}

const Comment: React.FC<CommentProps> = ({id, text}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);
  const dispatch = useDispatch();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedText(text);
  };

  const handleSaveEdit = () => {
    // @ts-ignore
    dispatch(updateExistingComment(id, editedText));
    setIsEditing(false);
  };

  const handleDelete = () => {
    // @ts-ignore
    dispatch(deleteExistingComment(id));
  };

  return (
    <View style={styles.container}>
      {isEditing ? (
        <View style={styles.editContainer}>
          <TextInput
            style={styles.editInput}
            value={editedText}
            onChangeText={setEditedText}
            placeholder="Введите текст комментария"
          />
          <View style={styles.buttonContainer}>
            <Button title="Сохранить" onPress={handleSaveEdit} />
            <Button title="Отмена" onPress={handleCancelEdit} />
          </View>
        </View>
      ) : (
        <View>
          <Text style={styles.commentText}>{text}</Text>
          <View style={styles.buttonContainer}>
            <Button title="Удалить" onPress={handleDelete} />
            <Button title="Редактировать" onPress={handleEdit} />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
  },
  commentText: {
    color: '#000',
    fontSize: 16,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  editContainer: {
    marginBottom: 10,
  },
  editInput: {
    color: '#000',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    borderRadius: 8,
  },
});

export default Comment;
