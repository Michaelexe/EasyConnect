import {View, StyleSheet, Image} from 'react-native';
import {Slider} from 'native-base';
import React from 'react';
import axios from 'axios';
import brightnessPNG from '../assets/brightness.png';

const BrightnessSlider = ({ip, brightness, setBrightness}) => {
  const onChangeHandler = brightness => {
    axios
      .get(
        `http://${ip}:8080/api/sliders/brightness?p=${Math.floor(brightness)}`,
      )
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <View style={styles.brightnessSlider}>
      <Image
        source={brightnessPNG}
        style={{height: 40, width: 40, marginRight: 10}}
      />
      <View style={{flex: 1}}>
        <Slider
          defaultValue={70}
          minValue={0}
          maxValue={100}
          step={10}
          value={brightness}
          onChangeEnd={brightness => {
            onChangeHandler(brightness);
            setBrightness(brightness);
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
  brightnessSlider: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
  },
});

export default BrightnessSlider;
