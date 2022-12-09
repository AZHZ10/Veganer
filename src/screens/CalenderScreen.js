import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { View, Dimensions, ImageBackground, Text, TouchableOpacity, Pressable, SafeAreaView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import { format } from "date-fns";
import Icon from 'react-native-vector-icons/AntDesign';
import UploadModeModal from "./CalenderModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from './styles.js';

const VEG_STEP_STORAGE_KEY = '@VegetarianismStep';
const VEG_STARTDATE_KEY = '@StepStartDate';
const MARKED_DATE_KEY = '@markedDates';

// 이 부분 필요한지 검토
const Container = styled.View`
  flex: 1;
`;

LocaleConfig.locales['fr'] = {
  monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
  monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
  dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: 'Aujourd\'hui'
};
LocaleConfig.defaultLocale = 'fr';

export const CalenderApp = () => {

  // 안드로이드를 위한 모달 visible 상태값
  const [modalVisible, setModalVisible] = useState(false);

  // 선택 모달 오픈
  const modalOpen = () => {
    if (Platform.OS === "android") { // 안드로이드
      setModalVisible(true); // visible = true
    } else { // iOS

    }
  }

  const [displaySelectStep, setDisplaySelectStep] = useState(false);
  const [displayMealSelection, setDisplayMealSelection] = useState(false);

  const [myStep, setMyStep] = useState("");
  const [startDay, setStartDay] = useState(format(new Date(), "yyyy-MM-dd"),);

  const displaytMyStep = () => {
    displaySelectStep ? setDisplaySelectStep(false) : setDisplaySelectStep(true);
  }
  const displayMySelection = () => {
    displayMealSelection ? setDisplayMealSelection(false) : setDisplayMealSelection(true);
  }
  const selectMyStep = (event) => {
    const selectedStep = event._targetInst.child.memoizedProps
    setStartDay(new Date());
    setMyStep(selectedStep);
    storeLocalStorage(VEG_STEP_STORAGE_KEY, selectedStep);
    setDisplaySelectStep(false);
    storeLocalStorage(VEG_STARTDATE_KEY, startDay);
  }

  const MyStepList = ["폴로", "페스코", "락토-오보", "락토", "오보", "비건", "플렉시"];
  const MyStepView = () => {
    return (
      <View style={styles.selectBtnContainer}>
        {MyStepList.map(item =>
          <TouchableOpacity >
            <Text style={styles.selectBtn} onPress={selectMyStep}>{item}</Text>
          </TouchableOpacity>
        )}
      </View>
    )
  }



  // 로컬 데이터 불러오는 함수
  useEffect(() => {
    const initCalendar = async () => {
      try {
        const vegStepValue = await AsyncStorage.getItem(VEG_STEP_STORAGE_KEY);
        const startDayValue = await AsyncStorage.getItem(VEG_STARTDATE_KEY);
        const markedDayValue = await AsyncStorage.getItem(MARKED_DATE_KEY);
        setMyStep(JSON.parse(vegStepValue));
        console.log(vegStepValue);
        setStartDay(JSON.parse(startDayValue));
        console.log(startDayValue);
        setMarkedDates(JSON.parse(markedDayValue));
        console.log(startDayValue);
        //밑으로 불러오는 거 작성
      } catch (e) {
        console.log('initCalendar error:', e);
      }
    }
    initCalendar();
  }, []);

  // 로컬 데이터에 저장하는 함수
  const storeLocalStorage = async (storageKey, value) => {//첫 번째 인자를 키, 두 번째 인자를 값으로 함수 사용
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(storageKey, jsonValue);
      console.log(`key: ${storageKey}, 저장된 값:`, jsonValue);
    } catch (e) {
      alert(`An error has occurred ${error}`);
    }
  }

  // 채식 날짜 계산
  const today = new Date();
  const diff = today-startDay;
  var currDay = 24 * 60 * 60 * 1000;
  const daynum = parseInt(diff/currDay)

  // 배열대신 object 사용
  const [selectedDate, setSelectedDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [markedDatesList, setMarkedDates] = useState({});

  const SelectMealView = (day) => {
    return (
      <View style={styles.selectMealContainer}>
        <View style={styles.whiteBox}>
          <View style = {{marginBottom:10}}>
            <Text style={styles.text}>오늘의 식사</Text>
            <Text>하루 세 끼 중 비건식으로 몇 번 드셨나요?</Text>
          </View>
          <SafeAreaView style={styles.time}>
            <Pressable onPress = {onpress_save1}>
              <Text style={styles.selectBtn}>1</Text>
            </Pressable>
            <Pressable onPress = {onpress_save2}>
              <Text style={styles.selectBtn}>2</Text>
            </Pressable>
            <Pressable onPress = {onpress_save3}>
              <Text style={styles.selectBtn}>3</Text>
            </Pressable>
          </SafeAreaView>
          <View style = {{alignItems:'center'}}>
            <Pressable onPress = {(day)=>deleteMarkedDate(selectedDate)}>
              <Text style={styles.deleteBtn}>오늘 기록 초기화</Text>
            </Pressable>
          </View>
        </View>
      </View>
    )
  };

  const dayPress = (day) => {
    setSelectedDate(day.dateString);
    displayMySelection();
    console.log('selectedDate',selectedDate);
  };

  // 표시 onpress 눌렀을 때 실행될 함수
  const onpress_save1 = async () => {
    const newMarkedDate = Object.assign({}, markedDatesList, {
      [selectedDate]:{
        customStyles: {
          container: {
            backgroundColor: '#E0F4E4'
          },
        }
      }
    });
    setMarkedDates(newMarkedDate);
    await saveMarkedDates(newMarkedDate);
    setDisplayMealSelection(false);
  };

    // 표시 onpress 눌렀을 때 실행될 함수
    const onpress_save2 = async () => {
      const newMarkedDate = Object.assign({}, markedDatesList, {
        [selectedDate]:{
          customStyles: {
            container: {
              backgroundColor: '#BCE8C5'
            },
          }
        }
      });
      setMarkedDates(newMarkedDate);
      await saveMarkedDates(newMarkedDate);
      setDisplayMealSelection(false);
    };

      // 표시 onpress 눌렀을 때 실행될 함수
  const onpress_save3 = async () => {
    const newMarkedDate = Object.assign({}, markedDatesList, {
      [selectedDate]:{
        customStyles: {
          container: {
            backgroundColor: '#8FD99F'
          },
        }
      }
    });
    setMarkedDates(newMarkedDate);
    await saveMarkedDates(newMarkedDate);
    setDisplayMealSelection(false);
    };

    // 로컬에 저장하는 함수
    const saveMarkedDates = async (toSave) => {
      await AsyncStorage.setItem(MARKED_DATE_KEY, JSON.stringify(toSave))
    };

  const deleteMarkedDate = (key) => {
    const newMarkedDate = {...markedDatesList};
    delete newMarkedDate[key];
    console.log('delete');
    setMarkedDates(newMarkedDate);
    saveMarkedDates(newMarkedDate);
    setDisplayMealSelection(false);
  };

  return (
    <>
      <Container>
        <View style={styles.header}>
          <ImageBackground source={require('./cal-img1.jpg')} style={styles.bgImage}>
            <View style={styles.headerTextView}>
              <TouchableOpacity onPress={displaytMyStep}>
                <Text style={styles.headerText}>{myStep} 베지테리언</Text>
              </TouchableOpacity>
              <Text style={styles.headerText}>{daynum+1}일째</Text>
            </View>
          </ImageBackground>
        </View>

        {displaySelectStep && <MyStepView />}
        
        

        <View style={styles.calendar}>
          
          <Calendar
            markingType={'custom'}
            markedDates={markedDatesList}

            theme={{
              'stylesheet.day.basic': {
                'base': {
                  width: 30,
                  height: 73
                }
              },
              'stylesheet.calendar.header': {
                dayTextAtIndex0: {
                  color: 'red'
                },
                dayTextAtIndex6: {
                  color: 'blue'
                }
              },
              backgroundColor: '#ffffff',
              calendarBackground: '#ffffff',
              textSectionTitleColor: '#b6c1cd',
              textSectionTitleDisabledColor: '#d9e1e8',
              selectedDayTextColor: 'black',
              selectedDayBackgroundColor: '',
              todayTextColor: '#009688',
              dayTextColor: '#2d4150',
              textDisabledColor: '#d9e1e8',
              arrowColor: '#81CC7E',
              disabledArrowColor: '#d9e1e8',
              monthTextColor: 'black',
              indicatorColor: 'blue',
              textDayFontFamily: 'monospace',
              textMonthFontFamily: 'monospace',
              textDayHeaderFontFamily: 'monospace',
              textDayFontWeight: '300',
              textMonthFontWeight: 'bold',
              textDayHeaderFontWeight: '300',
              textDayFontSize: 16,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 16
            }}


            // Initially visible month. Default = Date()
            current={Date()}
            // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
            minDate={'2020-01-01'}
            // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
            maxDate={'2030-12-31'}
            // Handler which gets executed on day press. Default = undefined
            onDayPress={(day) => {dayPress(day)}}
            // Handler which gets executed on day long press. Default = undefined
            onDayLongPress={(day) => { console.log('selected day', day) }}
            // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
            monthFormat={'yyyy MM'}
            // Handler which gets executed when visible month changes in calendar. Default = undefined
            onMonthChange={(month) => { console.log('month changed', month) }}
            // Hide month navigation arrows. Default = false
            hideArrows={false}
            // Replace default arrows with custom ones (direction can be 'left' or 'right')
            renderArrow={(direction) => direction === "left" ? (
              <Icon name="caretleft" size={20} color="#81CC7E" />
            ) : (
              <Icon name="caretright" size={20} color="#81CC7E" />
            )
            }
            // Do not show days of other months in month page. Default = false
            hideExtraDays={true}
            // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
            // day from another month that is visible in calendar page. Default = false
            disableMonthChange={true}
            // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
            firstDay={7}
            // Hide day names. Default = false
            hideDayNames={false}
            // Show week numbers to the left. Default = false
            showWeekNumbers={false}
            // Handler which gets executed when press arrow icon left. It receive a callback can go back month
            onPressArrowLeft={substractMonth => substractMonth()}
            // Handler which gets executed when press arrow icon right. It receive a callback can go next month
            onPressArrowRight={addMonth => addMonth()}
            // Disable left arrow. Default = false
            disableArrowLeft={false}
            // Disable right arrow. Default = false
            disableArrowRight={false}
            // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
            disableAllTouchEventsForDisabledDays={true}
          /** Replace default month and year title with custom one. the function receive a date as parameter. */
          //renderHeader={(date) => {/*Return JSX*/}}
          />
          {displayMealSelection && <SelectMealView/>}
        </View>
        
      </Container>

      <UploadModeModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)} />
    </>


  );
};
