import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import React, {useContext, useState} from 'react';
import Tiles from './Tiles';
import YoutubeMacro from './YoutubeMacro';
import {userContext} from '../context';
import BrightnessSlider from './BrightnessSlider';
import VolumeSlider from './VolumeSlider';
import {socket} from '../socket';
import spotifyPNG from '../assets/spotify.png';
import vscodePNG from '../assets/vscode.png';

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
                <Tiles
                  sizeStyles={{aspectRatio: '1', flex: 1}}
                  onClick={() => {
                    socket.emit('command', {
                      type: 'vscode',
                      data: {},
                      ...user,
                    });
                  }}>
                  <Image
                    source={vscodePNG}
                    style={{width: '80%', aspectRatio: 1, height: undefined}}
                  />
                </Tiles>
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
          <View style={{flexDirection: 'row', columnGap: 7}}>
            <Tiles
              sizeStyles={{aspectRatio: '1', flex: 1}}
              onClick={() => {
                socket.emit('command', {
                  type: 'spotify',
                  data: {},
                  ...user,
                });
              }}>
              <Image
                source={spotifyPNG}
                style={{width: '60%', aspectRatio: 1, height: undefined}}
              />
              <Text style={{fontSize: 20, fontWeight: '800'}}>
                Play Spotify
              </Text>
            </Tiles>
            <Tiles sizeStyles={{aspectRatio: '1', flex: 1}} />
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
