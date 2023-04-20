import {View, Text, Image} from 'react-native';
import {AlertDialog, Input, Button} from 'native-base';
import React, {useState, useContext} from 'react';
import Tiles from './Tiles';
import {socket} from '../socket';
import youtubePNG from '../assets/youtube.png';
import {userContext} from '../context';

const YoutubeMacro = () => {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState('');
  const {user} = useContext(userContext);
  const submitHandler = () => {
    socket.emit('command', {
      type: 'youtube',
      data: {
        search,
      },
      ...user,
    });
    setShow(false);
  };

  return (
    <>
      <Tiles
        sizeStyles={{aspectRatio: '1', flex: 2}}
        onClick={() => {
          setShow(true);
        }}>
        <Image
          source={youtubePNG}
          style={{width: '60%', aspectRatio: 1, height: undefined}}
        />
        <Text style={{fontSize: 20, fontWeight: '800'}}>Play Music</Text>
      </Tiles>
      <AlertDialog
        isOpen={show}
        onClose={() => {
          setShow(false);
        }}>
        <AlertDialog.Content style={{width: '90%'}}>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Search:</AlertDialog.Header>
          <AlertDialog.Body>
            <Input
              size="2xl"
              placeholder="Search!"
              variant="outline"
              type="text"
              value={search}
              onChange={e => {
                setSearch(e.nativeEvent.text);
              }}
              marginY={6}
            />
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button width={'100%'} onPress={submitHandler}>
              Search
            </Button>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </>
  );
};

export default YoutubeMacro;
