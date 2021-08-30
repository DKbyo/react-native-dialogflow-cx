import React, { Component, useCallback, useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ColorValue,
  Image,
  TouchableOpacity,
  Animated,
  TouchableHighlight,
  TouchableNativeFeedbackBase,
  TouchableWithoutFeedback
}from 'react-native'
import { IMessage } from '../Models'
export interface AccordionProps {  
  currentMessage?: IMessage,
  backgroundColor: ColorValue
  color: ColorValue,
  onAccordionPress(IAccordionMessage): void
}
import Icon from 'react-native-vector-icons/MaterialIcons';
Icon.loadFont()

const styles = StyleSheet.create({
  container: {
    marginTop:20,
    marginBottom:20,
    flexDirection: 'row',     
    flex:1,  
    marginLeft:10,
  },    
  wrapText:{
    flex:1  
  },
  title:{
    fontWeight:"bold",
    
  },
  text:{
    marginTop: 10,
    marginRight:20
  },
  subtitle:{
    fontWeight:"200",
    fontSize:12,    
  },
  wrapper:{
    flexDirection:"row",
    maxWidth:300,
    minWidth:300,
    width:300,
    shadowColor: "#000",
    alignItems:"center",
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
  image:{
    width: 20,
    height:20,
    marginLeft: 20, 
    marginRight:10       
  }
})

const MessageAccordion=({currentMessage,color, backgroundColor,onAccordionPress}:AccordionProps)=>{    
  const [collapsed, setCollapsed] = useState(new Animated.Value(1));
  const [loaded, setLoaded] = useState(false);
  const [height, setHeight] = useState(0);
  const [collapsedB, setCollapsedB] = useState(false);  
  useEffect(()=>{        
    Animated.timing(
      collapsed,
      {
        toValue: collapsedB?0:1,
        duration: 500,
        useNativeDriver: false
      }
    ).start();
  },[collapsedB])
  const handlePress = useCallback(()=>{
    onAccordionPress(currentMessage.accordion);
    setCollapsedB(!collapsedB)
  },[collapsedB])
  const initContentHeight = useCallback((evt)=>{
    
    if(!loaded){   
      setLoaded(true)     
      setHeight(evt.nativeEvent.layout.height )
    }
  },[loaded])
  
  const animatedHeight = collapsed.interpolate({inputRange: [0, 1], outputRange: [0, height]})
  const animatedMargin = collapsed.interpolate({inputRange: [0, 1], outputRange: [0, 10]})
  const animatedSpin = collapsed.interpolate({inputRange: [0, 1], outputRange: ['0deg', '180deg']})
  return(      
    <TouchableWithoutFeedback  onPress={handlePress}>
      <View style={[styles.wrapper,{backgroundColor}]}>
        {currentMessage.accordion.image && (
          <Image style={styles.image} source={{
            uri: currentMessage.accordion.image}}/>
        )}
        <View style={[styles.container]}>          
          <View style={styles.wrapText}>
            <View style={{flex:1,flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
              <View style={{flexDirection:"column", flex:1}}>
                <Text style={[styles.title,{color}]}>
                  {currentMessage.accordion.title}
                </Text>            
                {currentMessage.accordion.subtitle && <Text style={[styles.subtitle,{color},]}>
                  {currentMessage.accordion.subtitle}
                </Text>}
              </View>
              <Animated.View style={{marginRight:20, transform: [{rotate: animatedSpin}]}}>
                <Icon style={{fontSize:25}} name="keyboard-arrow-down" color={color} />
              </Animated.View>
            </View>
            <Animated.Text style={[styles.text,{color},loaded?{height:animatedHeight,marginTop: animatedMargin}: {}]} onLayout={initContentHeight}>
              {currentMessage.accordion.text}
            </Animated.Text>               
          </View>
        </View>
                
      </View>

    </TouchableWithoutFeedback>
  )
}
export default MessageAccordion