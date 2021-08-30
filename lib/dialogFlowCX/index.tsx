import React, { useState, useCallback, useEffect, useRef } from 'react'
import { Linking, SafeAreaView } from 'react-native'
import { GiftedChat, IAccordionMessage, IButtonMessage, IInfoMessage, IListMessage, IMessage, Reply, User } from './ui'
//import { DialogFlowAPI } from './tests/mockApi';
import { DialogFlowAPI } from './api';
import { dialogFlowMessagesToGiftMessages, repluToGiftMessage } from './util';
import { v4 as uuidv4 } from 'uuid';
import {styles} from './styles'
import { AccordionElement, ButtonElement, DialogFlowMessengerProps, ListElement } from './types';
const agentUser:User = {    
  _id:2,
  avatar:null
}
export function DialogFlowMessenger({location, 
  agent,  
  language,
  dfMessengerBotMessage, 
  dfMessengerUserMessage, 
  dfMessengerFontColor="black",
  dfAccordionClicked,
  dfButtonClicked,
  dfChipClicked,
  dfInfoCardClicked,
  dfListElementClicked,
  dfMessengerError,
  dfRequestSent,
  dfResponseReceived,
  dfUserInputEntered
}:DialogFlowMessengerProps) {
  const [session, setSession] = useState(uuidv4());
  const [messages, setMessages] = useState<Array<IMessage>>([]);
  const api = new DialogFlowAPI({location, agent, language, session,onSend:dfRequestSent, onError:dfMessengerError});
  const chat = useRef<GiftedChat>();


  const onSend = useCallback(async(messages = []) => {
    try{      
      // Add message to chat log    
      setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
      // Call Dialogflow
      messages.forEach(async(message) => {
        try{
          const response =  await api.detectIntent(message.text);  
          processResponse(response)
          scrollToBottom()
        }catch(e){

        }
      });          
    }catch(e){
 
    }
  }, [messages,])

  const scrollToBottom = useCallback(()=>{    
    chat.current.scrollToBottom()
  },[chat])

  const processResponse = useCallback((response)=>{
    const reponseMessages = dialogFlowMessagesToGiftMessages(response.queryResult.responseMessages, agentUser);
    setMessages(previousMessages => GiftedChat.append(previousMessages, reponseMessages))
  },[messages])

  const clearQuickReplies = useCallback(() => {    
    const newMessages = messages.splice(0)
    newMessages.shift()    
    setMessages(newMessages)
  },[messages])

  const processChip= useCallback(async(replies:Reply[]) => {
    for(let reply of replies){
      if(reply.link){
        dfChipClicked(reply.title)
        const supported = await Linking.canOpenURL(reply.link);
        if(supported){
          await Linking.openURL(reply.link);
          //clearQuickReplies()
          return
        }
      }
    }    
    const messages = replies.map(repluToGiftMessage);      
    if(messages){
      await onSend(messages)
    }    
  }, [messages])

  const processInfo = useCallback(async(message: IInfoMessage)=>{    
    if(dfInfoCardClicked){
      dfInfoCardClicked(message.raw)
    }
    if(message.link){
      const supported = await Linking.canOpenURL(message.link);
      if(supported){
        await Linking.openURL(message.link);        
        return
      }
    }
  },[])
  const processButton = useCallback(async(message: IButtonMessage)=>{    
    if(dfButtonClicked){
      const element= (message.raw as ButtonElement)          
      dfButtonClicked({
        element:element
      })
    }
    if(message.link){
      const supported = await Linking.canOpenURL(message.link);
      if(supported){
        await Linking.openURL(message.link);        
        return
      }
    }else if(message.event){
      try{
        const response =  await api.detectIntentEvent(message.event, message.parameters);
        processResponse(response);
      }catch(e){

      }
    }
  },[])
  const processList = useCallback(async(message: IListMessage)=>{  
    if(dfListElementClicked){
      const element= (message.raw as ListElement)      
      dfListElementClicked({element})
    }
    if(message.event){
      try{
        const response =  await api.detectIntentEvent(message.event, message.parameters);
       processResponse(response);
      }catch(e){

      }
    }
  },[])

  const processAccordion = useCallback(async(message: IAccordionMessage)=>{  
    if(dfAccordionClicked){      
      const element= (message.raw as AccordionElement)      
      dfAccordionClicked({element})
    }    
  },[])

  return (    
    <GiftedChat      
      ref={chat}
      messages={messages}
      messagesContainerStyle={{
        backgroundColor: "#f9f9f9"
      }}
      bubbleWrapperStyle={{
          left:{
            backgroundColor: dfMessengerBotMessage || "#fefefe",
            borderColor:"#e8e8e8",
            borderWidth:1
          },
          right:{
            backgroundColor: dfMessengerUserMessage|| "#dcdcdc",
            borderColor:"#e8e8e8",
            borderWidth:1
          }
      }}     
      quickReplyTextStyle={{
        color: dfMessengerFontColor,
      }}
      quickReplyStyle={{        
        backgroundColor:dfMessengerBotMessage ||"#fefefe",
        borderColor:"#e8e8e8",        
        borderRadius:20,
        borderWidth:1,
        height:35,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        
        elevation: 4,
      }} 
      bubbleTextStyle={{
        left:{
          color:dfMessengerFontColor ||"black"
        },
        right:{
          color:dfMessengerFontColor||"black"
        }
      }}
      timeTextStyle={{
        left:{
          color: dfMessengerFontColor||"black"
        },
        right:{
          color:dfMessengerFontColor||"black"
        }
      }}            
      lightboxProps={{
        backgroundColor: dfMessengerBotMessage ||"#fefefe",
      }}
      onSend={messages => onSend(messages)}            
      placeholder={"Ask something..."}
      user={{
        _id: 1,
        avatar:null
      }}
      onQuickReply={replies => processChip(replies)}
      onInfoPress={message => processInfo(message)}
      onButtonPress={message => processButton(message)}
      onListPress={message => processList(message)}
      onAccordionPress={message => processAccordion(message)}
    />
  )
}