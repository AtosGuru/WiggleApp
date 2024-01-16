import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';

import {useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';

import {IObject} from '../../../../types/utils';
import {RootState} from '../../../../store/store';
import AddPostModal from '../../../../components/AddPostModal';
import {modalState, resetMessage} from '../../../../store/mingleSlice';
import {
  addPostThunk,
  updatePostThunk,
} from '../../../../store/thunks/getPostsThunk';
import styles from './styled';
import { checkPrivateProfile } from '../mingleHelper';

const AddPost = (props: IObject) => {
  // const [modal, setModal] = useState<boolean>(false)

  const {addPostModal, message, id} = useSelector(
    (root: RootState) => root.minglePosts,
  );

  const createPost = (newMessage: string) => {
    // Toggle the modal state. This likely controls the visibility of a modal/dialog.    
    changeModalState();

    // Check if the 'message' is empty.
    if (message == '') {
      // If the 'message' is empty, dispatch an action to add a new post.
      props?.dispatch(
        addPostThunk({
          postData: {
            location: props?.location,
            message: newMessage,
          },
          userInfo: props?.user,
        }),
      );
    } else {
      // If the 'message' is not empty, dispatch an action to update an existing post.
      props?.dispatch(
        updatePostThunk({
          message: newMessage,
          id: id,
        }),
      );

      // Dispatch an action to reset the 'message' state. This is likely used to clear the 'message'.
      props.dispatch(resetMessage());
    }
  };

  // This function is called to toggle the modal state. It is a separate function for readability and reusability.
  const changeModalState = () => {
    props?.setDropDown('');
    // Dispatch an action to control the modal state (e.g., toggle visibility).
    props?.dispatch(resetMessage());
    props?.dispatch(modalState());
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : undefined}
      style={styles.container}>
      {addPostModal ? (
        <AddPostModal
          currentMessage={message}
          onPress={createPost}
        />
      ) : null}
      <LinearGradient
        colors={['#1B1B1B00', '#1B1B1B']}
        style={styles.LinearGradient}>
        <TouchableOpacity onPress={() => {
          changeModalState()
        }}>
          <LinearGradient
            style={styles.AddPostBtn}
            colors={
              addPostModal ? ['#686868', '#686868'] : ['#FFCB52', '#FF7B02']
            }>
            <FastImage
              source={
                !addPostModal
                  ? require('../../../../../assets/icons/plusIcon.png')
                  : require('../../../../../assets/icons/tabler_plus.png')
              }
              style={[addPostModal ? styles.crossIcon : styles.plusIcon]}
            />
          </LinearGradient>
        </TouchableOpacity>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default AddPost;
