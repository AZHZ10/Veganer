import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const StyledText = styled.Text`
  font-size: 30px;
`;

export const Chat = () => {
  const [text, setText] = useState('');
  const [qnas, setQnas] = useState({});

  const [serverAnswer, setServerAnswer] = useState('');

  const onChangeText = (payload) => setText(payload);
  const onChangeServerAnswer = (payload) => setServerAnswer(payload);

  const addQnas = () => {
    if (text === '') {
      return;
    }
    const newQnas = { ...qnas, [Date.now()]: { text, isQ: true } };
    setQnas(newQnas);
    setText('');
  }

  const addAnswers = () => {
    if (serverAnswer === '') {
      return;
    }
    const newQnas = { ...qnas, [Date.now()]: { serverAnswer, isQ: false } };
    setQnas(newQnas);
    setServerAnswer('');
  }


  const saveQnas = async (toSave) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave))
  }
  const deleteAll = () => {
    const emptyQnas = {}
    setQnas(emptyQnas);
  }

  return (
    <Container>
      <TextInput
        placeholder='서버 답변은 이렇게 할 예정'
        value={serverAnswer}
        onChangeText={onChangeServerAnswer}
        onSubmitEditing={addAnswers}
        style={styles.textinput}
      />
      <ScrollView style={styles.chatContainer}>
        {Object.keys(qnas).map(key =>
          qnas[key].isQ ? (
            <View style={styles.question} key={key}>
              <Text style={styles.questionText}>{qnas[key].text}</Text>
            </View>) : (<View style={styles.answer} key={key}>
              <Text style={styles.answerText}>{qnas[key].serverAnswer}</Text>
            </View>))}
      </ScrollView>
      <TouchableOpacity onPress={deleteAll}>
        <Text style={styles.deleteBtn}>delete All</Text>
      </TouchableOpacity>
      <TextInput
        placeholder='궁금한 게 있으신가요?'
        value={text}
        onChangeText={onChangeText}
        onSubmitEditing={addQnas}
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
  }

})