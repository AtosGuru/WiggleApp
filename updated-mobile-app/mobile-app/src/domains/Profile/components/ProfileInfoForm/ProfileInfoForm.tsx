import React, { Fragment, useState } from 'react';
import {
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ActivityIndicator
} from 'react-native';

import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

import { axiosInstance } from '../../../../api/axiosInstance';
import GradientText from '../../../../components/GradientText/GradientText';
import styles from './styled';

const schema = yup.object({
  firstName: yup
    .string()
    .required('First Name is required')
    .min(3, 'Characters required 3-25')
    .max(25, 'Characters required 3-25'),
  lastName: yup
    .string()
    .required('Last Name is required')
    .min(3, 'Characters required 3-25')
    .max(25, 'Characters required 3-25'),
  userName: yup
    .string()
    .required('Username is required')
    .min(3, 'Minimum 3 Characters required')
}).required();


type FormData = yup.InferType<typeof schema>;

function ProfileInfoForm(): JSX.Element {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const [error, setError] = useState(false)
  const [isLoading, setLoader] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      userName: ''
    },
  });



  const handleConfirm = async (Data: any) => {
    setLoader(true)
    try {
      if (isValid) {
        const result = await setUsername(Data?.userName)
        if (result) {
          setLoader(false)
          navigation.navigate('gender_info', { profileData: Data });
        } else {
          setLoader(false)
          setError(true)
        }
      }
    } catch {
      setLoader(false)
      console.log('error');
    }
  };


  const setUsername = async (name: any) => {
    try {
      const { data } = await axiosInstance.post('api/v1/user', {
        name: name,
      });

      if (!data || typeof data === 'undefined') {
        console.error('Error: Invalid response from the API');
        throw new Error('Invalid API response');
      }

      return true;
    } catch (err) {
      console.error(err)
      return false;
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
          {t('To get started, Fill in the fields below')}
        </Text>

        <View>
          <KeyboardAvoidingView behavior="padding">
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                fontWeight: '600',
                marginBottom: 10,
              }}>
              {t('First Name')}
            </Text>

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <TextInput
                    placeholder={`${t('Enter your first name')}....`}
                    placeholderTextColor="#686868"
                    style={[styles.textInput, { marginBottom: 15 }]}
                    onChangeText={(text) => {
                      const checkedText = text.replace(/[^a-zA-Z]/g, '');
                      onChange(checkedText)
                    }}
                    onBlur={onBlur}
                    value={value}
                  />
                </>
              )}
              name="firstName"
            />
            {errors.firstName && (
              <Text style={styles.emailErrorText}>
                {errors.firstName.message}
              </Text>
            )}

            <Text
              style={{
                color: 'white',
                fontSize: 16,
                fontWeight: '600',
                marginBottom: 10,
              }}>
              {t('Last Name')}
            </Text>


            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <TextInput
                    placeholder={`${t('Enter your last name')}....`}
                    placeholderTextColor="#686868"
                    style={[styles.textInput, { marginBottom: 15 }]}
                    onChangeText={(text) => {
                      const checkedText = text.replace(/[^a-zA-Z]/g, '');
                      onChange(checkedText)
                    }}
                    onBlur={onBlur}
                    value={value}
                  />
                </>
              )}
              name="lastName"
            />

            {errors.lastName && (
              <Text style={styles.emailErrorText}>
                {errors.lastName.message}
              </Text>
            )}

            <Text
              style={{
                color: 'white',
                fontSize: 16,
                fontWeight: '600',
                marginBottom: 10,
              }}>
              {t('Username')}
            </Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <>
                  <TextInput
                    placeholder={`${t('Enter your user name')}....`}
                    placeholderTextColor="#686868"
                    style={[styles.textInput, { marginBottom: 15 }]}
                    onChangeText={(text) => {
                      setError(false)
                      const checkedText = text.replace(/[^a-zA-Z0-9@.\-_]/g, '');
                      onChange(checkedText)
                    }}
                    onBlur={onBlur}
                    value={value}
                  />
                </>
              )}
              name="userName"
            />
            {errors.userName && (
              <Text style={styles.emailErrorText}>
                {errors.userName.message}
              </Text>
            )}
            {error ? (<Text style={styles.emailErrorText}>
              {t('Username is taken')}
            </Text>) : null}
          </KeyboardAvoidingView>
        </View>
      </View>
      <TouchableOpacity
        onPress={handleSubmit(handleConfirm)}
        style={styles.primaryButton}
        disabled={isLoading}
        activeOpacity={0}>
        <LinearGradient
          colors={['#FFCB52', '#FF7B02']}
          start={{ x: 1, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.buttonGradient, { opacity: 1 }]}>
          {isLoading ? (
            <ActivityIndicator size={'small'} color="black" />
          ) : (
            <Text style={styles.buttonText}>{t('Confirm')}</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </Fragment>
  );
}

export default ProfileInfoForm;
