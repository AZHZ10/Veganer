import React from 'react';
import { StyleSheet, Text, View, Image, useLayoutEffect, SafeAreaView, FlatList} from 'react-native';
import {useState} from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {menu, info} from '../screens/menuConstants';
import Loader from '../components/loadingComponent';
//이미지
import warnImg from "../screens/images/warning.png";
import nonImg from "../screens/images/non.png";
import { tan } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';

const MenuResultScreen = () => {
    const [loading] = useState(false);
    //json code -> 추후에 서버랑 연결하고 코드 변경할 예정
    const markResultItems = ({item, index}) => {
      return (
        <View style={styles.tablerow}>
          <View style={styles.table_colL}>
           {item.nonv == false && (
             <Image source={warnImg} style= {styles.image} />
           )}
           {item.nonv == true && (
            <Image source={nonImg} style= {styles.image} />
          )}
          </View>
          <View style={styles.table_colC}>
              <Text
                style={{
                  fontSize: wp(3.5),
                }}>
                {item.name}
              </Text>
            </View>
            <View style={styles.table_colR}>
              <Text
                style={{
                  fontSize: wp(3.5),
                }}>
                {item.info}
              </Text>
            </View>
      </View>
     );
   };

    return(
      <SafeAreaView style={styles.container}>
        <Loader loading={loading} /> 
        {loading && (
            <View
               style={{
               height: hp(100),
               justifyContent: 'center',
               alignItems: 'center',
             }}>
            <Text style={styles.title}>정보 읽어오는 중</Text>
           </View>
        )}

        {!loading && (
        <View style={styles.result_container}>
          <View style={styles.result_container_inner_l}>
            <Text style={styles.tablefont}>  </Text>
          </View>

          <View style={styles.result_container_inner_c}>
            <Text style={styles.tablefont}>메뉴</Text>
          </View>

          <View style={styles.result_container_inner_r}>
            <Text style={styles.tablefont}>주의 재료</Text>
          </View>
        </View> 
       )} 

       {!loading && (
         <View style={styles.flat_container}>
           <FlatList
             style={styles.list}
             data={menu}
             renderItem={markResultItems}
             keyExtractor={(item, index) => index.toString()}
           />
         </View> 
       )}
     </SafeAreaView>     
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: wp('5'),
        fontWeight: 'bold',
        paddingLeft: wp(4),
    },
    tablefont: {
        fontSize: wp('3.5%'),
        fontWeight: 'bold',
    },
    
    container: {
        flex: 1, //전체의 공간을 차지한다는 의미
        flexDirection: 'column',
        backgroundColor: 'white',
        paddingLeft: wp(1),
        paddingRight: wp(1),

    },
    image: {
        width: 20,
        height: 20,
    },

    //flat contatiner -> 밑에 뜨는 칼럼들 핑크색
    flat_container: {
        height: hp(60),
        marginRight: wp(1),
        marginLeft: wp(1),
        //paddingLeft: wp(1),
       // paddingRight: wp(1),
        marginBottom: wp(10),
   },
    tablerow: {
       flexDirection: 'row',
       alignItems: 'center',
       height: hp(7),
       borderBottomWidth: 1,
       borderColor: '#E0E0E0',
    },
    table_colL:{
        width: wp(18),
        height: hp(7),
        borderRightWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#E0E0E0',
    },
    table_colC:{
        width: wp(20),
        height: hp(7),
        borderRightWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',   
        borderColor: '#E0E0E0',
    },
    table_colR:{
        width: wp(60),
        height: hp(7),
        alignItems: 'center',
        justifyContent: 'center',    
    },

    //1. 가장 상단 메뉴, 주의 재료
    result_container: {
        height: hp(6),
        borderBottomWidth: 1,
        borderColor: '#E0E0E0',
        flexDirection: 'row',
        justifyContent: 'center',
        marginRight: wp(1),
        marginLeft: wp(1),
        marginTop: wp(5),
        backgroundColor: '#F5F6DD'
      },
    result_container_inner_l: {
        width: wp(20),
        borderRightWidth: 1,
        borderColor: '#E0E0E0',
        justifyContent: 'center',
        alignItems: 'center',
        
      },
    
    result_container_inner_c: {
        width: wp(20),
        borderRightWidth: 1,
        borderColor: '#E0E0E0',
        justifyContent: 'center',
        alignItems: 'center',
        
    },  

    result_container_inner_r: {
        width: wp(60),
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default MenuResultScreen;