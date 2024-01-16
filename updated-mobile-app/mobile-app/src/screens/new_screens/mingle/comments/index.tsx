import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback
} from 'react-native';

import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';

import { convertImgToLink } from '../../../../helpers/convertImgToLink';
import {
  addCommentThunk,
  getCommentsThunk
} from '../../../../store/thunks/getCommentsThunk';
import { IObject } from '../../../../types/utils';


import { RouteProp, useRoute } from '@react-navigation/native';
import { t } from 'i18next';
import { TextInput } from 'react-native-gesture-handler';
import { RootStackParamList } from '../../../../RootNavigation';
import { maxWords } from '../../../../constants/Style';
import { AppDispatch, RootState } from '../../../../store/store';
import BackButton from '../backButton';
import MingleItem from '../mingleItem';
import styles from './styled';
import LinearGradient from 'react-native-linear-gradient';

const Comments = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { params } = useRoute<RouteProp<RootStackParamList, 'mingle_comment'>>()
  const {isLoading, comment} = useSelector((root: RootState) => root?.mingleComments);
  const user = useSelector((root: RootState) => root.auth.user);
  const {post} = useSelector((root: RootState) => root.minglePosts);
  const postItem = post.find((item) => item?.id == params?.postID)

  const fetchData = () => {
    // Dispatch an action to retrieve comments from the server, with the location as a parameter.
    // The dispatched action 'getCommentsThunk' likely makes an asynchronous API call to fetch the data.
    dispatch(getCommentsThunk(params?.postID));
  };

  useEffect(() => {
    fetchData()
  }, [params?.postID])

  const renderItem = ({item}: IObject) => {
    return (
      <MingleItem item={item}/>
    );
  };

  const AddComment = () => {
    const [errorMsg, setErrorMsg] = useState(false)
    const [commentMessage, setCommentMessage] = useState('')
    const [focused, setFocused] = useState(false)


    const sendMessage = () => {
      dispatch(
        addCommentThunk({
          commentData: {            
            message: commentMessage,            
          },
          userInfo: user,
          postID: params?.postID
        }),
      )
      setCommentMessage('')
    }

    const onChangeText = (text: string) => {
      // Check if the number of words and spaces exceeds the limit
      if (text.length <= maxWords) {
          // If the text length is within the allowed limit, update the state with the new text.
          setCommentMessage(text)
          // Clear any previous error message by setting the error state to false.
          setErrorMsg(false);
          return; // Exit the function.
      }
      // If the text length exceeds the allowed limit, set an error message flag to true.
      setErrorMsg(true);
      return; // Exit the function.
    }

    return (
      <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : undefined}
      style={styles.container}>        
        <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss()}}>          
          {focused ? (<View style={styles.mainContainer}></View>) : (<></>)}  
        </TouchableWithoutFeedback>        
        <View style={styles.addCommentMainContainer}>
            {errorMsg ?
              <View style={styles.addCommenterrorMsg}><Text style={styles.addCommentErrorText}>Sorry! Character limit reached!</Text></View> : null
            }
            <LinearGradient
                colors={['#FFCB52', '#FF7B02']}
                style={styles.addCommentModalContainer}
              > 
                <View style={styles.addCommentTextInputcontainer}>
                    <View style={styles.addCommentTextInputView}>
                        <TextInput
                            value={commentMessage}
                            style={styles.addCommentTextInput}
                            onChangeText={onChangeText}
                            placeholder='Write your reply.......'
                            placeholderTextColor='#ffffff'
                            onFocus={() => setFocused(true)}
                            onBlur={() => setFocused(false)}
                        />
                    </View>
                    <View style={styles.addCommentBtnView}>
                        <TouchableOpacity
                            disabled={commentMessage.length < 1}
                            style={styles.addCommentBtn}
                            onPress={sendMessage}
                        >
                            {commentMessage.length > 0 ?
                                <Image
                                    source={require('../../../../../assets/icons/sendChat.png')}
                                    style={styles.addCommentBtnImage}
                                    tintColor={"#FFFFFF"}
                                /> :
                                <Image
                                    source={require('../../../../../assets/icons/sendChat.png')}
                                    style={styles.addCommentBtnImage}
                                    tintColor={"#686868"}
                                />
                            }
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>
            <View style={styles.myProfileView}>
              <FastImage
                source={{
                  uri: convertImgToLink(
                    user?.profile?.photos[0]                  
                  ),
                }}
                style={styles.profileImage}
                resizeMode="cover"
              />
            </View>
        </View>        
      </KeyboardAvoidingView>
    )
  }

  return (
    <View style={styles.wrapper}>
      <BackButton top={48} left={30}/>
      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <Text style={styles.headerText}>{t('Comments')}</Text>
        </View>
      </View>
      <View style={styles.bodyContainer}>
      {postItem ? (
        <>
          <MingleItem item={postItem} isPost={true}/>
          <FlatList
            style={{zIndex: -1}}
            contentContainerStyle={styles.contentContainer}
            data={comment}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={fetchData} />
            }
          />
          {!user?.profile?.is_private && (<AddComment />)}          
        </>        
      ) : <Text style={{color: 'red'}}>Post not exists!</Text>}
      </View>
    </View>
  );
};

export default Comments;
