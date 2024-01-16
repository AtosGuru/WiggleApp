import React, { Fragment, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import DatePicker from 'react-native-date-picker';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';

import { RootState } from '../../../../store/store';
import { setUserData } from '../../../../store/auth';
import { updateUserProfile } from '../../../../api/user.methods';
import GradientText from '../../../../components/GradientText/GradientText';
import styles from './styled';
import { IObject } from '../../../../types/utils';



const schema = yup.object({
  gender: yup
    .string()
    .required('Gender is required'),
  birthday: yup
    .date()
    .required('Birthday is required')
    .test('is-valid-date', 'Birthday is required', function (value) {
      if (!value) {
        return false;
      }
      return true;
    })
}).required();

type FormData = yup.InferType<typeof schema>;

function SignUpGenderInfo(): JSX.Element {

  const { params } = useRoute();
  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [formattedDate, setFormattedDate] = useState(null);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const birthdayData = ['day', 'month', 'year'];
  const genderData = ['Male', 'Female', 'Other'];

  const user = useSelector((root: RootState) => root.auth.user);


  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
    getValues
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      gender: '',
      birthday: new Date('2005-10-25T11:41:00.000Z') ?? '',
    },
  });

  const checkColor = useMemo(() => (getValues()?.gender?.length > 0 && formattedDate !== null), [getValues(), formattedDate])

  // Calculate the minimum date (18 years ago from today)
  const calculateMinDate = () => {
    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 18);
    return minDate;
  };
  const minDate = calculateMinDate();

  const getThreeLetterMonth = (month: string | number) => {
    const months = [
      'JAN',
      'FEB',
      'MAR',
      'APR',
      'MAY',
      'JUN',
      'JUL',
      'AUG',
      'SEP',
      'OCT',
      'NOV',
      'DEC',
    ];
    return months[month];
  };

  const formatDate = (_date: any) => {
    const day = _date.getDate().toString().padStart(2, '0');
    const month = getThreeLetterMonth(_date.getMonth());
    const year = _date.getFullYear().toString();
    return { day, month, year };
  };



  const handleConfirm = async (data: IObject) => {
    setIsLoading(true);
    if (isValid) {
      try {
        const { birthday, gender } = data;
        const { firstName, lastName } = params?.profileData
        const res = await updateUserProfile({
          birthDate: birthday,
          firstName,
          gender: gender,
          lastName,
        });

        if (res && res.profile) {
          setIsLoading(false);
          dispatch(
            setUserData({
              ...user,
              profile: { ...user.profile, ...res.profile },
            }),
          );
          setIsLoading(false)
          navigation.navigate('profile_media');
        }
      } catch (err) {
        setIsLoading(false);
        console.log('err', err);
      }

    } else {
      setIsLoading(false)
    }
  };

  return (
    <Fragment>
      <View style={styles.container}>
        <View pointerEvents="none">
          <GradientText
            style={{
              fontSize: 20,
              fontWeight: '600',
              marginBottom: 12,
            }}
            start={{ x: 1, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={['#FFCB52', '#FF7B02']}>
            {t('Thanks for registering')}
          </GradientText>
        </View>
        <Text
          style={{
            color: 'white',
            fontSize: 16,
            fontWeight: '400',
            marginBottom: 40,
          }}>
          {t('Select your Gender and Date of Birth')}
        </Text>

        <Text
          style={{
            color: 'white',
            fontSize: 16,
            fontWeight: '600',
            marginBottom: 10,
          }}>
          {t('Birthday')}
        </Text>
        <View style={{ marginBottom: 32 }}>
          <View style={{ flexDirection: 'row', gap: 20 }}>
            {birthdayData?.map(item => (
              <TouchableOpacity
                key={item}
                style={{
                  flex: 1,
                  backgroundColor: '#252525',
                  borderRadius: 8,
                  width: 'auto',
                  paddingVertical: 28,
                  flexWrap: 'nowrap',
                }}
                onPress={() => setOpen(true)}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '500',
                    color: 'white',
                    textAlign: 'center',
                  }}>
                  {t(formattedDate?.[item]) ||
                    item.charAt(0).toUpperCase() + item.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}

          </View>
          {errors.birthday && (
            <Text style={styles.emailErrorText}>
              {errors.birthday.message}
            </Text>
          )}
        </View>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <DatePicker
                modal
                open={open}
                mode="date"
                date={value}
                androidVariant="iosClone"
                maximumDate={minDate} // Set the maximum date to restrict year selection
                onConfirm={(_date: any) => {
                  setOpen(false);
                  onChange(_date)
                  setFormattedDate(formatDate(_date));
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />
            </>
          )}
          name="birthday"
        />


        <Text
          style={{
            color: 'white',
            fontSize: 16,
            fontWeight: '600',
            marginBottom: 10,
          }}>
          {t('Gender')}
        </Text>
        <View style={{ marginBottom: 46 }}>
          <View style={{ flexDirection: 'row', gap: 20 }}>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  {genderData?.map(item => (
                    <LinearGradient style={{
                      flex: 1,
                      borderRadius: 8,
                      width: 'auto',
                      flexWrap: 'nowrap',
                    }} colors={value === item ? ["#FFCB52", "#FF7B02"] : ["#252525", "#252525"]}>
                      <TouchableOpacity
                        style={{
                          borderRadius: 8,
                          width: 'auto',
                          paddingVertical: 28,
                        }}
                        key={item}
                        onPress={() => onChange(item)}>
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight: value === item ? '500' : '300',
                            color: 'white',
                            textAlign: 'center',
                          }}>
                          {t(item)}
                        </Text>
                      </TouchableOpacity>
                    </LinearGradient>
                  ))}
                </>
              )}
              name="gender"
            />
          </View>
          {errors.gender && (
            <Text style={styles.emailErrorText}>
              {errors.gender.message}
            </Text>
          )}
        </View>


      </View>
      <TouchableOpacity
        onPress={handleSubmit(handleConfirm)}
        style={styles.primaryButton}
        disabled={isLoading || !checkColor}
      >
        <LinearGradient
          colors={checkColor ? ['#FFCB52', '#FF7B02'] : ["#252525", "#252525"]}
          start={{ x: 1, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.buttonGradient]}>
          {isLoading ? (
            <ActivityIndicator size={'small'} color="black" />
          ) : (
            <Text style={[checkColor ? styles.buttonText : styles.buttonText2]}>{t('Confirm')}</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </Fragment>
  );
}

export default SignUpGenderInfo;
