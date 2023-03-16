import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AccountManage from './AccountManage';
import Cart from './Cart';
import Home from './home/Home';
import { Text, Image } from 'react-native';
import MapView from './MapView';
import MapViewScreen from './MapView';
export default function HomeTab () {
    const Tab = createBottomTabNavigator();
    return(
      <Tab.Navigator screenOptions={{ headerShown: false }} >
        <Tab.Screen name="Home" component={Home} options={{tabBarLabel: 'Home', tabBarLabelStyle:{fontSize: 20, fontWeight: 'bold'}, tabBarIcon: ({ color, size }) => (
        <Image style={{width: 20, height: 20}} source={require('../assets/icon.png')}/>
      ),}}/>
        <Tab.Screen name="Cart" component={Cart} />
        <Tab.Screen name="Acc" component={AccountManage} />
        <Tab.Screen name="MapView" component={MapViewScreen} />
    </Tab.Navigator>
    )
    
}