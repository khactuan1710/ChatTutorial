import React, { useEffect, useMemo, useState } from 'react';
import 'intl';
import 'intl/locale-data/jsonp/en'; // or any other locale you need
import { View, Text, Image, TextInput, TouchableOpacity, Keyboard, FlatList, ActivityIndicator } from 'react-native';
export default function Search({ navigation, route }) {
    const [listCustomer, setListCustomer] = useState();
    const [isSearch, setIsSearch] = useState(false);

    const textInputRef = React.useRef();

    useEffect(() => {
        if(textInputRef.current){
            const unsubscribe = navigation.addListener('focus', () => {
              textInputRef.current?.focus()
            });
           return unsubscribe;
         }
    },[navigation, textInputRef.current])



    const getListCustomer = async(text) => {
        setIsSearch(true)
        const res = await fetch('https://api.themoviedb.org/3/search/keyword?api_key=e9e9d8da18ae29fc430845952232787c&page=1&query=' + text)
         .then(response => response.json())
         .then(json => {
            setIsSearch(false)
            setListCustomer(json.results)
                console.log(json);
         })
         .catch(error => {
           console.error(error);
         });
     };
     const config = { style: 'currency', currency: 'VND', maximumFractionDigits: 9}
      
     const renderPost = (item) => {
        return (<View style={{height: 80, width: '95%', paddingLeft: 20, justifyContent: 'center', backgroundColor: '#fff', marginVertical: 10, marginHorizontal: 10, borderRadius: 10}} >
          <Text>{item.name}</Text>
          <Text>{new Intl.NumberFormat('vi-VN', config).format(item.id)}</Text>
        </View>)
      }
    return (
        <View style={{flex: 1, flexDirection: 'column', width: '100%'}}>
                <View style={{paddingTop: 20 ,height: 96, width: '100%', backgroundColor: '#00ABFD', alignItems: 'center', flexDirection: 'row'}}>
                    <TouchableOpacity onPress={()=> {navigation.goBack()}}>
                        <Image source={require('../../assets/back.png')} />
                    </TouchableOpacity>

                    <TextInput ref={textInputRef}  placeholder='Tìm kiếm sản phẩm' style={{ paddingLeft: 8,marginLeft: 10, backgroundColor: '#ffffff', borderRadius: 15, width: '90%', height: 40}}
                    onChangeText= {(text) => {
                        getListCustomer(text)
                    }}/>
                </View>
              <View style={{flex: 1}}>
              {isSearch? <ActivityIndicator style ={{marginTop: 100}} size="large" color="#0000ff" />: null}
                      <FlatList
                        data={listCustomer}
                        renderItem={({item}) => renderPost(item)}
                        keyExtractor={item => item.id}
                    />
                
              </View>
              
        </View>
    )
}