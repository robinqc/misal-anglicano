/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, TouchableOpacity, Button} from 'react-native';
import { createStackNavigator, createAppContainer, createDrawerNavigator} from "react-navigation";
import {DrawerNavigator} from './navigator'
import Icon from 'react-native-vector-icons/Octicons';
import {HomeScreen, Reproductor, styles} from './screens'
import SoundPlayer from 'react-native-sound-player'
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

let playing = false
  
export const playPause = ()=>{
  if(playing){
    SoundPlayer.pause()
  }else{
    SoundPlayer.play()
  }
  playing = !playing
}

export const cargar = (archivo)=>{
  try{
    SoundPlayer.loadSoundFile(archivo, 'mp3')
  }catch (e) {
    console.log(`cannot play the sound file`, e)
  }
}

export const play = ()=>{
  SoundPlayer.play()
}

export const pause = ()=>{
  SoundPlayer.pause()
}

export const isPlaying = ()=>{
  return playing
}

type Props = {};
const Drawer = createAppContainer(DrawerNavigator)
class App extends Component<Props> {
  render() {
    
    return (
      
      <View>
        <Drawer/>
      </View>
    );
  }
}

export default Drawer


