// import { Stack } from 'expo-router'
// import React from 'react'

// const Layout = () => {
//   return (
//     <Stack>
//         <Stack.Screen name='index' options={{title:"Todos App"}} />
//         <Stack.Screen name='stopwatch' options={{title:"Stopwatch App"}} />
//         <Stack.Screen name='creation' options={{
//             title:"Student App",
//             presentation:"modal", animation:"slide_from_bottom" 
//             }} />
//     </Stack>
//   )
// }

// export default Layout

import { Tabs } from 'expo-router'
import React from 'react'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';

const Layout = () => {
  return (
   <Tabs screenOptions={{tabBarActiveTintColor:"blue"}}>
        <Tabs.Screen name='index' 
        options={{
            title:"Todos",
            tabBarIcon:({color,size})=> <FontAwesome5 name="list" size={size} color={color} />
        }} />
        <Tabs.Screen name='stopwatch' options={{title:"Stopwatch",
            headerShown:false,
            tabBarIcon:({color,size})=><Entypo name="stopwatch" size={size} color={color} />
        }}/>
        <Tabs.Screen name='notifications' options={{title:"Notis",
            tabBarIcon:({color,size})=> <Ionicons name="notifications-outline" size={size} color={color} />
        }} />
   </Tabs>
  )
}

export default Layout
