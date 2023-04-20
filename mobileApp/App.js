import {View, Text, ScrollView} from 'react-native';
import {NativeBaseProvider} from 'native-base';
import React, {useEffect, useState} from 'react';
import {userContext} from './context';
import ConnectScreen from './components/ConnectScreen';
import {socket} from './socket';
import MacrosScreen from './components/MacrosScreen';

const App = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    socket.connect();
    socket.on('connected', user => {
      console.log(user);
      setUser(user);
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <userContext.Provider value={{user, setUser}}>
      <NativeBaseProvider>
        {!user ? <ConnectScreen /> : <MacrosScreen />}
      </NativeBaseProvider>
    </userContext.Provider>
  );
};

export default App;
