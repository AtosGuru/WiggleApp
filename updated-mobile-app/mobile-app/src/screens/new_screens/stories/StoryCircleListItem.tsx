import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';

import Video from 'react-native-video';
import LinearGradient from 'react-native-linear-gradient';

import { usePrevious } from '../../../helpers';
import { IUserStory, StoryCircleListItemProps } from '../../../interfaces';
import { convertImgToLink, convertVideoToLink } from '../../../helpers/convertImgToLink';



const StoryCircleListItem = ({
  item,
  unPressedBorderColor,
  pressedBorderColor,
  unPressedAvatarTextColor,
  pressedAvatarTextColor,
  avatarSize = 60,
  showText,
  avatarTextStyle,
  handleStoryItemPress,
  avatarImageStyle,
  avatarWrapperStyle,
}: StoryCircleListItemProps) => {

  const DEFAULT_AVATAR = require('../../../../assets/images/no_avatar.png')

  const [isPressed, setIsPressed] = useState(item?.seen);

  const prevSeen = usePrevious(item?.seen);

  useEffect(() => {
    if (prevSeen != item?.seen) {
      setIsPressed(item?.seen);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item?.seen]);

  const _handleItemPress = (item: IUserStory) => {
    if (handleStoryItemPress) handleStoryItemPress(item);

    setIsPressed(true);
  };

  const avatarWrapperSize = avatarSize + 4;
  const video = React.useRef<any>(null);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => _handleItemPress(item)}
        style={[
          styles.avatarWrapper,
          {
            height: avatarWrapperSize,
            width: avatarWrapperSize,
          },
          avatarWrapperStyle,
          !isPressed
            ? {
              borderColor: unPressedBorderColor ?? 'red',
            }
            : {
              borderColor: pressedBorderColor ?? 'grey',
            },
        ]}
      >
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={[styles.linearGradient, avatarWrapperStyle,]} colors={["#FFCB52", "#FF7B02", '#000000']}>
          {item?.user_image?.includes("-") ? ( // Check if it's a base64 image
            <Image
              style={avatarImageStyle}
              source={{ uri: convertImgToLink(item.user_image) }}
              defaultSource={Platform.OS === 'ios' ? DEFAULT_AVATAR : null}
            />
          ) : (
              <Video
              source={{ uri: convertVideoToLink(item.user_image) }}
              style={[avatarImageStyle]}
              resizeMode='contain'
            />
          )}
        </LinearGradient>
      </TouchableOpacity>
      {showText && (
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={[
            {
              width: avatarWrapperSize,
              ...styles.text,
              ...avatarTextStyle,
            },
            isPressed
              ? { color: pressedAvatarTextColor || undefined }
              : { color: unPressedAvatarTextColor || undefined },
          ]}
        >
          {item.user_name}
        </Text>
      )}
    </View>
  );
};

export default StoryCircleListItem;

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    marginRight: 10
  },

  avatarWrapper: {
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: 'red',
    borderRadius: 100,
    height: 64,
    width: 64,
  },
  text: {
    marginTop: 3,
    textAlign: 'center',
    alignItems: 'center',
    fontSize: 11,
  },
  linearGradient: {
    zIndex: -1,
    borderRadius: 20, padding: 10, justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    borderStyle:Platform.OS=="ios"?"":'dashed'
  }
});
