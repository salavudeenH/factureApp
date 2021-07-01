// src/screens/AboutScreen.js
import * as React from 'react';
import { View,Text } from 'react-native';
import { Header,Container,Icon,Left,Body,Title,Right,Button} from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';

const NotificationsScreen = ({ navigation,props }) => {
  return (
    <Container>
       <Header style={{height:50}}>
           <Left>
        <Icon name="ios-menu" style={{fontSize:40,color:"#036"}} onPress={() => navigation.openDrawer()}></Icon>
        </Left>
        <Body >
            <Title style={{fontSize:20,color:"#036"}}>Contact</Title>
          </Body>
          <Right></Right>
       </Header>
       <View>
       <Text>Hello</Text>
   </View>
   <Container>
     <TouchableOpacity onPress={()=>{props.navigation.navigate('Details')}}>
         <Text>Bye</Text>
     </TouchableOpacity>
   </Container>

   </Container>
   
  );
}
export default NotificationsScreen;