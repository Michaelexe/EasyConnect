import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useState} from 'react';
import {Button, Input} from 'native-base';
import {socket} from '../socket';
import logoPNG from '../assets/logo.png';

const ConnectScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = () => {
    socket.emit('connect-mobile', {username, password});
  };

  return (
    <View style={styles.beforeIp}>
      <Image
        source={logoPNG}
        style={{width: 300, height: 93, marginBottom: 70, marginTop: -40}}
      />
      <Text style={styles.beforeIpText}>
        Enter the code you see on your laptop!
      </Text>
      <Input
        size="2xl"
        placeholder="Enter Username"
        variant="outline"
        type="text"
        color={'white'}
        value={username}
        onChange={e => {
          setUsername(e.nativeEvent.text);
        }}
        marginTop={6}
      />
      <Input
        size="2xl"
        placeholder="Enter Password"
        variant="outline"
        type="text"
        color={'white'}
        value={password}
        onChange={e => {
          setPassword(e.nativeEvent.text);
        }}
        marginTop={2}
        marginBottom={6}
      />
      <Button width={'100%'} onPress={onSubmitHandler}>
        Connect
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  beforeIp: {
    height: '100%',
    width: '100%',
    backgroundColor: '#000519',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },

  beforeIpText: {
    color: 'white',
    fontSize: 21,
    fontWeight: '300',
    textAlign: 'center',
  },
});

export default ConnectScreen;
