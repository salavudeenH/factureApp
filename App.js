import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import DrawerContent from './screens/component/DrawerContent';
import Details from './screens/Details';
import ImagePicker from './screens/ImagePicker';
import {createStackNavigator} from '@react-navigation/stack';




const Drawer = createDrawerNavigator();

 const App = () => {
  return (

    <NavigationContainer>
      <Drawer.Navigator drawerContent={props => <DrawerContent {...props}/>}>
        <Drawer.Screen name="Home1" component={HomeScreen} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
        <Drawer.Screen name="Details" component={Details} />
        <Drawer.Screen name="Image" component={ImagePicker} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;