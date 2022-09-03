import React, {useState} from "react";
import {View, Pressable, StyleSheet, Platform} from 'react-native';
import {useSafeAreaInsets } from "react-native-safe-area-context";
import { launchImageLibrary, launchCamera } from "react-native-image-picker";
import UploadModeModal from "../modal/CameraModal";
import  Icon  from "react-native-vector-icons/MaterialIcons";

const TABBAR_HEIGHT = 49;

const imagePickerOption = {
	mediaType: "photo",
	maxWidth: 768,
	maxHeight: 768,
	includeBase64: Platform.OS === "android",
};

function CameraButton(){
    const insets = useSafeAreaInsets();
    
  // 안드로이드를 위한 모달 visible 상태값
    const [modalVisible, setModalVisible] = useState(false);

    const bottom = Platform.select({
        android: TABBAR_HEIGHT / 2,
        ios: TABBAR_HEIGHT / 2 + insets.bottom - 4,
    });

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
  
  // 선택 모달 오픈
  const onPress = () => {
    if (Platform.OS === "android") { // 안드로이드
      setModalVisible(true); // visible = true
    } else { // iOS
      
    }
  }

    return (
      <>
        <View style = {[styles.wrapper, {bottom}]}>
            <Pressable
               android_ripple={{
               color: '#ffffff',
               }}
               style={styles.circle}
               onPress={() => setModalVisible(true)}>
             <Icon name = "camera-alt" color = "white" size={27} />
           </Pressable>
        </View>
        <UploadModeModal 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)}
        onLaunchCamera={onLaunchCamera}
        onLaunchImageLibrary={onLaunchImageLibrary} />
      </>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        zIndex: 5,
        borderRadius: 27,
        height: 54,
        width: 54,
        position: 'absolute',
        left: '50%',
        transform: [
            {
                translateX: -27,
            },
        ],
        ...Platform.select({
            ios:{
              shadowColor: '#4d4d4d',
              shadowOffset: {width: 0, height: 4},
              shadowOpacity: 0.3,
              shadowRadius: 4,
            },
            android: {
                elevation: 5,
                overflow: 'hidden',
            },
        }),
     },
    circle: {
        backgroundColor: "#3B8C66",
        borderRadius: 27,
        height: 54,
        width: 54,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default CameraButton;