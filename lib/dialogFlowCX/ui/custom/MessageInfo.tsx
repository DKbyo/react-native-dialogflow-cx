import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ColorValue
}from 'react-native'
import { IMessage, Reply } from '../Models'
export interface InfoProps {  
  currentMessage?: IMessage,
  onInfoPress?(IMessage):void,
  color: ColorValue,
  backgroundColor: ColorValue
}

const styles = StyleSheet.create({
  touchable:{
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,    
    elevation: 4,    
    borderRadius:10,
    marginBottom:20
  },
  container: {
    marginLeft:10,
    marginTop:20,
    marginBottom:20,
    flexDirection: 'row',        
    minWidth:300,
  },  
  image:{
    width: 20,
    height:20,
    marginRight: 20,
    marginLeft:10
  },
  wrapText:{

  },
  title:{
    fontWeight:"bold",
    marginBottom: 10
  },
  subtitle:{
    fontWeight: "200"
  }
})

export default class MessageInfo extends Component<
  InfoProps  
> {

  handlePress=()=>{    
    if(this.props.onInfoPress){
      this.props.onInfoPress(this.props.currentMessage.info)  
    }    
  }

  render(){
    const {currentMessage, backgroundColor, color} = this.props;
    return(
      <TouchableOpacity style={[styles.touchable,{backgroundColor}]} onPress={this.handlePress} disabled={!currentMessage.info.link}>
        <View style={styles.container}>
          {currentMessage.info.image && (
            <Image style={styles.image} source={{
              uri: currentMessage.info.image}}/>
          )}
          <View style={styles.wrapText}>
            <Text style={[styles.title,{color}]}>
              {currentMessage.info.title}
            </Text>
            { currentMessage.info.subtitle && <Text style={[styles.subtitle,{color}]}>
              {currentMessage.info.subtitle}
            </Text>}
          </View>
        </View>
      </TouchableOpacity>
    )
  }

}