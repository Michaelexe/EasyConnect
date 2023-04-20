import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Tiles from './Tiles';
import YoutubeMacro from './YoutubeMacro';

const MacrosScreen = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={{flexDirection: 'row', columnGap: 7, flex: 4}}>
        <View
          style={{
            width: '50%',
            rowGap: 7,
            flex: 2,
          }}>
          <View style={{flexDirection: 'row', columnGap: 7}}>
            <Tiles sizeStyles={{aspectRatio: '1', flex: 1}} active />
            <Tiles sizeStyles={{aspectRatio: '1', flex: 1}} />
          </View>
          <View style={{flexDirection: 'row', columnGap: 7}}>
            <Tiles sizeStyles={{aspectRatio: '1', flex: 1}} />
            <Tiles sizeStyles={{aspectRatio: '1', flex: 1}} />
          </View>
        </View>
        <YoutubeMacro />
      </View>
    </View>
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
});

export default MacrosScreen;
