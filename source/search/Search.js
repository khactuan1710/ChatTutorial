import React, { useEffect, useMemo, useState } from 'react';
import 'intl';
import 'intl/locale-data/jsonp/en'; // or any other locale you need
import { View, Text, Image, TextInput, TouchableOpacity, Keyboard, FlatList, ActivityIndicator } from 'react-native';
export default function Search({ navigation, route }) {
    const [listCustomer, setListCustomer] = useState();
    const [isSearch, setIsSearch] = useState(false);
    const [listData, setListData] = useState(false);
    const [searchText, setSearchText] = useState();

    const textInputRef = React.useRef();



    const getListDataFromApi =  async() => {

     await fetch("https://60c7a3edafc88600179f5766.mockapi.io/listPhone")
       .then((response) => response.json())
       .then((json) => {
         setListData(json);
       })
       .catch((err) => {
         console.error(err);
       });
       
       console.log("da goi xong api danh sach san pham");
   };

   

    useEffect(() => {
      getListDataFromApi()
        if(textInputRef.current){
            const unsubscribe = navigation.addListener('focus', () => {
              textInputRef.current?.focus()
            });
           return unsubscribe;
         }
    },[navigation, textInputRef.current])



    const getListCustomer = async(text) => {
        setIsSearch(true)
        let newData = new Array();
        newData = listData;
        newData.includes
        let newDa = new Array()
        newData.forEach((elment) => {
          if(elment.name.includes(text)) {
            console.log('--..', text);
            newDa.push(elment)
          }
        })
        // console.log(newDa);
        setListCustomer(newDa)
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
                      setSearchText(text)
                        getListCustomer(text)
                    }}/>
                </View>
              <View style={{flex: 1}}>
              {isSearch? null: null}
                      <FlatList
                        data={listCustomer}
                        renderItem={({ item }) => {
                          let i = new Array()
                          const partialText = item.name.split(searchText)
                          // console.log(partialText, '--');
                        return (
                          <View
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            marginVertical: 5,
                            backgroundColor: "white",
                          }} >
                          <View style={{ flex: 1, padding: 10 }}>
                            <React.Fragment>
                              <Image
                                style={{ width: 90, height: 90 }}
                                source={{ uri: item.imagePhone }}
                              />
                            </React.Fragment>
                            
                          </View>
            
                            {/* tu day */}
            
                          <View style={{ flex: 3, padding: 8 }}>
            
                            <View style={{ flexDirection: "row" }}>
                              <View style={{ flex: 9}}>
                                <Text  style={{ fontSize: 18}}>
                                {partialText.map((part, index) => {
                                  console.log(partialText.length, 'length');
                                  console.log(part, 'part');
                                    return (

                                        <Text key={index}>
                                            {part}
                                            {index !== partialText.length - 1 && <Text style={{ color: 'blue', fontWeight: 'bold' }}>{searchText}</Text>}
                                        </Text>
                                    )
                                })}
                                </Text>
                                <Text  style={{ fontSize: 18}}>
                                   so luong mua {item.quantityBuy}
                                </Text>
                              </View>
                            </View>
            
                            <Text style={{ color: "red", fontSize: 15, marginVertical: 5}}>
                              {new Intl.NumberFormat("vi-VN", config).format(item.price)}
                            </Text>
            
            
                            <View style={{flexDirection: 'row'}}>
                              <View style={{flex: 5}}>
                                <Text style={{ color: "#707070", fontSize: 12 }}>
                                Chỉ còn: {item.quantity} sản phẩm
                                </Text>
                              </View>
            
                  
                            </View>
            
                            
            
                          </View>
            
                                  {/* den day */}
            
                        </View>
                        )
                        }}
                        keyExtractor={item => item.id}
                    />
                
              </View>
              
        </View>
    )
}