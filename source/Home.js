import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
export default function Home({ navigation, route }) {
    const { username, password } = route.params;
    useEffect(() => {
        console.log('username: ', username);
        // console.log('password: ', password);
    },[])
    return (
        <View style={{justifyContent:'center', alignItems:'center'}}>
            <Text>Home</Text>
            <Text>username: {username}</Text>
            <Text>username: {password}</Text>
        </View>
    )
}