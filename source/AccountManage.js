import { Camera, CameraType } from 'expo-camera';
import { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import AccStore from './AccStore.js/AccStore';
import CartStore from './cart/CartStote';
import CustomText from './common/CustomText';
export default function AccountManage({ navigation, route }) {
    
    const [count, setCount] = useState(0)
    const countStore = AccStore(state => state.count);
    const setCountStore = AccStore(state => state.setCount);
    const listPhoneFromCart = CartStore(state => state.listPhone);
    const [type, setType] = useState(CameraType.back);
    const [uri, setUri] = useState();
    useEffect(async() => {
        await Camera.requestCameraPermissionsAsync()
    },[])
    function toggleCameraType() {
        
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
      }
      var camera = new Camera
    const  takePicture  = async()=>  {
        if(!camera) {
            return
        }
        console.log('not null');
        const photo = await camera.takePictureAsync()
        setUri(photo.uri)
        console.log(photo, "photo");
    }
    
    return (
        <View style={{flex: 1, flexDirection: 'column', alignItems: 'center',width: '100%'}}>
          <TouchableOpacity
                    style={{
                    width: 100,
                    height: 50,
                    marginTop: 50,
                    borderRadius: 10,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#00ABFD",
                    }}
                    onPress={() => {
                        toggleCameraType()
                    }}
          >
            <Text>Đổi cam</Text>
          </TouchableOpacity>
          <TouchableOpacity
                    style={{
                    width: 100,
                    height: 50,
                    marginTop: 5,
                    borderRadius: 10,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#00ABFD",
                    }}
                    onPress={() => {
                        takePicture()
                    }}
          >
            <Text>Chụp ảnh</Text>
          </TouchableOpacity>
          <View style={{width: '100%', height: 800, borderWidth: 1}}>
                <Camera style={{width: '100%', height: '30%'}} type={type}
                    ref={(r) => {
                        camera = r
                    }}>

                </Camera>

                <ImageBackground
                    source={{uri: uri}}
                    style={{
                    flex: 1
                    }}>
                        
                    </ImageBackground>
          </View>
          
        </View>
    )
}