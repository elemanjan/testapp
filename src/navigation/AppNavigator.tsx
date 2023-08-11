import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import PostsScreen from '../screens/PostsScreen';
import PostDetailScreen from '../screens/PostDetailScreen';
import AddPostScreen from '../screens/PostAddScreen';

const Stack = createStackNavigator();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Posts">
        <Stack.Screen
          options={{
            title: 'Список постов',
          }}
          name="Posts"
          component={PostsScreen}
        />
        <Stack.Screen
          options={({route}) => ({
            title: `Детали поста #${route.params?.post.id}`,
          })}
          name="PostDetail"
          component={PostDetailScreen}
        />
        <Stack.Screen
          options={{
            title: 'Добавление поста',
          }}
          name="AddPost"
          component={AddPostScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
