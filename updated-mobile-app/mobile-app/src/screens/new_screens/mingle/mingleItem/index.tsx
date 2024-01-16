import React, { useState } from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import moment from 'moment';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';

import EntityActionOptions from '../../../../components/EntityActionOptions';
import SuccessModal from '../../../../components/SuccessModal';
import ConfirmationModal from '../../../../components/confirmationModal';
import { convertImgToLink } from '../../../../helpers/convertImgToLink';
import {
  deletePostThunk,
  reactionPostThunk,
  reportPostThunk
} from '../../../../store/thunks/getPostsThunk';
import { IObject } from '../../../../types/utils';

import {
  deleteCommentThunk,
  reactionCommentThunk,
  reportCommentThunk
} from '../../../../store/thunks/getCommentsThunk';

import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../../RootNavigation';
import { AppDispatch, RootState } from '../../../../store/store';
import styles from './styled';

const MingleItem = (props: IObject) => {
  const {item, isPost} = props
  const user = useSelector((root: RootState) => root.auth.user);
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  const [dropDown, setDropDown] = useState('');
  const [deleteModal, setDeleteModal] = useState('');
  const [reportModal, setReportModal] = useState('');
  const [privateWarningModal, setPrivateWarningModal] = useState('')  
  const [reportSuccessModal, setReportSuccessModal] = useState('');
  const [reportRejectModal, setReportRejectModal] = useState('');

  const checkUser = item?.user_id === user?.id;

  return (
    <View style={styles.content}>
      {!checkUser ? (
        <View style={styles.profileView}>
          <FastImage
            source={{
              uri: convertImgToLink(
                item?.user?.profile?.photos === undefined
                  ? user?.profile?.photos[0]
                  : item?.user?.profile?.photos[0],
              ),
            }}
            style={styles.profileImage}
            resizeMode="cover"
          />
        </View>
      ) : null}
      
      <LinearGradient
        colors={checkUser ? ['#FFCB52', '#FF7B02'] : ['#252525', '#252525']}
        style={styles.contentView}
      >            
      <TouchableOpacity onPress={() => {
        if (isPost) navigation.navigate('mingle_comment', { postID:  item?.id})
      }}>
        <View style={styles.info}>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>
              {item?.user?.profile?.firstName
                ? item?.user?.profile?.firstName +
                  ' ' +
                  item?.user?.profile?.lastName
                : item?.user?.name}
            </Text>
          </View>
          <View style={styles.creationInfo}>
            <View style={styles.createdAtView}>
              <Text style={styles.createdAtText}>
                {moment(item?.created_at).fromNow()}
              </Text>
            </View>
            <View style={styles.moreButton}>
              <TouchableOpacity
                style={styles.closeIconButton}
                onPress={() => {
                  if (user?.profile?.is_private) {
                    setPrivateWarningModal(item?.id)
                    return
                  }
                  dropDown === item?.id
                    ? setDropDown('')
                    : setDropDown(item?.id);
                }}>
                <Image
                  source={require('../../../../../assets/icons/Dots.png')}
                  resizeMode="contain"
                  style={styles.dotIconImage}
                />
              </TouchableOpacity>
              {dropDown == item?.id ? (
                checkUser ? (
                  <EntityActionOptions
                    item={item}
                    data={[                        
                      {
                        text: 'Delete',
                        onPress: () => {
                          setDropDown('');
                          setTimeout(() => {
                            setDeleteModal(item.id);
                          }, 1000);
                        },
                      },
                    ]}                      
                    textOne={'Delete'}
                  />
                ) : (
                  <EntityActionOptions
                    item={item}
                    data={[
                      {
                        text: 'Report',
                        onPress: () => {
                          setDropDown('');
                          setReportModal(item.id);
                        },
                      },
                    ]}
                    textOne={'Report'}
                  />
                )
              ) : null}
            </View>
          </View>
        </View>
        <View style={styles.postInfo}>
          <Text style={styles.postText}>{item?.message}</Text>
        </View>
        <View style={styles.toggleView}>
          <View style={styles.toggleButtonView}>
            <TouchableOpacity
              style={styles.closeIconButton}
              onPress={() => {
                if (user?.profile?.is_private) {
                  setPrivateWarningModal(item?.id)
                  return
                }
                if (isPost) {
                  dispatch(
                  reactionPostThunk({
                    reaction: 'LIKE',
                    id: item?.id,
                  }),
                )} else {
                  dispatch(
                  reactionCommentThunk({
                    reaction: 'LIKE',
                    id: item?.id,
                  }),
                );
              }
              }}>
              <Image
                source={                    
                  require('../../../../../assets/icons/FollowArrowUp.png')
                }
                resizeMode="contain"
                style={
                  item?.reaction === null || item?.reaction === 'DISLIKE'
                    ? styles.toggleIconsNot
                    : checkUser ? styles.toggleIcons : styles.toggleBaseIcons
                }
              />
              <Text
                style={[
                  styles.toggleText,
                  checkUser
                    ? {
                        color: '#252525',
                      }
                    : {color: '#686868'},
                ]}>
                {item.likes_count_count}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.toggleButtonView}>
            <TouchableOpacity
              style={styles.closeIconButton}
              onPress={() => {
                if (user?.profile?.is_private) {
                  setPrivateWarningModal(item?.id)
                  return
                }
                if (isPost) {
                  dispatch(
                    reactionPostThunk({
                      reaction: 'DISLIKE',
                      id: item?.id,
                    }),
                  );
                } else {
                  dispatch(
                    reactionCommentThunk({
                      reaction: 'DISLIKE',
                      id: item?.id,
                    }),
                  );
                }
              }}>
              <Image
                source={require('../../../../../assets/icons/FollowArrowDown.png')}
                resizeMode="contain"
                style={
                  item?.reaction === null || item?.reaction === 'LIKE'
                    ? styles.toggleIconsNot
                    : checkUser ? styles.toggleIcons : styles.toggleBaseIcons
                }
              />
              <Text
                style={[
                  styles.toggleText,
                  checkUser
                    ? {
                        color: '#252525',
                      }
                    : {color: '#686868'},
                ]}>
                {item.dislikes_count_count}
              </Text>
            </TouchableOpacity>
          </View>
          {isPost && (
            <View style={styles.toggleButtonView}>
              <TouchableOpacity
                style={styles.closeIconButton}
                onPress={() => {
                  navigation.navigate('mingle_comment', { postID:  item?.id})
                }}>
                <Image
                  source={require('../../../../../assets/icons/CommentCount.png')}
                  resizeMode="contain"
                  style={
                    styles.toggleBaseIcons
                  }
                />
                <Text
                  style={[
                    styles.toggleText,
                    checkUser
                      ? {
                          color: '#252525',
                        }
                      : {color: '#686868'},
                  ]}>
                  {item.comments_count_count}
                </Text>
              </TouchableOpacity>
            </View>
          )}            
        </View> 
      </TouchableOpacity>
                 
      </LinearGradient>
      
      
      
      {checkUser ? (
        <View style={styles.myProfileView}>
          <FastImage
            source={{
              uri: convertImgToLink(
                item?.user?.profile?.photos === undefined
                  ? user?.profile?.photos[0]
                  : item?.user?.profile?.photos[0],
              ),
            }}
            style={styles.profileImage}
            resizeMode="cover"
          />
        </View>
      ) : null}
      {deleteModal == item?.id && (
        <ConfirmationModal
        isVisible={deleteModal == item?.id}
        text={'delete'}
        item={item}
        isPost={isPost}
        onYesPress={() => {
          if (isPost) {
            dispatch(
              deletePostThunk({
                id: item.id,
                callBack: () => {
                  setDeleteModal('');
                  // setDeleteSuccessModal(true);
                },
              }),
            );
          } else {
            dispatch(
              deleteCommentThunk({
                id: item.id,
                callBack: () => {
                  setDeleteModal('');
                  // setDeleteSuccessModal(true);
                },
              }),
            );
          }            
        }}
        onNoPress={() => {
          setDeleteModal('');
        }}
      />
      )}
      {reportModal == item?.id && (
        <ConfirmationModal
          isVisible={reportModal == item?.id}
          isPost={isPost}
          onYesPress={() => {
            if (isPost) {
              dispatch(
                reportPostThunk({
                  id: item.id,
                  successCallBack: () => {
                    setReportModal('');
                    setReportSuccessModal(item?.id);
                  },
                  rejectCallBack: () => {
                    setReportModal('');
                    setReportRejectModal(item?.id);
                  },
                }),
              );
            } else {
              dispatch(
                reportCommentThunk({
                  id: item.id,
                  successCallBack: () => {
                    setReportModal('');
                    setReportSuccessModal(item?.id);
                  },
                  rejectCallBack: () => {
                    setReportModal('');
                    setReportRejectModal(item?.id);
                  },
                }),
              );
            }
          }}
          text={'report'}
          item={item}
          onNoPress={() => {
            setReportModal('');
          }}
        />
      )}
      {reportSuccessModal == item?.id && (
        <SuccessModal          
          text={`${isPost ? "Post" : "Comment"} Reported`}
          onNoPress={() => setReportSuccessModal('')}
        />
      )}
      {reportRejectModal == item?.id && (
        <SuccessModal          
          text={`${isPost ? "Post" : "Comment"} Already Reported`}
          onNoPress={() => setReportRejectModal('')}
        />
      )}
      {privateWarningModal == item?.id && (
        <SuccessModal          
          text={`To use Mingle your${"\n"} profile${"\n"} needs to be public`}
          onNoPress={() => setPrivateWarningModal('')}
        />
      )}
    </View>
  );
};

export default MingleItem;
