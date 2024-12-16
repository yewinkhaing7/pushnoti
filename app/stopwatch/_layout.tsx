import { Link, Stack } from 'expo-router'
import React from 'react'
import { Pressable } from 'react-native'
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

const Layout = () => {
  return (
    <Stack>
        <Stack.Screen name='index' options={{title:"Watch App",
        headerRight:()=>(
            <Link href={"/stopwatch/record"} asChild>
            
                <Pressable hitSlop={20} >
                        <SimpleLineIcons name="refresh" size={24} color="black" />
                </Pressable>
            
            </Link>

        )

        }} />
    </Stack>
  )
}

export default Layout
