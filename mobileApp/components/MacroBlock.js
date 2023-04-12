import {View, Text, TouchableHighlight, Image} from 'react-native';
import React from 'react';
import axios from 'axios';

const MacroBlock = ({color, text, route, width, height, icon, onClick}) => {
  const onClickHandler = () => {
    console.log('going here');
    axios
      .get(route)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(JSON.stringify(err));
      });
  };

  return (
    <TouchableHighlight
      onPress={onClick ? onClick : route ? onClickHandler : null}>
      <View
        elevation={0}
        style={{
          borderColor: color,
          borderWidth: 2,
          borderRadius: 10,
          width: width ? width : '100%',
          height: height ? height : null,
          padding: 15,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: 10,
          shadowColor: color,
          shadowOpacity: 0.1,
          shadowRadius: 0.1,
        }}>
        {icon ? (
          <Image
            source={icon}
            style={{width: 80, height: 80, marginBottom: 10}}
          />
        ) : null}
        <Text
          style={{
            color: 'white',
            fontWeight: '800',
            fontSize: 20,
            textAlign: 'center',
          }}>
          {text}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

export default MacroBlock;
