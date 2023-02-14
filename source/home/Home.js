import { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import CustomText from '../common/CustomText';
import homeStore from './homeStore';
export default function Home({ navigation, route }) {
    // const { username, password } = route.params;
    // useEffect(() => {
    //     console.log('username: ', username);
    //     // console.log('password: ', password);
    // },[])
    const count2 = homeStore((state) => state.count)

    const [count, setCount] = homeStore((state) => [state.count, state.setCount])

    const [isShowImage, setIsShowImage] = useState(false);


    return (
        <View style={{flex: 1, flexDirection: 'column', width: '100%'}}>
            <View  style={{backgroundColor: '#32a852', flex: 1, flexDirection:'row',borderWidth:2, borderColor: '#000000', alignItems: 'center', paddingLeft: 10}}>
                <Image source={require('../../assets/icon.png')} style={{width: 30, height: 30}}/>
                <Text style={{fontSize: 25, color: "#FFFFFF", fontWeight: "bold", marginLeft: 5}}>Tech Store</Text>
            </View>
            <View style={{flex: 10, backgroundColor: "#ff00ff"}}>
                <View style={{backgroundColor: '#ffffff', width: '90%', height: 47, alignSelf: 'center', marginTop: 11, borderRadius: 10, alignItems: 'center', flexDirection: 'row', paddingLeft: 16}}>
                    {!isShowImage? <Image source={require('../../assets/favicon.png')} style={{width: 20, height: 20}}/>: null}
                    <TextInput placeholder='Tìm kiếm sản phẩm' style={{marginLeft: 5,  borderColor: "#000000"}} onFocus={() => {setIsShowImage(true)}} onBlur={() => {console.log('00');}} onTouchCancel={() => {console.log("..");}} onPressOut={()=> {console.log('lddd');}}/>
                </View>
                <Text style={{alignSelf: 'center'}}>{count}</Text>
                <TouchableOpacity style={{alignSelf:'center'}} onPress={() => {setCount(count+ 1)}}> 
                    <Text>Click</Text>
                </TouchableOpacity>
            </View>
            <View style={{flex: 1, backgroundColor: '#a83277'}}>
                
            </View>
        </View>
    )
}