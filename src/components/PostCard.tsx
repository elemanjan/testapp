import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

interface PostCardProps {
  title: string;
  body: string;
  onPress: () => void;
}

const PostCard: React.FC<PostCardProps> = ({title, body, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>
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
});

export default PostCard;
