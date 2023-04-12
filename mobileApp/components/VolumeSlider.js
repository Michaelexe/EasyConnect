import {View, StyleSheet, Image} from 'react-native';
import {Slider} from 'native-base';
import React from 'react';
import axios from 'axios';

import volumePNG from '../assets/volume.png';

const VolumeSlider = ({ip, volume, setVolume}) => {
  const onChangeHandler = volume => {
    axios
      .get(`http://${ip}:8080/api/sliders/volume/?p=${Math.floor(volume)}`)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(JSON.stringify(err));
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
