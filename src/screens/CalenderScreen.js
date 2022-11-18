import React, { useState } from 'react';
import styled from 'styled-components/native';
import { View, Dimensions, StyleSheet, ImageBackground, Text, TouchableOpacity } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import CalendarHeader from 'react-native-calendars/src/calendar/header';
import Icon from 'react-native-vector-icons/AntDesign';
import UploadModeModal from "../modal/CalenderModal";

const Width = Dimensions.get('window').width;    //스크린 너비 초기화
const Height = Dimensions.get('window').height;  //스크린 높이 초기화

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

const styles = StyleSheet.create({
  header: {
    flex: 1.15
  },
  headerTextView: {
    padding: 30
  },
  headerText: {
    fontSize: 25,
    color: 'white',
  },
  calendar: {
    flex: 5,
    backgroundColor: 'white',
    padding: 1
  },
  bgImage: {
    width: '100%', height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  selectBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderColor: '#60BF81',
    borderWidth: 1,
    borderRadius: 10,
    width: 70,
    padding: 5,
    textAlign: 'center',
    margin: 10
  },
  selectBtnContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    position: "absolute",
    width: "80%",
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderColor: '#60BF81',

  }

})

export const CalenderApp = () => {

  const markedDates = {
    '2022-09-15': {
      customStyles: {
        container: {
          backgroundColor: '#8FD99F'
        },
      }
    },
    '2022-10-09': {
      customStyles: {
        container: {
          backgroundColor: '#8FD99F'
        },
      }
    },
    '2022-10-10': {
      customStyles: {
        container: {
          backgroundColor: '#BCE8C5',
        },
      }
    },
    '2022-10-31': {
      customStyles: {
        container: {
          backgroundColor: '#8FD99F'
        },
      }
    }
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

  const [displaySelectStep, setDisplaySelectStep] = useState(false);
  const selectMyStep = () => {
    displaySelectStep ? setDisplaySelectStep(false) : setDisplaySelectStep(true);
    console.log(displaySelectStep);
  }
  const MyStepList = ["폴로", "페스코", "락토-오보", "락토", "오보", "비건", "플렉시"];
  const MyStepView = () => {
    return (
      <View style={styles.selectBtnContainer}>
        {MyStepList.map(item =>
          <TouchableOpacity>
            <Text style={styles.selectBtn}>{item}</Text>
          </TouchableOpacity>
        )}
      </View>
    )
  }

  return (
    <>
      <Container>

        <View style={styles.header}>
          <ImageBackground source={require('./cal-img1.jpg')} style={styles.bgImage}>
            <View style={styles.headerTextView}>
              <TouchableOpacity onPress={selectMyStep}>
                <Text style={styles.headerText}>페스코 베지테리언</Text>
              </TouchableOpacity>
              <Text style={styles.headerText}>686일째</Text>
            </View>
          </ImageBackground>
        </View>

        {<MyStepView />}

        <View style={styles.calendar}>
          <Calendar
            markingType={'custom'}
            markedDates={markedDates}

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
              selectedDayTextColor: '#ffffff',
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
            onDayPress={modalOpen}
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
        </View>
      </Container>

      <UploadModeModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)} />
    </>


  );
};
