// src/screens/AboutScreen.js
import React,{useState} from 'react';
import { View,Text,TouchableOpacity,Button,Image} from 'react-native';
import { Header,Container,Icon,Left,Body,Title,Right} from 'native-base';
import ImagePicker from 'react-native-image-picker'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const ImagePhoto = ({ navigation }) => {
  const [photoCamera,setPhotoCamera] = useState(null)
  const [photoLibrary,setPhotoLibrary] = useState(null)
  
  const openCamera =  () =>{
    launchCamera({mediaType:'photo',quality:1,includeBase64:true,saveToPhotos:true,cancelButtonTitle: "Annuler",maxWidth:1000,maxHeight:600},(response) => {
      console.log(response)
      setPhotoCamera(response.uri)
    })
  }
  const openLibrary =  () =>{
    launchImageLibrary({},(response) => {
      console.log(response)
      setPhotoLibrary(response.uri)
    })
  }
  return (
    <Container>
       <Header style={{height:50}}>
           <Left>
        <Icon name="ios-menu" style={{fontSize:40,color:"#036"}} onPress={() => navigation.openDrawer()}></Icon>
        </Left>
        <Body >
            <Title style={{fontSize:20,color:"#036"}}>Valet</Title>
          </Body>
          <Right></Right>
       </Header>
       <View>
   </View>
   <Container style={{flex:1,justifyContent:'center',alignItems:'center'}}>
    <TouchableOpacity>
    <Button title="Camera" onPress={() => openCamera()}/>
    <Button title="Choisir Image" onPress={() => openLibrary()} />
    </TouchableOpacity>  
   </Container>
    <Container style={{backgroundColor:'grey'}}>
    {/* <Image source={{uri:photoCamera}} style={{width:480,height:480}}></Image> */}
    <Image source={{uri:photoLibrary || photoCamera}} style={{width:480,height:480}}></Image>
    </Container>
   </Container>
   
  );
}
export default ImagePhoto;