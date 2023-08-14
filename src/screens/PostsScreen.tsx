import React, {useEffect, useLayoutEffect} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import PostCard from '../components/PostCard';
import {deleteExistingPost, fetchPosts} from '../store/posts/postsSlice';
import {HeaderRightButton} from '../components/HeaderRightButton';
import {IPost} from '../utils/types';
import ProgressHUD from '../components/ProgressHUD';

const PostsScreen: React.FC = (props: any) => {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts.posts);
  const isLoading = useSelector(state => state.posts.isLoading);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleDeletePost = (id: number) => {
    dispatch(deleteExistingPost(id));
  };

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

  const handlePostPress = (post: IPost) => {
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
            onDelete={() => handleDeletePost(item.id)}
          />
        )}
      />
      <ProgressHUD isLoading={isLoading} />
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
