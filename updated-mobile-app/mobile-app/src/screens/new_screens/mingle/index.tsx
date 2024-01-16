import React, {useEffect, useMemo, useState} from 'react';
import {View, StyleSheet, TouchableWithoutFeedback} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';

import Posts from './posts';
import AddPost from './addPost';
import LocationHeader from './locationHeader';
import {RootState} from '../../../store/store';
import {getPostsThunk} from '../../../store/thunks/getPostsThunk';
import BackButton from './backButton';

const Mingle = () => {
  const dispatch = useDispatch();

  const [dropDown, setDropDown] = useState('');

  const user = useSelector((root: RootState) => root.auth.user);
  const posts = useSelector((root: RootState) => root.minglePosts);
  let location = useSelector((root: RootState) => root.locationName.currentLocation);

  if (location == "Fetching Location") {
    if (user?.profile?.geolocation?.city && user?.profile?.geolocation?.country)
      location = `${user?.profile?.geolocation?.city}, ${user?.profile?.geolocation?.country}`
  }

  return (
    <TouchableWithoutFeedback onPress={() => setDropDown('')}>
      <View style={styles.container}>
        <BackButton top={50} left={20}/>
        <LocationHeader location={location} user={user} />
        <Posts
          posts={posts}
          dispatch={dispatch}
          user={user}
          location={location}
          dropDown={dropDown}
          setDropDown={setDropDown}
        />
        {!user?.profile?.is_private && (<AddPost
          setDropDown={setDropDown}
          dispatch={dispatch}
          posts={posts}
          user={user}
          location={location}
        />)}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Mingle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
