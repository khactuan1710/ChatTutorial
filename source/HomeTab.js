import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AccountManage from './AccountManage';
import Cart from './Cart';
import Home from './Home';
export default function HomeTab () {
    const Tab = createBottomTabNavigator();
    return(
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Cart" component={Cart} />
        <Tab.Screen name="Acc" component={AccountManage} />
    </Tab.Navigator>
    )
    
}