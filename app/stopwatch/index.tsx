import { useRouter } from 'expo-router'
import React from 'react'
import { View, Text, TouchableOpacity,StyleSheet } from 'react-native'

const StopWatch = () => {

    const router=useRouter();

    const goToCreation=()=>{

        console.log("Go to Creation");
        router.navigate("/creation");
    }

  return (
    <View style={styles.container}>
        <Text>Stop Watch</Text>

        <TouchableOpacity onPress={goToCreation}>
                <Text>Go To Creation</Text>
        </TouchableOpacity>

    </View>

  )
}

export default StopWatch

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    }
})