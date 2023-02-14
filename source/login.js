import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TextInput, TouchableOpacity, Alert} from 'react-native';
import CountDown from 'react-native-countdown-component';
import homeStore from './home/homeStore';
//đếm ngược 10s chuyển sang màn home
export default function Login({ navigation }) {
  const [listCustomer, setListCustomer] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [countdown, setCountdown] = useState(10);

  const [count, setCount] = homeStore((state) => [state.count, state.setCount])
  const getListCustomer = async() => {
     const res = await fetch('https://60f4d20e2208920017f39df5.mockapi.io/customer')
      .then(response => response.json())
      .then(json => {
        setListCustomer(json)
      })
      .catch(error => {
        console.error(error);
      });
  };


  useEffect( () => {
    getListCustomer();

    // setTimeout(function(){navigation.navigate('Home', {
    //     username: username,
    //     password: password,
    //   })}, 10000)
    

   
  }, [])
  const renderPost = (item) => {
    return (<View>
      <Text>{item.name}</Text>
      <Text>{count}</Text>
      <Image  style={{width: 200, height: 200}}
        source={{
          uri: item.avatar
        }}/>
    </View>)
  }

  const validate = () => {
    // var isCorrect = false
    // listCustomer.forEach(element => {
    //   if(username == element.username && password == element.password) {
    //     isCorrect = true;
    //   }
    // });
    
    // if(isCorrect) {
        navigation.navigate('TabHome', {
              username: username,
              password: password,
            })
    // }else {
    //   Alert.alert("dang nhap that bai")
    // }
    
  }
  return (
    <View style={styles.container}>
      <Text style={{marginTop: 40}}>Đăng nhập</Text>
      <Text>{count}</Text>
      <TextInput
        style={{width: 300, height: 40, borderRadius: 20, borderColor: '#c4c4c4', borderWidth: 1, paddingLeft: 8, marginTop: 20}}
        onChangeText={(text) => {
          setUsername(text)
          console.log(username, "username");
        }}
        placeholder="input username"
      />
      <TextInput
        style={{width: 300, height: 40, borderRadius: 20, borderColor: '#c4c4c4', borderWidth: 1, paddingLeft: 8, marginTop: 20}}
        onChangeText={(text) => {
          setPassword(text)
          console.log(password, "password");
        }}
        placeholder="input password"
        secureTextEntry={true}
        keyboardType=""
      />
      <TouchableOpacity
      onPress={validate}
       style={{marginTop: 30, width: 300, height: 40, borderRadius: 20, alignContent: 'center', justifyContent: "center", backgroundColor: '#ee0033'}} >
        <Text style={{color: "#ffffff", alignSelf: 'center'}}>Login</Text>
      </TouchableOpacity>

      <Text style={{marginTop:20}}>{countdown}</Text>
      {/* <FlatList
        data={listCustomer}
        renderItem={({item}) => renderPost(item)}
        keyExtractor={item => item.id}
      /> */}
       {/* <CountDown
        until={10}
        onFinish={() => alert('finished')}
        onPress={() => alert('hello')}
        size={20}
      /> */}
  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});
