import React from "react";
import { StyleSheet, Modal, View, Pressable, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

function UploadModeModal({
  visible, 
  onClose, 
}) {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose} >
      
      <Pressable style={styles.background} onPress={onClose}>
        <View style={styles.whiteBox}>
          <Text>오늘의 식사</Text>
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
});

export default UploadModeModal;