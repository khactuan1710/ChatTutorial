import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  FlatList,
} from "react-native";
import { useState, useEffect } from "react";


export default function Cart({ navigation }) {
  const [listData, setListData] = useState();
  const [countState, setCountState] = useState(0);
  const [total, setTotal] = useState(0);
  const [totalMoney, setTotalMoney] = useState(0);
  

  const config = {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 9,
  };

  let count = 0;



console.log(count);

  

  const onDelete = (deleteId) => {
    const newList =  new Array();
    listData.forEach(element => {
        if(element.id != deleteId) {
            newList.push(element)
        }
    });
    setListData(newList)



    // const newList = listData.filter(item => item.id !== deleteId);
    // setListData(newList);


  }
  const onDeleteAPI = async(deleteId)  => {
    fetch("https://60c7a3edafc88600179f5766.mockapi.io/w/" + deleteId, {
        method: 'DELETE',
      })
      .then(res => {
        if(res.status == 200) {
            Alert.alert('xoa thanh cong')
            getListDataFromApi()
        }else {
            Alert.alert('xoa that bai')
        }
      })

  }

  const showAlert = (deleteId) => {
    Alert.alert(
        'Thông báo',
        'Bạn có chắc chắn muốn xóa thành phần này không?',
        [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'OK', onPress: () => onDelete(deleteId) },
        ],
        { cancelable: false }
    );
  };

  const getListDataFromApi = async () => {
    await fetch("https://60c7a3edafc88600179f5766.mockapi.io/w")
      .then((response) => response.json())
      .then((json) => {
        setListData(json);
        const a = new Array();
        setTotal(json.length)
        var total = 0;
        json.forEach(element => {

            var totalBuy = element.price * element.quantityBuy
            
            total = total + totalBuy
        })
        setTotalMoney(total)
        console.log(listData);
      })
      .catch((err) => {
        console.error(err);
      });
  };


  useEffect(() => {
    getListDataFromApi();
    console.log(getListDataFromApi);
  }, []);

  const updateItem = (item) => {

    item.quantityBuy = item.quantityBuy + 1;

    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
    };
    fetch("https://60c7a3edafc88600179f5766.mockapi.io/w/" + item.id, requestOptions)
        .then(response => {
            response.json()
            if(response.status == 200) {
                getListDataFromApi()
                Alert.alert('cap nhat thanh cong')
            }
            console.log(response.status, 'status');
        })
        .then(data => {console.log(data);});
  }
  const goToDetail = (item) => {
    navigation.navigate('Detail', {item: item})
  }





  return (
    <View style={styles.container}>
      <View style={[styles.viewHeader, { flexDirection: "row" }]}>
        <View style={styles.viewButtonBack}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Home");
            }}
          >
            {/* <Image
              style={styles.imageBack}
              source={require("../../../assets/back.png")}
            /> */}
          </TouchableOpacity>
        </View>

        <View style={styles.viewTextInlineHeader}>
          <Text style={styles.viewTextHeader}>Giỏ hàng của tôi</Text>
        </View>
      </View>

      <View style={styles.viewCountSP}>
        <View style={{ flex: 1.5, justifyContent: "center", fontSize: 15 }}>
          <Text style={{ marginLeft: 8, fontWeight: "bold", fontSize: 15 }}>
            Tổng cộng:
          </Text>
        </View>

        <View style={{ flex: 5, justifyContent: "center" }}>
          <Text style={{ fontSize: 15 }}>{total} sản phẩm</Text>
        </View>
      </View>

      <View style={styles.viewListSP}>
        <FlatList
          data={listData}
          renderItem={({ item }) => (
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                marginVertical: 5,
                backgroundColor: "white",
              }} >
              <View style={{ flex: 1, padding: 10 }}>
                <Image
                  style={{ width: 90, height: 90 }}
                  source={{ uri: item.imagePhone }}
                />
              </View>

                {/* tu day */}

              <View style={{ flex: 3, padding: 8 }}>

                <View style={{ flexDirection: "row" }}>
                  <View style={{ flex: 9}}>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                      {item.name}
                    </Text>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                      {item.id}
                    </Text>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                       so luong mua {item.quantityBuy}
                    </Text>
                  </View>

                  <View style={{ flex: 1, alignItems: 'center'}}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => onDeleteAPI(item.id)}>
                      <Text style={{
                          color: "#4F4F4F",
                          fontWeight: "bold",
                          fontSize: 20,
                        }}>X</Text>
                    </TouchableOpacity>
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

                  <View style={{flex: 2, flexDirection: 'row'}}>
                    <View style={{flex: 1, backgroundColor: '#F7F7F7', alignItems:'center'}}>
                      <TouchableOpacity
                        onPress={() => 
                        setCountState(countState - 1)}>
                        <Text style={{
                            color: "black",
                            fontWeight: "bold",
                            fontSize: 20,
                          }}>-</Text>
                      </TouchableOpacity>
                    </View>

                    <View style={{flex: 1, backgroundColor: '#F7F7F7', alignItems: 'center', justifyContent: 'center', marginHorizontal: 5}}>
                      <Text>{item.quantityBuy}</Text>
                    </View>

                    <View style={{flex: 1, alignItems: 'center', backgroundColor: '#F7F7F7'}}>
                    <TouchableOpacity
                        onPress={() => goToDetail(item)}>
                        <Text style={{
                            color: "black",
                            fontWeight: "bold",
                            fontSize: 20,
                          }}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                

              </View>

                      {/* den day */}

            </View>
          )}
        />
      </View>

      <View style={[styles.viewPrice, {borderWidth: 1}]}>
        <View style={{ flex: 1, justifyContent: "center", fontSize: 15 }}></View>
        <Text style={{ marginLeft: 8, fontWeight: "bold", fontSize: 15 }}>
            Tổng cộng:
          </Text>
        </View>

        <View style={{ flex: 1,borderWidth: 1,  justifyContent: "center" }}>
          <Text style={{ fontSize: 15 }}> {new Intl.NumberFormat("vi-VN", config).format(totalMoney)}</Text>
        </View>

        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <TouchableOpacity
            style={{
              width: "70%",
              height: "60%",
              borderRadius: 10,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#00ABFD",
            }}
            onPress={() => {
              Alert.alert("Clicked");
            }}
          >
            <Text>Thanh toán</Text>
          </TouchableOpacity>
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    flexDirection: "column",
  },
  viewHeader: {
    flex: 1.5,
    backgroundColor: "#00ABFD",
  },
  viewButtonBack: {
    flex: 1,
    justifyContent: "center",
  },
  imageBack: {
    width: 20,
    height: 20,
    marginLeft: 5,
  },
  viewTextInlineHeader: {
    flex: 10,
    justifyContent: "center",
  },
  viewTextHeader: {
    marginLeft: 10,
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },

  viewCountSP: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    flexDirection: "row",
  },
  viewListSP: {
    flexDirection: "row",
    flex: 10,
    backgroundColor: "#F7F7F7",
  },

  viewPrice: {
    flexDirection: "row",
    flex: 1,
    backgroundColor: "#F7F7F7",
  },
});