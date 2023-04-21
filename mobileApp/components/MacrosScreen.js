import {View, Text, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import React, {useContext, useState} from 'react';
import Tiles from './Tiles';
import YoutubeMacro from './YoutubeMacro';
import {userContext} from '../context';
import BrightnessSlider from './BrightnessSlider';
import VolumeSlider from './VolumeSlider';

const MacrosScreen = () => {
  const {user} = useContext(userContext);
  const [brightness, setBrightness] = useState(user.brightness);
  const [volume, setVolume] = useState(user.volume);
  return (
    <SafeAreaView>
      <View style={styles.appBar}>
        <Text style={styles.appBarText}>{user.username}</Text>
      </View>
      <View style={styles.mainContainer}>
        <ScrollView style={{height: '100%'}}>
          <View
            style={{
              flexDirection: 'row',
              columnGap: 7,
            }}>
            <View
              style={{
                width: '50%',
                rowGap: 7,
                flex: 2,
                aspectRatio: 1,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  columnGap: 7,
                }}>
                <Tiles sizeStyles={{aspectRatio: '1', flex: 1}} active />
                <Tiles sizeStyles={{aspectRatio: '1', flex: 1}} />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  columnGap: 7,
                }}>
                <Tiles sizeStyles={{aspectRatio: '1', flex: 1}} />
                <Tiles sizeStyles={{aspectRatio: '1', flex: 1}} />
              </View>
            </View>
            <YoutubeMacro />
          </View>
          <View>
            <BrightnessSlider
              brightness={brightness}
              setBrightness={setBrightness}
            />
            <VolumeSlider volume={volume} setVolume={setVolume} />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: '#000519',
    display: 'flex',
    padding: 12,
    columnGap: 5,
    rowGap: 5,
  },
  appBar: {
    backgroundColor: '#000519',
    height: 70,
    justifyContent: 'center',
    paddingHorizontal: 15,
    shadowColor: '#00ffff',
    elevation: 20,
  },
  appBarText: {
    color: 'cyan',
    fontSize: 25,
    textTransform: 'uppercase',
    fontWeight: '700',
  },
});

export default MacrosScreen;
