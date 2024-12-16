
import { Alert, FlatList, LayoutAnimation, Platform, Pressable, ScrollView, StatusBar, StyleSheet, Text, TextInput, UIManager, View } from 'react-native';
import List from '../components/list';
import { useEffect, useState } from 'react';
import { Link } from 'expo-router';
import { getData, storeData } from '../utils/storage';
import * as Haptics from 'expo-haptics'; 

const KEY="ywk-app";

type TodosListType={
  id:string;
  message:string;
  isDone:boolean;
}

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}
// const staticTodos:TodosListType[]=[
//   {
//     id:"1",
//     message:"Wake Up",
//     isDone:false,
//   },
//   {
//     id:"2",
//     message:"Have Breakfast",
//     isDone:false,
//   },
//   {
//     id:"3",
//     message:"Go To Work",
//     isDone:true,
//   }

// ]
// const tempArray=new Array(500).fill(null).map((item,index)=>{
//   return {
//     id:String(index+1),
//     message:String(index+1),
//     isDone:false,
//   }
// })

export default function App() {

  const [inputVal,setInputVal]=useState<string>("");
  const [todos,setTodos]=useState<TodosListType[]>([]);
  

const changeStatus=async(id:string)=>{
  const updatedTodo=todos.map(td=>td.id ===id? {...td,isDone:!td.isDone} : td);
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  setTodos(updatedTodo);
  await storeData(updatedTodo);
}

const addNewTodo=async()=>{
  const newTodos=[
    ...todos,{id:(String(todos.length+1)),message:inputVal,isDone:false}
  ]
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  setTodos(newTodos);
  await storeData(newTodos);
  setInputVal("");
}

const undoStatus=(id:string)=>{
Alert.alert("Hey","Are you sure to undo",[
{
  text:"Cancel",
  onPress:()=>{},
  style:"cancel",
},
{
  text:"Yes",
  onPress:async()=>{
    const updatedTodo=todos.map(td=>td.id===id? {...td,isDone:!td.isDone} :td);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
   setTodos(updatedTodo);

    await storeData(updatedTodo);
  },
  style:"default",

}

])

}

const deleteAllTodos=async()=>{
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  setTodos([]);
  await storeData([]);
}

useEffect(()=>{
  const getTodoData=async()=>{
    const todoData=await getData(KEY);
    setTodos(todoData);
   
  }
  getTodoData();

},[])

  return (
    <View 
    style={styles.container}
      >
      
      <View style={{width:"100%",paddingHorizontal:16,}} >
          <TextInput 
          placeholder='Enter any text' 
          keyboardType="default" 
          enterKeyHint='search'
          onChangeText={setInputVal}
          onSubmitEditing={addNewTodo}
          style={styles.inputBox}
          value={inputVal}
          />
      </View>


      <View style={styles.listContent} >
          {/* {

            todos.map(td=>(
              <List key={td.id} {...td} 
              changeStatus={changeStatus} 
              undoStatus={undoStatus}
              
              />

            ))

          }   */}

          <FlatList 

          ListEmptyComponent={
          <View>
            <Text style={styles.toDoStyle} >No To dos</Text>
          </View>}
          data={todos} 
          renderItem={({item})=>{
            console.log(item);
            return <List {...item} changeStatus={changeStatus} undoStatus={undoStatus} /> }}
            keyExtractor={(item)=>item.id}

            ListFooterComponent={
              <View>
                  {
                    todos?.length !==0 && (
                      <Pressable style={styles.dangerContainer} onPress={deleteAllTodos}>
                            <Text style={styles.textDanger}>Delete All</Text>   
                      </Pressable>
                    )
                  }

              </View>

            }

         />
         
      </View>     
        
    <StatusBar barStyle={"dark-content"} backgroundColor={"#fff"} />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContent:{
    flex:1,
    paddingHorizontal:16,
    gap:3,

    
  },
  inputBox:{
    borderWidth:1,
    borderColor:"lightgray",
    marginTop:6,
    textAlign:"center",
    marginVertical:6,
  },
  toDoStyle:{
    color:"lightgray",
    fontSize:22,
  },
  textDanger:{
    textAlign:"center",
    fontSize:16,
    color:"#fff",
  },
  dangerContainer:{
    backgroundColor:"red",
    paddingVertical:10,
    marginVertical:10,
  }
  
  
});
