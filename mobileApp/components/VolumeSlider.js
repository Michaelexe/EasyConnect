import {View, StyleSheet, Image} from 'react-native';
import {Slider} from 'native-base';
import React, {useContext} from 'react';
import {socket} from '../socket';

import volumePNG from '../assets/volume.png';
import {userContext} from '../context';

const VolumeSlider = ({volume, setVolume}) => {
  const {user} = useContext(userContext);
  const onChangeHandler = volume => {
    socket.emit('command', {
      type: 'volume',
      data: {
        volume,
      },
      ...user,
    });
  };
  return (
    <View style={styles.volumeSlider}>
      <Image
        source={volumePNG}
        style={{height: 40, width: 40, marginRight: 10}}
      />
      <View style={{flex: 1}}>
        <Slider
          defaultValue={70}
          minValue={0}
          maxValue={100}
          step={10}
          value={volume}
          onChangeEnd={newVolume => {
            onChangeHandler(newVolume);
            setVolume(newVolume);
          }}>
          <Slider.Track>
            <Slider.FilledTrack />
          </Slider.Track>
          <Slider.Thumb />
        </Slider>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  volumeSlider: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
  },
});

export default VolumeSlider;
