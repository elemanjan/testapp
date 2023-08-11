// Comment.tsx
import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';

interface CommentProps {
  id: number;
  postId: number;
  text: string;
  onDelete: (commentId: number) => void;
  onEdit: (commentId: number, newText: string) => void;
}

const Comment: React.FC<CommentProps> = ({id, text, onDelete, onEdit}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedText(text);
  };

  const handleSaveEdit = () => {
    onEdit(id, editedText);
    setIsEditing(false);
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
            <Button title="Удалить" onPress={() => onDelete(id)} />
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
