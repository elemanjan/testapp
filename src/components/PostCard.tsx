import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';

interface PostCardProps {
  title: string;
  body: string;
  onPress: () => void;
  onDelete: () => void;
}

const trashIcon = '../assets/icons/trash.png';
const PostCard: React.FC<PostCardProps> = ({
  title,
  body,
  onPress,
  onDelete,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>
      <TouchableOpacity style={styles.iconContainer} onPress={onDelete}>
        <Image source={require(trashIcon)} style={styles.icon} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
  },
  title: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  body: {
    color: '#000',
    marginTop: 5,
  },
  iconContainer: {
    position: 'absolute',
    right: 5,
    top: 5,
    padding: 5,
  },
  icon: {
    width: 20,
    height: 20,
  },
});

export default PostCard;
