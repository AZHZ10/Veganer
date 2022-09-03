import React, { useState } from "react";
import { View, Pressable, Platform } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import UploadModeModal from "../modal/CameraModal";
import { launchImageLibrary, launchCamera } from "react-native-image-picker";
import styled from 'styled-components/native';

const imagePickerOption = {
	mediaType: "photo",
	//maxWidth: 768,
	//maxHeight: 768,
	includeBase64: Platform.OS === "android",
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

function CameraButton() {

  // 선택 사진 또는 촬영된 사진 정보
  const onPickImage = (res) => { 
    if (res.didCancel || !res) {
      return;
    }
    console.log("PickImage", res);
  }
  
  // 카메라 촬영
  const onLaunchCamera = () => {
    launchCamera(imagePickerOption, onPickImage);
  };
  
  // 갤러리에서 사진 선택
  const onLaunchImageLibrary = () => {
    launchImageLibrary(imagePickerOption, onPickImage);
  };

  // 안드로이드를 위한 모달 visible 상태값
  const [modalVisible, setModalVisible] = useState(false);
  
  // 선택 모달 오픈
  const modalOpen = () => {
    if (Platform.OS === "android") { // 안드로이드
      setModalVisible(true); // visible = true
    } else { // iOS
      
    }
  }
  
  return (
    <>
    <Container>
         <Pressable onPress={modalOpen}>
          <Icon name="search" color="#3B8C66" size={24} />
         </Pressable>
     </Container>
      <UploadModeModal 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)}
        onLaunchCamera={onLaunchCamera}
        onLaunchImageLibrary={onLaunchImageLibrary} />
    </>
  );
}

export default CameraButton;