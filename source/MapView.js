import { Camera, CameraType } from 'expo-camera';
import { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import AccStore from './AccStore.js/AccStore';
import CartStore from './cart/CartStote';
import CustomText from './common/CustomText';

import * as Location from 'expo-location';

export default function MapViewScreen({ navigation, route }) {
    
    const [position, setPosition] = useState({
        latitude: 10,
        longitude: 10,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      });
    useEffect(async() => {
        let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

            setPosition({
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.0421,
              longitudeDelta: 0.0421,
            });
            console.log(location.coords.latitude, "fd");
    },[setPosition])
    
    return (
        <View style={{flex: 1, flexDirection: 'column', alignItems: 'center',width: '100%'}}>
          <MapView style={{width: '100%', height: '100%'}}
            initialRegion={position}
            region={position}
            showsUserLocation={true}
            showsMyLocationButton={true}
            followsUserLocation={true}
            showsCompass={true}
            scrollEnabled={true}
            zoomEnabled={true}
            pitchEnabled={true}
            rotateEnabled={true}>
            <Marker
            title='Yor are here'
            description='This is a description'
            coordinate={position}/>
          </MapView>
          
        </View>
    )
}