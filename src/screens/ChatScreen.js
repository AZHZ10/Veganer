import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import AutoHeightImage from 'react-native-auto-height-image';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align=items: center;
`;

const STORAGE_KEY = '@VeganerQnas'
const SERVER_URL = 'http://35.74.65.77:5000/question';

export const Chat = () => {
  const [question, setQuestion] = useState(''); //사용자 질문 저장
  const [serverAnswer, setServerAnswer] = useState(''); //서버 답변 저장
  const [qnas, setQnas] = useState({}); //qna 저장

  const onChangeQuestion = (payload) => setQuestion(payload);

  useEffect(() => { //기간이 지난 것을 지움
    const initQnas = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY)
        setQnas(JSON.parse(jsonValue));
        return jsonValue != null ? JSON.parse(jsonValue) : {};
      } catch (e) {
        // error reading value
        console.log('initQnas error:', e);
      }
    }
    initQnas();
  }, []); //처음 실행될 때

  useEffect(() => {
    const storeQnas = async (value) => {
      try {
        const jsonValue = JSON.stringify(value)
        //console.log('저장되어 있는 리스트', value);
        await AsyncStorage.setItem(STORAGE_KEY, jsonValue)
      } catch (e) {
        // saving error
        alert(`An error has occurred ${error}`);
      }
    }
    storeQnas(qnas);
  }, [qnas]);

  useEffect(() => {
    addAnswerToQnas();
  }, [serverAnswer]);

  const addQuestionToQnas = () => {
    if (question === '') {
      return;
    }
    const date = new Date();
    const newQnas = { ...qnas, [date.getTime()]: { question, isQ: true, date: date.getDate() } };
    setQnas(newQnas);
    getAnswer(question);
    setQuestion('');
  }

  const addAnswerToQnas = () => {
    if (serverAnswer === '') {
      return;
    }
    const date = new Date();
    const newQnas = { ...qnas, [date.getTime()]: { serverAnswer, isQ: false, date: date.getDate() } };
    setQnas(newQnas);
    setServerAnswer('');
  }

  const getAnswer = async (question) => {
    try {
      const response = await fetch(SERVER_URL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: question
        })
      });
      const json = await response.json();
      setServerAnswer(json.answer);
    } catch (error) {
      console.log(error);
    }
  }

  const deleteAll = () => {
    const emptyQnas = {}
    setQnas(emptyQnas);
  }

  const getHello = async () => {
    try {
      const response = await fetch('http://43.206.162.24:5000/hello'); //public IP v4
      const data = await response.json();
      console.log(data);
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <Container>
      <ScrollView style={styles.chatContainer}>
        {Object.keys(qnas).map(key =>
          qnas[key].isQ ? (
            <View style={styles.question} key={key}>
              <Text style={styles.questionText}>{qnas[key].question}</Text>
            </View>) : (
            <View style={styles.answerWithChar}>
              <AutoHeightImage
                width={60}
                source={require('./Veganee.png')}
              />
              <View style={styles.answer} key={key}>
                <Text style={styles.answerText}>{qnas[key].serverAnswer}</Text>
              </View>
            </View>))}
      </ScrollView>
      {/* {<TouchableOpacity onPress={deleteAll}>
        <Text style={styles.deleteBtn}>delete All</Text>
      </TouchableOpacity>} */}
      <TextInput
        placeholder='궁금한 게 있으신가요?'
        value={question}
        onChangeText={onChangeQuestion}
        onSubmitEditing={addQuestionToQnas}
        style={styles.textinput}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  chatContainer: {
    flex: 1
  },
  question: {
    backgroundColor: '#3B8C66',
    padding: 12,
    margin: 5,
    borderRadius: 17,
    maxWidth: '50%',
    alignSelf: 'flex-end',
  },
  questionText: {
    color: 'white'
  },
  answer: {
    backgroundColor: '#EBEBEB',
    padding: 12,
    margin: 5,
    borderRadius: 17,
    maxWidth: '50%',
    alignSelf: 'flex-start'
  },
  answerText: {
    color: 'black',
  },
  textinput: {
    backgroundColor: 'white',
    paddingLeft: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20

  },
  deleteBtn: {
    backgroundColor: 'white',
    borderColor: '#60BF81',
    borderWidth: 1,
    borderRadius: 10,
    width: 100,
    padding: 5,
    alignSelf: 'center',
    textAlign: 'center',
    margin: 10
  },
  answerWithChar: {
    flexDirection: 'row',
    marginLeft: 5
  }
})