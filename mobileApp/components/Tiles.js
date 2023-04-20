import {View, StyleSheet, TouchableHighlight} from 'react-native';
import React from 'react';

const Tiles = ({sizeStyles, children, active, tileStyles, onClick}) => {
  return (
    <TouchableHighlight style={{...sizeStyles}} onPress={onClick}>
      <View
        style={{
          ...styles.tiles,
          backgroundColor: active ? '#00ffb1' : '#56cfe1',
          ...tileStyles,
        }}>
        {children}
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  tiles: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    opacity: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 10,
  },
});

export default Tiles;
