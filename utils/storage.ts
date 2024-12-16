import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY="ywk-app";

export const storeData=async(value:object)=>{
    try{

        await AsyncStorage.setItem(KEY,JSON.stringify(value));

    }catch{
        return null;
    }
}

export const getData=async(key:string)=>{
    try{
       const data= await AsyncStorage.getItem(key);
        return data ? JSON.parse(data):[];
    }catch{
        return null;
    }
}