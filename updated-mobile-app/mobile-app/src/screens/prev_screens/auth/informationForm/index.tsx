import React, {useEffect} from 'react';
import {ScreenWrapper} from '../../../components/ScreenWrapper';
import {TextInput} from '../../../components/TextInput';
import {useForm} from 'react-hook-form';
import {Button, Text} from '../../../components';
import Logo from '../../../assets/images/Logo.svg';
import {StyledScreenWrapper, StyledScrollView} from './styled';
import {Flex} from '../../../components/utils/styled';
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  View,
  StatusBar,
} from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import {LinearGradient} from 'expo-linear-gradient';
import {Link, useRouter} from 'expo-router';
import Colors from '../../../constants/Colors';
import {Checkbox} from '../../../components/Checkbox';
import {useMutation} from 'react-query';
import {User} from '../../../types/user.interface';
import {updateUserProfile} from '../../../api/user.methods';
import {useKeyboardOpen} from '../../../hooks/useKeyboardOpen';
import {Render} from '../../../components/utils/Render';
import {useRecoilState} from 'recoil';
import {userAtom} from '../../../state/user.atom';

interface Form {
  firstName: string;
  lastName: string;
  bDay: string;
  bMonth: string;
  bYear: string;
  gender: User['gender'];
}
export default function InformationForm() {
  const {mutate, isLoading, isSuccess, data} = useMutation(updateUserProfile);
  const router = useRouter();
  const {height, width} = useWindowDimensions();
  const [user, setUser] = useRecoilState(userAtom);
  const {
    control,
    handleSubmit,
    formState: {isValid},
  } = useForm({
    defaultValues: {
      gender: user?.profile.gender || 'other',
      firstName: user?.profile.firstName ?? '',
      lastName: user?.profile.lastName ?? '',
      bDay: user?.profile.birthDate
        ? new Date(user?.profile.birthDate).getDate().toString()
        : '',
      bMonth: user?.profile.birthDate
        ? (new Date(user?.profile.birthDate).getMonth() + 1).toString()
        : '',
      bYear: user?.profile.birthDate
        ? new Date(user?.profile.birthDate).getFullYear().toString()
        : '',
    },
  });

  useEffect(() => {
    if (isSuccess) {
      router.push('auth/photoUpload');
    }
  }, [isSuccess]);

  const transformData = (data: Form): Partial<User['profile']> => {
    const birthDate = new Date(
      `${data.bYear}-${data.bMonth}-${data.bDay}`,
    ).toISOString();

    return {
      firstName: data.firstName,
      lastName: data.lastName,
      gender: data.gender,
      birthDate,
    };
  };

  useEffect(() => {
    if (isSuccess && data?.profile) {
      setUser(
        val =>
          ({
            ...val,
            profile: data.profile,
          } as User),
      );
    }
  }, [isSuccess]);

  const keyboardOpen = useKeyboardOpen();

  return (
    <ImageBackground
      style={{flex: 1, backgroundColor: Colors.black}}
      imageStyle={{opacity: 0.3}}
      source={require('../../../assets/images/loginBackground.png')}>
      <StyledScreenWrapper>
        <StyledScrollView
          contentContainerStyle={{
            alignItems: 'center',
            minHeight: keyboardOpen ? 0 : height,
            padding: 15,
          }}>
          <StatusBar barStyle={'light-content'} />
          <Render if={!(keyboardOpen && Platform.OS === 'android')}>
            <Flex mt={10}>
              <Logo height={100}></Logo>
            </Flex>
          </Render>
          <Text
            color={'white'}
            font={'Euclid-Medium'}
            size={22}
            lineHeight={36}
            mb={10}
            mt={30}>
            Thank you for registering!
          </Text>
          <Text
            color={'white'}
            font={'Euclid-Medium'}
            size={14}
            lineHeight={14}
            mb={10}>
            To get started, fill in the fields below
          </Text>
          <Flex f={3} style={{width: '100%'}}>
            <TextInput.Solid
              label={'First name'}
              name="firstName"
              control={control}
              placeholder={'First Name'}
              rules={{
                required: true,
                maxLength: 30,
              }}
            />
            <TextInput.Solid
              label={'Last Name'}
              name="lastName"
              control={control}
              placeholder={'Last Name'}
              rules={{
                required: true,
                maxLength: 30,
              }}
            />
            <Text style={{width: '100%'}} color={Colors.white} mb={5}>
              Birthday
            </Text>
            <Flex f={null} row spaceBetween style={{width: '100%'}}>
              <TextInput.Solid
                name="bDay"
                keyboardType={'number-pad'}
                toastError
                control={control}
                placeholder={'Day'}
                maxLength={2}
                style={{
                  width: width / 3 - 20,
                  textAlign: 'center',
                }}
                rules={{
                  required: 'Invalid day',
                  min: {
                    value: 1,
                    message: 'Invalid day',
                  },
                  max: {
                    value: 31,
                    message: 'Invalid day',
                  },
                  pattern: {
                    value: /^[0-9]{1,2}$/,
                    message: 'Invalid day',
                  },
                }}
              />
              <TextInput.Solid
                name="bMonth"
                keyboardType={'number-pad'}
                control={control}
                toastError
                placeholder={'Month'}
                maxLength={2}
                style={{
                  width: width / 3 - 20,
                  textAlign: 'center',
                }}
                rules={{
                  required: 'Invalid month',
                  min: {
                    value: 1,
                    message: 'Invalid month',
                  },
                  max: {
                    value: 12,
                    message: 'Invalid month',
                  },
                  pattern: {
                    value: /^[0-9]{1,2}$/,
                    message: 'Invalid month',
                  },
                }}
              />
              <TextInput.Solid
                name="bYear"
                toastError
                keyboardType={'number-pad'}
                control={control}
                placeholder={'Year'}
                maxLength={4}
                style={{
                  width: width / 3 - 20,
                  textAlign: 'center',
                }}
                rules={{
                  required: 'Invalid year',
                  min: {
                    value: 1900,
                    message: 'Invalid year',
                  },
                  max: {
                    value: new Date().getFullYear() - 12,
                    message: 'Invalid year',
                  },
                }}
              />
            </Flex>
            <Text style={{width: '100%'}} color={Colors.white} mb={5}>
              Gender
            </Text>
            <Flex f={null} row spaceBetween style={{width: '100%'}}>
              <Checkbox
                control={control}
                name={'gender'}
                value={'male'}
                style={{width: width / 3 - 20}}>
                Male
              </Checkbox>
              <Checkbox
                control={control}
                name={'gender'}
                value={'female'}
                style={{width: width / 3 - 20}}>
                Female
              </Checkbox>
              <Checkbox
                control={control}
                name={'gender'}
                value={'other'}
                style={{width: width / 3 - 20}}>
                Other
              </Checkbox>
            </Flex>
            <Button.Gradient
              style={{marginTop: 20}}
              loading={isLoading}
              onPress={handleSubmit(d => mutate(transformData(d as Form)))}
              valid={isValid}>
              Continue
            </Button.Gradient>
          </Flex>
        </StyledScrollView>
      </StyledScreenWrapper>
    </ImageBackground>
  );
}
