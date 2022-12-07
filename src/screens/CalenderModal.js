import React, { useState } from "react";
import { Modal, View, Pressable, Text, SafeAreaView} from "react-native";
import styles from './styles.js';

function UploadModeModal({
  visible, 
  onClose, 
}) {

  const [isSelect, setSelect] = useState([false, false, false]);

  const getButton= (id: number) => {
    return (
      <Pressable
        style={[
          styles.buttonContainer,
          {backgroundColor: isSelect[id] ? 'white' : '#8FD99F'},
        ]}
        onPress={() => {
          setSelect([
            ...isSelect.slice(0, id),
            !isSelect[id],
            ...isSelect.slice(id + 1),
          ]);
        }}>
      {id === 0 && (<Text>아침</Text>)}
      {id === 1 && (<Text>점심</Text>)}
      {id === 2 && (<Text>저녁</Text>)}
      </Pressable>
    );
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose} >
      
      <Pressable style={styles.background} onPress={onClose}>
        <View style={styles.whiteBox}>
          <Text>오늘의 식사</Text>
          <Text>비건식으로 먹은 식사를 선택해 주세요</Text>
          <Text></Text>
          
          <SafeAreaView style={styles.time}>
            {getButton(0)}
            {getButton(1)}
            {getButton(2)}
          </SafeAreaView>
        </View>

      </Pressable>
    </Modal>
  );
}

export default UploadModeModal;