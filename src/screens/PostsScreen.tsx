import React, {useEffect, useLayoutEffect} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import PostCard from '../components/PostCard';
import {setPosts} from '../store/posts/postsSlice';
import {HeaderRightButton} from '../components/HeaderRightButton';

interface Post {
  id: number;
  title: string;
  body: string;
}

const MOCK_DATA: Post[] = [
  {id: 1, title: 'Post 1', body: 'This is the body of post 1'},
  {id: 2, title: 'Post 2', body: 'This is the body of post 2'},
  {id: 3, title: 'Post 3', body: 'This is the body of post 3'},
];

const PostsScreen: React.FC = (props: any) => {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts.posts);

  useEffect(() => {
    dispatch(setPosts(MOCK_DATA));
  }, []);

  const navigateToAddPostScreen = () => {
    props.navigation.navigate('AddPost');
  };

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderRightButton
          onPress={navigateToAddPostScreen}
          title={'Добавить'}
        />
      ),
    });
  }, [props.navigation]);

  const handlePostPress = (post: Post) => {
    // Navigate to PostDetailScreen with postId as a parameter
    props.navigation.navigate('PostDetail', {post});
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <PostCard
            title={item.title}
            body={item.body}
            onPress={() => handlePostPress(item)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default PostsScreen;
