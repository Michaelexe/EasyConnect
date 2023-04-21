import {View, StyleSheet, Image} from 'react-native';
import {Slider} from 'native-base';
import React, {useContext} from 'react';
import {socket} from '../socket';
import brightnessPNG from '../assets/brightness.png';
import {userContext} from '../context';

const BrightnessSlider = ({brightness, setBrightness}) => {
  const {user} = useContext(userContext);
  const onChangeHandler = brightness => {
    socket.emit('command', {
      type: 'brightness',
      data: {
        brightness,
      },
      ...user,
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
