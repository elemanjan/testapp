/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */
import {StackScreenProps} from '@react-navigation/stack';
import {IPost} from '../utils/types';

export type AppParamList = {
  Posts: undefined;
  PostDetail: {
    post: IPost;
  };
  AddPost: undefined;
};

export type AppStackScreenProps<T extends keyof AppParamList> =
  StackScreenProps<AppParamList, T>;
