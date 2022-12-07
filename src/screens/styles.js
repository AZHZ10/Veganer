import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    // calendar styles
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
      alignContent: "center",
      justifyContent: "center",
      flexDirection: "row",
      flexWrap: "wrap",
      position: "absolute",
      top: 70,
      left: 40,
      zIndex: 3,
      width: "80%",
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      borderColor: '#60BF81',
      borderRadius: 20,
      paddingVertical: 10,
    },
    // modal styles
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
        fontSize: 20,
        fontWeight:"bold"
      },
      buttonContainer : {
        width : 70,
        alignItems : 'center',
        border : 1
      }
  })


export default styles;