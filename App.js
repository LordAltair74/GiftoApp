/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, ToastAndroid} from 'react-native';
import Tapsell from 'react-native-tapsell'

const appKey = "mtspdadnfgbqthfeiocpmkdngfphcrbhlekqhrcfhlgjsfnelhgrlbslffqlqljfpkples"
const zone_Id = "5d18895bd4d0e90001a00f7c"
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  constructor(props){
    super(props)
    Tapsell.initialize(appKey)
    Tapsell.setDebugMode(true)
    this.state = {
      adId:"",
      loading:false
    }
  }

  onRequest(){
    this.setState({loading:true})
    Tapsell.requestAd(zone_Id,true,
        (zoneId,adId) => {
          if (Platform.OS == "android")
            ToastAndroid.show("ad available", ToastAndroid.SHORT)
          this.setState({adId,loading:false})

          Tapsell.showAd(
              {
                ad_id: this.state.adId,
                back_disabled: false,
                immersive_mode: false,
                rotation_mode: Tapsell.ROTATION_UNLOCKED,
                show_exit_dialog: true
              },
              (zoneId, adId) => {
                if (Platform.OS == "android")
                  ToastAndroid.show("ad opened", ToastAndroid.SHORT)
              },
              (zoneId, adId) => {
                if (Platform.OS == "android")
                  ToastAndroid.show("ad closed", ToastAndroid.SHORT)
              }
          );

        },
        zoneId => {
          // onNoAdAvailable
          if (Platform.OS == "android")
            ToastAndroid.show("no ad avaiable", ToastAndroid.SHORT)
          this.setState({loading:false})
        },
        zoneId => {
          // onNoNetwork
          if (Platform.OS == "android")
            ToastAndroid.show("no network", ToastAndroid.SHORT)
          this.setState({loading:false})
        },
        (zoneId, error) => {
          // onError
          if (Platform.OS == "android")
            ToastAndroid.show("error: " + error, ToastAndroid.SHORT)
          this.setState({loading:false})
        },
        (zoneId, adId) => {
          // onExpiring
          if (Platform.OS == "android")
            ToastAndroid.show("ad is expiring", ToastAndroid.SHORT)
          this.setState({loading:false})
        }
        )
  }


  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.onRequest.bind(this)} style={{width:'95%',height:30,marginLeft:'2.5%',backgroundColor: '#000',justifyContent: 'center',alignItems: 'center',marginBottom: 10,marginTop: 10}}>
          <Text style={{color:'#FFF'}}>Request Ad </Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
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
