import {Text} from 'react-native';
import {AlertDialog, Button, TextArea} from 'native-base';
import React, {useState} from 'react';
import questionPNG from '../assets/question.png';
import MacroBlock from './MacroBlock';
import axios from 'axios';

const FAQ = ({ip}) => {
  const [faqSearch, setFaqSearch] = useState('');
  const [faqResponse, setFaqResponse] = useState();
  const [faqPrompt, setFaqPrompt] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <MacroBlock
        icon={questionPNG}
        color="orange"
        onClick={() => {
          setFaqPrompt(true);
        }}
        text={'Ask A Computer!'}
      />
      <AlertDialog
        isOpen={faqPrompt}
        onClose={() => {
          setFaqPrompt(false);
        }}>
        <AlertDialog.Content style={{width: '90%'}}>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Ask A Computer!</AlertDialog.Header>
          <AlertDialog.Body>
            <TextArea
              size="2xl"
              h={200}
              placeholder="Search something!"
              variant="outline"
              type="text"
              value={faqSearch}
              onChange={e => {
                setFaqSearch(e.nativeEvent.text);
              }}
              marginY={6}
            />
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group>
              <Button
                isLoading={loading}
                width={'100%'}
                onPress={() => {
                  setLoading(true);
                  axios
                    .post(`http://${ip}:8080/api/faq`, {faqSearch})
                    .then(res => {
                      setFaqPrompt(false);
                      setFaqSearch('');
                      setFaqResponse(res.data);
                      console.log(res.data);
                      setLoading(false);
                    })
                    .catch(err => {
                      console.log(err);
                    });
                }}>
                Search
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
      <AlertDialog
        isOpen={faqResponse != undefined}
        onClose={() => {
          setFaqResponse();
        }}>
        <AlertDialog.Content style={{width: '90%'}}>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Here's how they responded!</AlertDialog.Header>
          <AlertDialog.Body>
            <Text style={{fontSize: 17}}>{faqResponse}</Text>
          </AlertDialog.Body>
        </AlertDialog.Content>
      </AlertDialog>
    </>
  );
};

export default FAQ;
