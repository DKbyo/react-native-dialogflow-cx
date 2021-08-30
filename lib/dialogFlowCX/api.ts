
import axios from 'axios';
import type {DialogFlowResponse,ErrorElement} from './types'
class DialogFlowError extends Error {

}
class DialogFlowAPI{
    #url:string;
    #language:string;
    onError:(ErrorElement)=>void;
    onSend:(DialogFlowRequest)=>void;
    constructor({url='https://dialogflow.cloud.google.com/v1/cx/locations/{location}/integrations/messenger/webhook/{agentId}/sessions/{session}:detectIntent', session, agent, location='global',language='en',onSend,onError}){
      this.#url = url.replace('{agentId}', agent).replace('{session}',session).replace("{location}",location)
      this.#language = language
      this.onSend = onSend
      this.onError = onError
    }    
    detectIntentEvent = async (event):Promise<DialogFlowResponse> =>{
      const data = {"queryInput":{"event":{"event":event}}}
      if(this.onSend){
        this.onSend(data)
      }
      try{
        const response = await axios.post(this.#url, data)
        const responseData =response.data.replace(")]}'\n",'')        
        return JSON.parse(responseData) as DialogFlowResponse;
      }catch(e){
        this.onError({status:e.response.status,message:e.response.message})
        console.error(e.response)
        throw new DialogFlowError("Error in dialogflow comunication")
      }      
    }
    detectIntent = async (text):Promise<DialogFlowResponse> => {
      const data = {"queryInput":{"text":{"text":text},"languageCode":this.#language}}                         
      if(this.onSend){
        this.onSend(data)
      }
      try{        
        const response = await axios.post(this.#url, data)
        const responseData =response.data.replace(")]}'\n",'')        
        return JSON.parse(responseData) as DialogFlowResponse;
      }catch(e){        
        const responseData = e.response.data.replace(")]}'\n",'')        
        try{
          const parsedResponse = JSON.parse(responseData)          
          this.onError(parsedResponse)
        }catch(e){
          this.onError({status:e.response.status,message:e.response.message})
        }
        throw new DialogFlowError("Error in dialogflow comunication")
      }
    }
}

export {DialogFlowError, DialogFlowAPI};

