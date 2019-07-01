import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TouchableOpacity, Button,StatusBar, Picker} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import DrawerNavigator from './navigator'
import './db'
import { ritosiniciales, palabra, credo, eucaristia, ritosfinales } from './db';
import { ScrollView } from 'react-native-gesture-handler';
import { Dropdown } from 'react-native-material-dropdown';
import {playPause, cargar} from './App'





class MenuButton extends Component {
	render(){
    
        return(
            <View>
                <TouchableOpacity onPress={() => {this.props.navigate.openDrawer()} }>
                <Image
                    source={{ uri: 'https://reactnativecode.com/wp-content/uploads/2018/04/hamburger_icon.png' }}
                    style={{ width: 25, height: 25, marginLeft: 10 }}
                />
                </TouchableOpacity>
            </View>
        )
    }
};

populate = (elementosdb, elems) =>{
    
    for (let i = 0; i < elementosdb.length;i++){
        if (elementosdb[i].type == "text"){
            elems.push(
                
                <Text 
                key={elementosdb[i].key} 
                style={{
                    textAlign:"center", fontWeight:"bold", fontSize:20, color:elementosdb[i].color, justifyContent:'center' 
                    }}
                >
                    {elementosdb[i].text}
                </Text>
                
            )
        }else if(elementosdb[i].type == "audio"){
            elems.push(
                <Reproductor canciones={elementosdb[i].songs} titulo={elementosdb[i].title}/>            
            )
        }
    }
    
}


function cambiarcancion(valor, canciones){
    
    for (i=0; i<canciones.length; i++){
      if(canciones[i].title == valor){
        cargar(canciones[i].filename)
      }
    }
}

function cambiarestadocancion(){
    
}



export class HomeScreen extends Component{

