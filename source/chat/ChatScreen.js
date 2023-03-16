
import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, View, Text, Image, Touchable, TouchableOpacity, StyleSheet } from "react-native";



export default function ChatScreen(props) {
  const navigation = props.navigation;

  

  const [listFriend, setListFriend] = useState()
 
  const getDataFromAPI = async() => {
    await fetch("https://60f4d20e2208920017f39df5.mockapi.io/customer")
    .then((response) => response.json())
    .then((json) => {
      setListFriend(json);
      console.log("Data ne: ", listFriend);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  useEffect(() => {
    getDataFromAPI();
  }, [])

  

  return (
    <View>
      <ScrollView>
        <FlatList
          data={listFriend}
          renderItem={({item}) => (

            

            <TouchableOpacity
              onPress={() => navigation.navigate('ChatWith', { item: item })}>

              <View style={{flexDirection: 'row', height: 70}}>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                  <Image 
                    style={{width: 55, height: 55, borderRadius: 10, shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 3,
                    },
                    shadowOpacity: 0.27,
                    shadowRadius: 4.65,
                    elevation: 6,}}
                    source={{uri: item.avatar}}
                  />
                </View>

                <View style={{flex: 3}}>
                  <Text style={{fontSize: 20, marginLeft: 10, fontWeight: "500"}}>{item.name}</Text>
                  <Text numberOfLines={1} style={{fontSize: 14, marginLeft: 10, color: '#808080'}}>{item.content}</Text>
                </View>
                

                <View style={{flex: 1}}>
                  <Text style={{color: '#808080'}}>
                  </Text>
                </View>
                
            </View>
            <View style = {styles.lineStyle} />
            
            </TouchableOpacity>
            

          )}
          keyExtractor={(item) => item.id}
        />

      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  lineStyle:{
    borderWidth: 0.5,
    borderColor:'#C0C0C0',
    margin:1,
  },
})