import React from 'react'
import { View,Text,StyleSheet, Pressable, Alert } from 'react-native'
import { pushNotificationsAsync } from '../utils/push-notifications-async'
import * as Notifications from "expo-notifications"

const Creation = () => {
  const pushNotification=async()=>{

    const result=await pushNotificationsAsync();
    
    if(result === "granted"){
        await Notifications.scheduleNotificationAsync({
          content:{
            title:"I am notification from expo go",
          },
          trigger:{
            type:Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
            seconds:10,
            repeats:false,
          }
        })
        console.log(result);
    }else {
      Alert.alert("Permission Denied","You need to enable notifications in the app setting to use this features");
    }
  
  }
  return (
    <View style={styles.container}>
       <Pressable style={styles.button} onPress={pushNotification} >
          <Text style={styles.label}>Push Notifications</Text>
       </Pressable>
    </View>

  )
}

export default Creation

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    },
    button:{
      padding:10,
      backgroundColor:"#000",
    },
    label:{
      color:"#fff",
      fontSize:18,
    }
})