    static navigationOptions =  ({ navigation }) => ({
      title: 'Misal Anglicano',
      headerLeft: <MenuButton navigate={navigation} />,
      headerStyle:{backgroundColor:"white"},
      headerTintColor:"#212121"
    });
    render(){
      
      return(
          
        <View style={styles.container}>
        <StatusBar
        backgroundColor="white"
        barStyle="dark-content"
        />
          <Image source={require('./img/logo.png')} style={{height:"40%", width:"40%", marginTop:"5%", marginBottom:"5%"}} resizeMode="contain"/>
          <View style={{height:40, flex:1, flexDirection:"column", justifyContent:"space-evenly"}}>
            
              <BotonCuadrado widthpercent="96%" text="RITOS INICIALES" id="Ritos Iniciales" navigation={this.props.navigation}/>
              <BotonCuadrado widthpercent="47%" text="PALABRA" id="Palabra" navigation={this.props.navigation}/>
              <BotonCuadrado widthpercent="47%" text="CREDO" id="Credo" navigation={this.props.navigation}/>
              <BotonCuadrado widthpercent="47%" text="EUCARISTÍA" id="Eucaristia" navigation={this.props.navigation}/>
              <BotonCuadrado widthpercent="47%" text="RITOS FINALES" id="Ritos finales" navigation={this.props.navigation}/>
        </View>
        </View>
      )
    }
  }
  
 export class BotonCuadrado extends Component{
    render(){
      return(
        <TouchableOpacity onPress={() => this.props.navigation.navigate(this.props.id)} activeOpacity={.8} style={{
          width:250,
        height:50,
        backgroundColor:'#039be5', 
        borderRadius:50,
        shadowColor: "#29b6f6",
        shadowOffset: {
          width: 2,
          height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 2.62,
        elevation: 4,
  
        }}>
          <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
            <Text style={{textAlign:"center", textAlignVertical:"center", color:"white",  fontSize:18, fontWeight:"bold"}}>{this.props.text}</Text>
          </View>
        </TouchableOpacity>
      )
    }
  }

  export class BotonPlay extends Component{
    constructor(props){
      super(props)
      this.onPress = this.onPress.bind(this)
    }
    onPress(){
      alert("presionado")
    }
    render(){
      return(
        <TouchableOpacity activeOpacity={.8} onPress={this.onPress} style={{
          width:50,
        height:50,
        backgroundColor:'#039be5', 
        borderRadius:50,
        shadowColor: "#29b6f6",
        shadowOffset: {
          width: 2,
          height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 2.62,
        elevation: 4,
  
        }}>
          <View style={{flex:1, justifyContent:"center", paddingLeft:2.5}} >
          <Image
                source={require('./img/play.png')}
                style={{ width: 25, height: 25, marginLeft: 10 }} 
                
            />
          </View>
        </TouchableOpacity>
      )
    }
  }

  export class BotonPlayGlobal extends Component{
    constructor(props){
      super(props)
      this.onPress = this.onPress.bind(this)
    }

    onPress(){
      playPause()
    }
    render(){
      return(
        <TouchableOpacity activeOpacity={.8} onPress={this.onPress} style={{
          width:50,
        height:50,
        backgroundColor:'#039be5', 
        borderRadius:50,
        shadowColor: "#29b6f6",
        shadowOffset: {
          width: 2,
          height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 2.62,
        elevation: 4,
  
        }}>
          <View style={{flex:1, justifyContent:"center", paddingLeft:2.5}} >
          <Image
                source={require('./img/play.png')}
                style={{ width: 25, height: 25, marginLeft: 10 }} 
                
            />
          </View>
        </TouchableOpacity>
      )
    }
  }

export  class Reproductor extends Component{
  
    
    constructor(props){
        super(props)
        this.state={
            playing:false
        }
        this.onChangeText = this.onChangeText.bind(this);

    }

    onChangeText(text) {
      cambiarcancion(text, this.props.canciones)
    }

    render(){
        let elems = []
        let songs = this.props.canciones
        let texto = ""
        for (i=0;i<songs.length;i++){
            elems.push(
                {
                    value:songs[i].title
                }
            )
        }
        if(this.state.playing == false){
            texto = "false"
        }else{
            texto = "true"
        }
      return(
        <View style={{flex:1, flexDirection:"row", justifyContent:"space-around", marginVertical:10}}>
            <View style={{width:"10%"}}></View>
            <View style={{width:"60%",backgroundColor:'#039be5', borderRadius:5, paddingHorizontal:10}}>
            <Dropdown
                ref={child => {this.child = child}} {...this.props} 
                label={this.props.titulo}
                data={elems}
                value={elems[0].value}
                style={{color:"white"}}
                baseColor="white"
                onChangeText={this.onChangeText}
            />
            </View>
            <View style={{flex:1, alignItems:"center",justifyContent:"center",width:"20%"}}>
            <BotonPlay onPress={()=> alert("1")}/>
            </View>
            <View style={{width:"10%"}}></View>
          </View>
      )
    }
  }

export class RitosIniciales extends Component{
    static navigationOptions =  ({ navigation }) => ({
        title: 'Ritos Iniciales',
        headerLeft: <MenuButton navigate={navigation} />,
        headerRight:<BotonPlayGlobal/>,
        headerStyle:{backgroundColor:"white"},
        headerTintColor:"#212121"
      });
      
    render(){
        let elems = []
        populate(ritosiniciales, elems)
        cargar('entrada1')
        
        return(
            <View>
            <StatusBar
                backgroundColor="white"
                barStyle="dark-content"
                />
                <View >
                <ScrollView>
                <ScrollView Style={styles.container}>{elems}</ScrollView></ScrollView>
                    
                </View>
            </View>
        )
    }
}

export class Palabra extends Component {
    static navigationOptions =  ({ navigation }) => ({
        title: 'Palabra',
        headerLeft: <MenuButton navigate={navigation} />,
        headerStyle:{backgroundColor:"white"},
        headerTintColor:"#212121"
      });
    render() {
        let elems = []
        populate(palabra, elems)
        return (
            <View style={styles.container}>
            <StatusBar
            backgroundColor="white"
            barStyle="dark-content"
            />
            <ScrollView>
                <ScrollView Style={styles.container}>{elems}</ScrollView></ScrollView>
            </View>
        );
    }
}

export class Credo extends Component {
    static navigationOptions =  ({ navigation }) => ({
        title: 'Credo',
        headerLeft: <MenuButton navigate={navigation} />,
        headerStyle:{backgroundColor:"white"},
        headerTintColor:"#212121"
      });
    render() {
        let elems = []
        populate(credo, elems)
        return (
            <View style={styles.container}>
            <StatusBar
            backgroundColor="white"
            barStyle="dark-content"
            />
            <ScrollView>
                <ScrollView Style={styles.container}>{elems}</ScrollView></ScrollView>
            </View>
        );
    }
}

export class Eucaristia extends Component {
    static navigationOptions =  ({ navigation }) => ({
        title: 'Eucaristía',
        headerLeft: <MenuButton navigate={navigation} />,
        headerStyle:{backgroundColor:"white"},
        headerTintColor:"#212121"
      });
    render() {
        let elems = []
        populate(eucaristia, elems)
        return (
            <View style={styles.container}>
            <StatusBar
            backgroundColor="white"
            barStyle="dark-content"
            />
            <ScrollView>
                <ScrollView Style={styles.container}>{elems}</ScrollView></ScrollView>
            </View>
        );
    }
}

export class RitosFinales extends Component {
    static navigationOptions =  ({ navigation }) => ({
        title: 'Ritos finales',
        headerLeft: <MenuButton navigate={navigation} />,
        headerStyle:{backgroundColor:"white"},
        headerTintColor:"#212121"
      });
    render() {
        let elems = []
        populate(ritosfinales, elems)
        return (
            <View style={styles.container}>
            <StatusBar
            backgroundColor="white"
            barStyle="dark-content"
            />
            <ScrollView>
                <ScrollView Style={styles.container}>{elems}</ScrollView></ScrollView>
            </View>
        );
    }
}

  export const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
  });