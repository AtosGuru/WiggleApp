import React, { Fragment, useState } from 'react'
import {
    FlatList,
    Modal,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
  } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import styles from './styled'
import FastImage from 'react-native-fast-image'
import GradientText from '../../../components/GradientText/GradientText'
import { plans } from './const'
import { useNavigation } from '@react-navigation/native'

function DatingSubscribe(props: {
    visible: boolean
    onCancel: () => void
}) {
    const { visible, onCancel } = props
    const [plan, setPlan] = useState<number | null>(null)

    const navigation = useNavigation()

    const handleOpenPlan = () => {
        if (plan) {
            onCancel()
            navigation.navigate('buy_gold')
        }
    }

    return (
        <Modal visible={visible} transparent animationType="fade">
          <TouchableWithoutFeedback onPress={onCancel}>
            <View style={styles.overlay}>
              <View>
                <View style={styles.alertContainer}>
                    <TouchableOpacity onPress={onCancel} style={{
                        position: 'absolute',
                        right: 0,
                        margin: 20
                    }}>
                        <FastImage
                            source={require('../../../../assets/icons/close.png')}
                            style={{ width: 50, height: 50, opacity: 0.5 }}
                        />
                    </TouchableOpacity>
                    <FastImage
                        source={require('../../../../assets/images/newLogo.png')}
                        style={{ width: 102, height: 113 }}
                    />
                  <View style={styles.titleWrapper}>
                    <Text style={styles.text}>Subscribe to</Text>
                    <GradientText
                        style={styles.title}
                        start={{ x: 1, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        colors={['#FFCB52', '#FF7B02']}>
                        WIGGLE GOLD
                    </GradientText>
                    <Text style={styles.subtitle}>Get Unlimited Swipes</Text>
                  </View>
                    <FlatList
                        scrollEnabled={false}
                        horizontal
                        keyExtractor={(i) => i.id.toString()}
                        data={plans}
                        contentContainerStyle={{
                            gap: 39,
                            marginBottom: 55
                        }}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => setPlan(plan === item.id ? null : item.id)}
                                activeOpacity={0.5}
                                style={{
                                    backgroundColor: '#252525',
                                    width: 96,
                                    height: 132,
                                    borderRadius: 14,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderWidth: plan === item.id ? 1 : 0,
                                    borderColor: '#FF7B02'
                                }}
                            >
                                <GradientText
                                    style={{ fontWeight: '600', fontSize: 16, marginBottom: 13 }}
                                    start={{ x: 1, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    colors={['#FFCB52', '#FF7B02']}>
                                    {item.name}
                                </GradientText>
                                <Text style={{
                                    fontSize: 10,
                                    color: 'white',
                                    fontWeight: '600'
                                }}>{item.price}</Text>
                                {<GradientText
                                    style={{ fontWeight: '600', fontSize: 11, marginTop: 23 }}
                                    start={{ x: 1, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    colors={['#FFCB52', '#FF7B02']}>
                                    {item.title}
                                </GradientText>}
                            </TouchableOpacity>
                        )}
                    />
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        disabled={!plan}
                      onPress={handleOpenPlan}
                      style={styles.primaryButton}>
                      <LinearGradient
                        colors={plan ? ['#FFCB52', '#FF7B02'] : ['#252525', '#252525']}
                        start={{ x: 1, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.gradient}>
                        <Text style={styles.btnText}>Continue</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </View>
                <Text style={{
                    color: 'white',
                    fontSize: 10,
                    textAlign: 'center',
                    marginTop: 17
                }}>Recurring billing, Cancel Anytime</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
    )
}

export default DatingSubscribe