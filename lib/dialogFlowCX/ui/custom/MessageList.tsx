import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
}from 'react-native'
import { IListMessage, IMessage, Reply } from '../Models'
export interface ListProps {  
  currentMessage?: IMessage,
  backgroundColor: string
  color: string
  onListPress?(IListMessage):void
}
import Icon from 'react-native-vector-icons/MaterialIcons';
Icon.loadFont()

const styles = StyleSheet.create({
  list:{
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
    flexDirection: 'column',        
    minWidth:300,    
    flexWrap:"wrap",        
  },    
  wrapText:{

  },
  title:{        
    
    fontSize:16,
    fontWeight:'bold'
  },  
  divider:{
    borderTopWidth: 1,
    borderTopColor: "#e8e8e8"
  },
  subtitle:{
    marginTop:10,    
  }
})

export default class MessageButton extends Component<
  ListProps  
> {

  handlePress=(listElement:IListMessage)=>{    
    if(this.props.onListPress){
      this.props.onListPress(listElement)  
    }    
  }
  renderDivider=(index)=>{
    return(
      <View key={index} style={styles.divider}/>
    )
  }
  renderElement=(listElement:IListMessage,index)=>{
    const {color} = this.props;    
    return(
      <TouchableOpacity key={index} style={styles.container} onPress={()=>this.handlePress(listElement)} disabled={!listElement.event}>          
          <Text style={[styles.title, {color}]}>
            {listElement.title}
          </Text>             
          {listElement.subtitle && <Text style={[styles.subtitle, {color}]}>
            {listElement.subtitle}
          </Text>}                      
      </TouchableOpacity>
    )
  }

  renderListElement=(listElement:IListMessage, index)=>{
    switch(listElement.isDivider){
      case true:
        return this.renderDivider(index)
      case false:
        return this.renderElement(listElement, index)
    }
  }

  render(){
    const {currentMessage, backgroundColor, color} = this.props;
    return(
      <View style={[styles.list,{backgroundColor}]}>        
        {currentMessage.list.map(this.renderListElement)}        
      </View>
    )
  }

}