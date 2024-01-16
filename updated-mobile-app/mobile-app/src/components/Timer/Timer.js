import {AppState, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {resendPin} from '../../api';
import dynamicStyles from './Timer.styles';
import moment from 'moment';

const Timer = props => {
  const {setIsTimerEnded, changeCode} = props;

  const [minutes, setMinutes] = useState(props.minutes || 0);
  const [seconds, setSeconds] = useState(props.seconds || 0);

  const timerReference = useRef(null);
  const appState = useRef(AppState.currentState);
  const backgroundTime = useRef(null);

  const startTimer = () => {
    props?.minutes && setMinutes(props?.minutes);
    props?.seconds && setSeconds(props?.seconds);

    setIsTimerEnded(false);

    timerReference.current = setInterval(() => {
      if (seconds > 0) {
        setSeconds(prev => {
          if (prev > 0) return prev - 1;
          else return prev;
        });
      }
      if (seconds === 0 && minutes === 0) {
        clearInterval(timerReference.current);
      }
    }, 1000);
  };

  const resendConfirmationCode = async () => {
    try {
      resendPin();
      changeCode('');
      startTimer();
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    startTimer();

    return () => {
      clearInterval(timerReference.current);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Subscribe to app state
    const subscription = AppState.addEventListener('change', nextAppState => {
      // If user comes back to app
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        // Get the time of return to the application
        const backToAppTime = new Date();

        // If we have background time and time of backing to app
        if (backgroundTime.current instanceof Date && backToAppTime) {
          // We calculate seconds difference
          const secondsPassed = Math.round(
            moment
              .duration(
                moment(backToAppTime).diff(moment(backgroundTime.current)),
              )
              .asSeconds(),
          );

          // Calculate new seconds value
          const newSeconds = seconds - secondsPassed;

          // Set new seconds value
          if (newSeconds > 0) setSeconds(prev => newSeconds);
          // If the time is completely up, set 0 to seconds state
          else setSeconds(0);
        }
      }

      // Getting current app state and set it to ref
      appState.current = nextAppState;
      // If app state is background we record the time of exit from the application
      if (appState.current === 'background') {
        backgroundTime.current = new Date();
      }
    });

    return () => {
      subscription.remove();
    };
  }, [seconds]);

  const isTimerEnds = useMemo(
    () => minutes === 0 && seconds === 0,
    [minutes, seconds],
  );

  useEffect(() => {
    isTimerEnds && setIsTimerEnded(true);
  }, [isTimerEnds, setIsTimerEnded]);

  const styles = dynamicStyles({isTimerEnds: isTimerEnds});

  const timerValue = `${minutes || '00'}:${
    seconds < 10 ? `0${seconds}` : seconds
  }`;

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <Text style={{color: 'white', fontSize: 14, fontWeight: '400'}}>
          Send code again in{' '}
        </Text>
        <Text style={{color: 'white', fontSize: 14, fontWeight: '600'}}>
          {timerValue}
        </Text>
      </View>
      <TouchableOpacity
        disabled={!isTimerEnds}
        activeOpacity={isTimerEnds ? 0 : 1}
        onPress={isTimerEnds && resendConfirmationCode}>
        <Text style={styles.resendText}>Send Again</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Timer;
