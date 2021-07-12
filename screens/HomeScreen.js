import React,{ useState, useEffect } from 'react';
import { LogBox } from 'react-native';
import {View, Text,StyleSheet,Image,SafeAreaView,TouchableOpacity,FlatList,TextInput,Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {createDrawerNavigator} from '@react-navigation/drawer'
import { Header,Container,Icon,Left,Body,Title,Right,CardItem,Card} from 'native-base';
import DatePicker from 'react-native-datepicker';
import axios from 'axios';
import { json } from 'body-parser';
import { withNavigation } from 'react-navigation';
import { createStackNavigator } from '@react-navigation/stack';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';


const HomeScreen = ({navigation,props}) => {
    const [data, setData] = useState({ tableau: [] });
    useEffect(async () => {
        const result = await axios(
          'http://172.20.10.2:4549/',
        );
     
        setData(result.data);
      });
      
    const submitPhoto = (image_uri) => {
      let uploadData= new FormData();
      uploadData.append('submit','ok');
      uploadData.append('fileData',{type: response.type,uri:response.uri,name:response.fileName});
      fetch("http://192.168.1.19:4549/createImage",{
        method:"POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
         },
        body: uploadData
    }).then((response) => response.json())
    .catch((error) => {
        console.error(error);
    });
    }
    const submitData = () =>{
    
    let uploadData= new FormData();
    
      // uploadData.append('fileData',{type:'image/jpeg',uri:'file/',name:'image.jpg'});
    uploadData.append('montant',montant)
    uploadData.append('nom',nom)
    uploadData.append('date',date)
    uploadData.append('commentaire',commentaire)
    uploadData.append("photo", {
    name: photoLibrary.fileName,
    type: photoLibrary.type,
    uri:
      Platform.OS === "android" ? photoLibrary.uri : photoLibrary.uri.replace("file://", "")
  });
  //console.log(uploadData)
        fetch("http://172.20.10.2:4549/create",{
            method:"POST",
            headers:{
                'Accept' : 'application/json',
                'Content-Type' : 'multipart/form-data',
            },
        body:uploadData
         })
         .then(response => response.json())
         .then(response => console.log(response))
        .catch((error) => {
            console.error(error);
        });
        
    }
      
    useEffect(() => {
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    }, [])

    const [nom, nomChange] = React.useState("");  
    const [montant, montantChange] = React.useState("");  
    const [commentaire, commentaireChange] = React.useState("");  
    const [date, setDate] = useState('2020-01-01');

    const [photoCamera,setPhotoCamera] = useState(null)
    const [photoLibrary,setPhotoLibrary] = useState(null)
    
    const openCamera =  () =>{
      launchCamera({mediaType:'photo',quality:1,includeBase64:false,saveToPhotos:true,cancelButtonTitle: "Annuler",maxWidth:1000,maxHeight:600},(response) => {
        console.log(response)
        setPhotoCamera(response.uri)
      })
    }
    const openLibrary =  () =>{
      launchImageLibrary({includeBase64:false},(response) => {
        console.log(response)
        setPhotoLibrary(response)


      })
    }
  return (
   <Container>
       <Header style={{height:50}}>
           <Left>
        <Icon name="ios-menu" style={{fontSize:40,color:"#036"}} onPress={() => navigation.openDrawer()}></Icon>
        </Left>
        <Body>
            <Title style={{fontSize:20,color:"#036"}}>Dualcorp</Title>
          </Body>
          <Right></Right>
       </Header>
       <Container>
            <FlatList
            data={data}
            keyExtractor={(item,index)=> index.toString()}
            renderItem={({item})=>
        <View style={{padding:10,margin:10}}>
            {/* <Text>{item.Nom}</Text>
            <Text>{item.Montant} €</Text> */}
            <TouchableOpacity onPress={()=>{navigation.navigate('Details')}}>
            <Card onPress={()=>detailsScreen()}>
            <CardItem >
              <Body>
                <Text style={{fontWeight:"bold"}}>
                {item.Nom}
                </Text>
                <Text>{item.Montant}€</Text>
                
                <Image style={styles.tinyLogo} source={{uri:`http://localhost:4549/media?id=/${item.Image}`}}>
                </Image>
              </Body>
            </CardItem>
          </Card>
          </TouchableOpacity>
        </View>}
            />
       </Container>
       <Container>
       <TextInput
        style={styles.input}
        onChangeText={text => nomChange(text)}
        value={nom}
        placeholder="Nom"
      />
       <TextInput
        style={styles.input}
        onChangeText={text => montantChange(text)}
        value={montant}
        placeholder="Montant"
      />
      <TextInput
        style={styles.input}
        onChangeText={text => commentaireChange(text)}
        value={commentaire}
        placeholder="commentaire"
      />
      <DatePicker
          style={styles.datePickerStyle}
          date={date} // Initial date from state
          mode="date" // The enum of date, datetime and time
          locale="fr"
          placeholder="select date"
          format="YYYY-MM-DD"
          minDate="2016-01-01"
          maxDate="2030-01-01"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              //display: 'none',
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
            },
          }}
          onDateChange={(date) => {
            setDate(date);
          }}
        />
    <Button title="Choisir Image" onPress={() => openLibrary()} />
    {/* <Button title="ValiderImage" onPress={()=>submitPhoto()}/> */}
    <Button title="Valider" onPress={()=>submitData()}/>
    <TouchableOpacity>
    <Button title="Camera" onPress={() => openCamera()}/>
   
    </TouchableOpacity>  
       </Container>
     
   </Container>
  )
}


const styles= StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
      },
      tinyLogo:{
        height: 40,
        width:50
      }

})

export default HomeScreen;