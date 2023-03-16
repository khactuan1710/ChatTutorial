import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text, TextInput, Alert} from "react-native";
import ChatScreen from "./ChatScreen";
const { io } = require('socket.io-client');

export default function ChatWithScreen(props) {
  const navigation = props.navigation;
  const item = props.route.params?.item;
  const [message, setMessage] = useState();
  const [count, setCount] = useState(0);
  const [vote1, setVote1] = useState(30);
  const [vote2, setVote2] = useState(30);

  const socket = io('http://192.168.1.31:3000');
  useEffect( () => {
    console.log('call user efff');
    socket.on('vote1',  (data) => {
     setVote1(data)
    });

    socket.on('vote2',  (data) => {
      setVote2(data)
     });
  }, []);

  const sendMessage =  () => {
    console.log('call');
    socket.emit('sendMessage', "gui tin nhan tu client cho serve");
  };

  const onVote1 =  () => {
    socket.emit('vote1', vote1 + 5);
  };

  const onVote2 =  () => {
    socket.emit('vote2', vote2 + 5);
  };
  
  return (
    <View style={[styles.container, {flexDirection: 'column'}]}>
      <View style={{flex: 1, backgroundColor: '#00ABFD', flexDirection: 'row'}}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity
          onPress={() => navigation.navigate('ChatScreen')}
          >
          <Image style={{width: 20, height: 20}} source={require('../../assets/back.png')}/>
          </TouchableOpacity>
        </View>

        <View style={{flex: 7,justifyContent: 'center'}}>
        <Text style={{fontSize: 20, fontWeight: '700', color: 'white'}}>{item.name}</Text>
        <Text style={{fontSize: 20, fontWeight: '700', color: 'white'}}>{message}    {count}</Text>
        </View>
      </View>


      <View style={{flex: 12, flexDirection: 'row', width: '100%', justifyContent: 'center'}}>
        <View style={{flexDirection: 'column', justifyContent: 'flex-end', height: '100%', borderWidth: 2}}>
          <View style={{width: 100, height: vote1, backgroundColor: '#0d5c22'}}>
          <Text>per1</Text>
          </View>
          <TouchableOpacity 
          onPress={() => {
            onVote1()
          }}
          style={{alignSelf: 'center',width: 50, height: 50, marginTop: 30, backgroundColor: '#0d5c22', borderRadius: 15}}>
            
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'column', justifyContent: 'flex-end', height: '100%', borderWidth: 2}}>
          <View style={{width: 100, height: vote2, backgroundColor: '#a60c30'}}>
            <Text>per2</Text>
          </View>
          <TouchableOpacity style={{ alignSelf: 'center',width: 50,
           height: 50, marginTop: 30, 
           backgroundColor: '#a60c30', borderRadius: 15}
          } onPress={() => {
            onVote2()
          }}>
            
          </TouchableOpacity>
        </View>
      </View>

      <View style = {styles.lineStyle} />
      <View style={{flex: 1.5, flexDirection: 'row'}}>
        <View style={{flex: 8}}>
          <TextInput
            style={styles.input}
            placeholder="Tin nhắn"
          />
        </View>

        
        <View style={{flex: 1}}>
        <TouchableOpacity
          style={{margin: 15,alignSelf: 'center' }}
          onPress={() => Alert.alert("Da gui")}
          >
          <TouchableOpacity style={{width: 30, height: 30, backgroundColor:'#ee34f0'}} onPress={() => {
            sendMessage()
          }} />
          </TouchableOpacity>
        </View>

      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    marginTop: 30,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: '#666666'
  },
  lineStyle:{
    borderWidth: 0.5,
    borderColor:'black',
    margin:1,
  },
})
