import * as React from 'react';
import { View,Text,Image,StyleSheet } from 'react-native';
import { Header,Container,Icon,Left,Body,Title,Right,Button} from 'native-base';

const Details = ({ navigation }) => {
  return (
    <Container>
       <Header style={{height:50}}>
           <Left>
        <Icon name="ios-menu" style={{fontSize:40,color:"#036"}} onPress={() => navigation.openDrawer()}></Icon>
        </Left>
        <Body >
            <Title style={{fontSize:20,color:"#036"}}>Details</Title>
          </Body>
          <Right></Right>
       </Header>
       <View>
       <Image
        style={styles.tinyLogo}
        source={{
          uri: 'https://s.france24.com/media/display/b1dbd0a2-c975-11eb-ac8b-005056a98db9/w:1280/p:16x9/PRW_1416.webp',
        }}
      />
   </View>
   </Container>
   
  );
}
const styles = StyleSheet.create({
  tinyLogo: {
    width: 500,
    height: 500,
  },
});
export default Details;