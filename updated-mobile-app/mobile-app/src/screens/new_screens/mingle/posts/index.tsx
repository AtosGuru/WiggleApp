import React, { useEffect } from 'react';
import {
  FlatList,
  RefreshControl
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '../../../../store/store';
import {
  getPostsThunk
} from '../../../../store/thunks/getPostsThunk';
import { IObject } from '../../../../types/utils';
import MingleItem from '../mingleItem';
import styles from './styled';

const Posts = (props: IObject) => {
  const dispatch = useDispatch<AppDispatch>();  
  const {isLoading} = useSelector((root: RootState) => root?.minglePosts);

  const fetchData = () => {
    // Dispatch an action to retrieve posts from the server, with the location as a parameter.
    // The dispatched action 'getPostsThunk' likely makes an asynchronous API call to fetch the data.
    dispatch(getPostsThunk(props?.location));
  };

  useEffect(() => {
    fetchData()
  }, [props.location])

  const renderItem = ({item}: IObject) => {
    return (
      <MingleItem item={item} isPost={true}/>
    );
  };

  return (    
      <FlatList
        style={{zIndex: -1}}
        contentContainerStyle={styles.container}
        data={props?.posts?.post}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={fetchData} />
        }
      />      
    
  );
};

export default Posts;
