import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { Image, Text, TouchableOpacity, View, TextInput, ActivityIndicator } from 'react-native';

import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import LinearGradient from 'react-native-linear-gradient';

import { register } from '../../../../api';
import { setUserData } from '../../../../store/auth';
import GradientText from '../../../../components/GradientText/GradientText';
import styles from './styled';
import { useNavigation } from '@react-navigation/native';

const schema = yup
  .object({
    email: yup
      .string()
      .required('Email is required')
      .matches(/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,4}$/, 'Invalid Email'),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Minimuim 8 characters Required'),
    passwordConfirm: yup
      .string()
      .required('Password is required')
      .oneOf([yup.ref('password')], 'Password do not match'),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

function SignUpSimpleForm(): JSX.Element {
  const dispatch = useDispatch();
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [disableButton, setDisableButton] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
    watch,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
  });

  const { t } = useTranslation();

  const [password, passwordConfirm] = watch(['password', 'passwordConfirm']);

  const onSubmit = async (data: FormData) => {
    setDisableButton(true);
    const { email, password, passwordConfirm } = data;
    if (isValid) {
      try {
        const res = await register({
          login: email,
          password,
          password_confirmation: passwordConfirm,
        });

        if (res && res.user) {
          dispatch(setUserData(res.user));
          setDisableButton(false);
        }
      } catch (error) {
        setDisableButton(false);
        console.log('error', error);
      }
    } else {
      setDisableButton(false);
    }
  };

  const handleTogglePassword1 = () => {
    setShowPassword1(!showPassword1);
  };

  const handleTogglePassword2 = () => {
    setShowPassword2(!showPassword2);
  };

  const inputIcon1 = showPassword1
    ? require('../../../../../assets/icons/EyeOpen.png')
    : require('../../../../../assets/icons/EyeClose.png');
  const inputIcon2 = showPassword2
    ? require('../../../../../assets/icons/EyeOpen.png')
    : require('../../../../../assets/icons/EyeClose.png');

  const primaryColors = ['#FFCB52', '#FF7B02'];
  const secondaryColors = ['#686868', '#686868'];

  const { isContainCapitalLetter, isContainNumbers, isContainText } =
    useMemo(() => {
      const isContainText = /[A-z]/g.test(password);
      const isContainNumbers = /\d/g.test(password);
      const isContainCapitalLetter = /[A-Z]/g.test(password);

      return { isContainText, isContainNumbers, isContainCapitalLetter };
    }, [password]);

  return (
    <Fragment>
      <View pointerEvents="none">
        <GradientText
          style={{
            fontSize: 20,
            fontWeight: '600',
            marginBottom: 28,
          }}
          start={{ x: 1, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={['#FFCB52', '#FF7B02']}>
          {t('Create an Account')}
        </GradientText>
      </View>

      <Text
        style={{
          color: 'white',
          fontSize: 16,
          fontWeight: '600',
          marginBottom: 10,
        }}>
        {t('Email')}
      </Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <TextInput
              placeholder={`${t('Enter your email')}....`}
              placeholderTextColor="#686868"
              style={[styles.textInput, { marginBottom: 26 }]}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          </>
        )}
        name="email"
      />

      {errors.email && (
        <Text style={styles.emailErrorText}>{errors.email.message}</Text>
      )}

      <Text
        style={{
          color: 'white',
          fontSize: 16,
          fontWeight: '600',
          marginBottom: 10,
        }}>
        {t('Password')}
      </Text>
      <View
        style={{
          position: 'relative',
          justifyContent: 'center',
          marginBottom: 26,
          borderWidth: 1,
        }}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                secureTextEntry={!showPassword1}
                style={styles.textInput}
                placeholder={`${t('Enter your password')}....`}
                placeholderTextColor="#686868"
              />
            </>
          )}
          name="password"
        />

        {password.length ? (
          <TouchableOpacity
            style={{ position: 'absolute', right: 24 }}
            onPress={handleTogglePassword1}>
            <Image
              source={inputIcon1}
              style={{
                width: 20,
                height: 20,
                tintColor: showPassword1 ? 'white' : '#686868',
              }}
            />
          </TouchableOpacity>
        ) : null}

        {errors.password && (
          <Text style={styles.errorText}>{errors.password.message}</Text>
        )}
      </View>

      <Text
        style={{
          color: 'white',
          fontSize: 16,
          fontWeight: '600',
          marginBottom: 10,
        }}>
        {t('Confirm Password')}
      </Text>

      <View
        style={{
          position: 'relative',
          justifyContent: 'center',
          marginBottom: 22,
        }}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                secureTextEntry={!showPassword2}
                style={styles.textInput}
                placeholder={`${t('Enter your password')}....`}
                placeholderTextColor="#686868"
              />
            </>
          )}
          name="passwordConfirm"
        />

        {passwordConfirm.length ? (
          <TouchableOpacity
            style={{ position: 'absolute', right: 24 }}
            onPress={handleTogglePassword2}>
            <Image
              source={inputIcon2}
              style={{
                width: 20,
                height: 20,
                tintColor: showPassword2 ? 'white' : '#686868',
              }}
            />
          </TouchableOpacity>
        ) : null}
        {errors.passwordConfirm && (
          <Text style={styles.errorText}>{errors.passwordConfirm.message}</Text>
        )}
      </View>
      <View style={{ marginBottom: 16, justifyContent: 'center' }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 5,
          }}>
          <View style={{
            height: 25,
            justifyContent: "center"
          }}>
            <Image
              source={isContainText ?
                require('../../../../../assets/images/tickcircle.png') :
                require('../../../../../assets/images/tickcircleUnchecked.png')}
              style={{ width: 18, height: 18 }}
              resizeMode="contain"
            />
          </View>
          <View style={{
            height: 25,
            justifyContent: "center",
            marginLeft: 4,
          }}>
            <GradientText
              style={{
                fontSize: 12,
                textAlignVertical: 'center'
              }}
              start={{ x: 1, y: 0 }}
              end={{ x: 1, y: 1 }}
              colors={isContainText ? primaryColors : secondaryColors}
            >{t('Must Contain text')}
            </GradientText>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 5,
          }}>
          <View style={{
            height: 25,
            justifyContent: "center"
          }}>
            <Image
              source={isContainNumbers ?
                require('../../../../../assets/images/tickcircle.png') :
                require('../../../../../assets/images/tickcircleUnchecked.png')}
              style={{ width: 18, height: 18 }}
              resizeMode="contain"
            />
          </View>
          <View style={{
            height: 25,
            justifyContent: "center",
            marginLeft: 4,
          }}>
            <GradientText
              style={{
                fontSize: 12,
                textAlignVertical: 'center'
              }}
              start={{ x: 1, y: 0 }}
              end={{ x: 1, y: 1 }}
              colors={isContainNumbers ? primaryColors : secondaryColors}>

              {t('Must Contain numbers')}
            </GradientText>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 5,
          }}>
          <View style={{
            height: 25,
            justifyContent: "center"
          }}>
            <Image
              source={isContainCapitalLetter ?
                require('../../../../../assets/images/tickcircle.png') :
                require('../../../../../assets/images/tickcircleUnchecked.png')}
              style={{ width: 18, height: 18 }}
              resizeMode="contain"
            />
          </View>
          <View style={{
            height: 25,
            justifyContent: "center",
            marginLeft: 4,
          }}>
            <GradientText
              style={{
                fontSize: 12,
                textAlignVertical: 'center'
              }}
              start={{ x: 1, y: 0 }}
              end={{ x: 1, y: 1 }}
              colors={isContainCapitalLetter ? primaryColors : secondaryColors}>
              {t('Must Contain a capital letter')}
            </GradientText>
          </View>
        </View>
      </View>

      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        disabled={disableButton}
        style={styles.primaryButton}
        activeOpacity={0}>
        <LinearGradient
          colors={['#FFCB52', '#FF7B02']}
          start={{ x: 1, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.buttonGradient, { opacity: 1 }]}>
          {disableButton ? (
            <ActivityIndicator size={'small'} color="black" />
          ) : (
            <Text style={styles.buttonText}>{t('Confirm')}</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    </Fragment>
  );
}

export default SignUpSimpleForm;
