import React, { useState } from "react";
import { StyleSheet, Modal, View, Pressable, Text, SafeAreaView, TouchableHighlight } from "react-native";

const Button_Dictionary = () => {
  
};

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

const styles = StyleSheet.create({
  background: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  whiteBox: {
    width: 250,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5,
    padding : 20
  },
  time : {
    flexDirection : 'row',
    alignItems : "stretch"
  },
  timeButton : {
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    width:70,
    height:30,
    backgroundColor:'#fff',
    borderRadius:50,
  },
  actionButton: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: 26,
  },
  buttonContainer : {
    width : 70,
    alignItems : 'center',
    border : 1
  }
});

export default UploadModeModal;