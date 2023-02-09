import { View, Text } from "react-native"

function CustomText(props) {
    const name = props.name
    return(
        <View style={{alignItems: 'center'}}>
        <Text style={{color: props.color}}>Hello {props.name}!</Text>
      </View>
    )
}
export default CustomText