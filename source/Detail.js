import { useEffect, useState } from 'react';
import { View, Text, Image, TextInput } from 'react-native';
import CustomText from './common/CustomText';
export default function Detail({ navigation, route }) {
    const item = route.params;

    useEffect(() => {
        console.log('item: ', item);
        // console.log('password: ', password);
    },[])


    return (
        <View style={{flex: 1, flexDirection: 'column', width: '100%'}}>
            
                <Text>Chi tiet</Text>
        </View>
    )
}