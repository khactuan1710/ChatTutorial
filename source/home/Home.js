import { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import AccStore from '../AccStore.js/AccStore';
import CustomText from '../common/CustomText';
import homeStore from './homeStore';
import { Camera, CameraType } from 'expo-camera';

export default function Home({ navigation, route }) {
    // const { username, password } = route.params;
 
    const count2 = homeStore((state) => state.count)

    const [countFromAcc,  setCountFromAcc] = AccStore((state) => [state.count, state.setCount])
    const [count, setCount] = homeStore((state) => [state.count, state.setCount])

    const [isShowImage, setIsShowImage] = useState(false);
    const [img, setImg] = useState();

    let camera = new Camera

   useEffect(() => {
        console.log('countFromAcc: ', countFromAcc);
    },[])
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();

    const   toggleCameraType  = async() =>  {
        // await Camera.requestCameraPermissionsAsync()
        // setType(CameraType.front)
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
      }
      const __takePicture = async () => {

        if (!camera) return
        const photo = await camera.takePictureAsync()
        console.log('fdfd' , photo);
        setImg(photo.uri)
       
      }
    //   let camera: Camera
    return (
        <View style={{flex: 1, flexDirection: 'column', width: '100%'}}>
            <View  style={{backgroundColor: '#32a852', flex: 1, flexDirection:'row',borderWidth:2, borderColor: '#000000', alignItems: 'center', paddingLeft: 10}}>
                <Image source={require('../../assets/icon.png')} style={{width: 30, height: 30}}/>
                <Text style={{fontSize: 25, color: "#FFFFFF", fontWeight: "bold", marginLeft: 5}}>Tech Store</Text>
            </View>
            <View style={{flex: 10, backgroundColor: "#ff00ff"}}
          >
                <TouchableOpacity  style={{backgroundColor: '#ffffff', width: '90%', height: 47, alignSelf: 'center', marginTop: 11, borderRadius: 10, alignItems: 'center', flexDirection: 'row', paddingLeft: 16}}>
                    {!isShowImage? <Image source={require('../../assets/favicon.png')} style={{width: 20, height: 20}}/>: null}
                    <TextInput placeholder='Tìm kiếm sản phẩm' style={{marginLeft: 5,  borderColor: "#000000", height: '100%', width: '100%'}} onFocus={() => {navigation.navigate('Search')}} onBlur={() => {console.log('00');}} onTouchCancel={() => {console.log("..");}} onPressOut={()=> {console.log('lddd');}}/>
                </TouchableOpacity>
                <Text style={{alignSelf: 'center'}}>{count}</Text>
                <TouchableOpacity style={{alignSelf:'center'}} onPress={() => {navigation.navigate('ChatScreen')}}
                > 
                    <Text>Click</Text>
                </TouchableOpacity>

                {/* <Camera 
                   ref={(r) => {
                    camera = r
                  }}
                style={{width: 400, height: 400}}  type={type} r>
                    <View >
                    <TouchableOpacity onPress={() => {toggleCameraType()}}>
                        <Text style={{color: '#ffffff'}}>Flip Camera</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {__takePicture()}}>
                        <Text style={{color: '#ffffff', marginTop: 10}}>chup anh</Text>
                    </TouchableOpacity>
                    </View>
                </Camera> */}
            </View>
            <View style={{flex: 1, backgroundColor: '#a83277'}}>
            <ImageBackground
                source={{uri: img}}
                style={{
                flex: 1
                }}
            />
            </View>
        </View>
    )
}