
import type { DialogFlowResponse } from '../types'
class DialogFlowError extends Error {

}

const DUMMY_IMAGE = "https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
class DialogFlowAPI {
  #url: string;
  onSend:(DialogFlowRequest)=>void;
  constructor({ url = 'https://dialogflow.cloud.google.com/v1/cx/locations/{location}/integrations/messenger/webhook/{agentId}/sessions/{session}:detectIntent', session, agent, location,onSend }) {
    this.#url = url.replace('{agentId}', agent).replace('{session}', session).replace("{location}", location)
    this.onSend = onSend
  }
  detectIntentEvent = async (event, parameters): Promise<DialogFlowResponse> => {
    if(this.onSend){
      this.onSend({queryInput:{evemt:{event}}, queryParams: {parameters}})
    }
    return this.mockResponse("Event")
  }

  mockChips = () => {
    return [
      {
        "options": [{
          "text": "Open Google",
          "link": "https://www.google.com",
          "image": {
            "src": {
              "rawUrl": DUMMY_IMAGE
            }
          }
        }, {
          "text": "payment please"
        }],
        "type": "chips"
      }
    ]
  }
  mockInfo = () => {
    return [
      {
        "type": "info",
        "title": "Info item title",
        "subtitle": "Info item subtitle",
        "image": {
          "src": {
            "rawUrl": DUMMY_IMAGE
          }
        },
        "actionLink": "https://google.com"
      }
    ]
  }
  mockDescription = () => {
    return [
      {
        "type": "description",
        "title": "Description title",
        "text": [
          "This is text line 1.",
          "This is text line 2."
        ]
      }
    ]
  }
  mockButton = () => {
    return [
      {
        "type": "button",
        "icon": {
          "type": "chevron_right",
          "color": "#FF9800"
        },
        "text": "Button",
        "link": "https://google.com",
        "event": {
          "name": "start",
          "languageCode": "",
          "parameters": {}
        }
      }
    ]
  }
  mockImage = () => {
    return [
      {
        "type": "image",
        "rawUrl": DUMMY_IMAGE,
        "accessibilityText": "Example logo"
      }
    ]
  }
  mockList = () => {
    return [
      {
        "type": "list",
        "title": "List item 1 title",
        "subtitle": "List item 1 subtitle",
        "event": {
          "name": "",
          "languageCode": "",
          "parameters": {}
        }
      },
      {
        "type": "divider"
      },
      {
        "type": "list",
        "title": "List item 2 title",
        "subtitle": "List item 2 subtitle",
        "event": {
          "name": "Send",
          "languageCode": "",
          "parameters": {}
        }
      }
    ]
  }
  mockAccordion = () => {
    return [
      {
        "type": "accordion",
        "title": "Accordion title",
        "subtitle": "consectetur adipiscing elit. Proin nec est felis",
        "image": {
          "src": {
            "rawUrl": DUMMY_IMAGE
          }
        },
        "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nec est felis. Integer sed eros ac justo blandit bibendum vitae sed dui. Etiam sed laoreet sapien. Mauris ornare tortor in molestie iaculis. Sed auctor vulputate sapien gravida porta. Sed vitae mi diam. Nullam suscipit, metus sit amet volutpat iaculis, ex massa interdum mi, sit amet lobortis urna augue sed elit. Morbi risus libero, finibus in mauris id, cursus suscipit sapien. Nunc vitae nisi gravida, tristique urna sed, tristique nisl. Quisque eu nisl dolor. Nam sodales neque at dolor ultricies faucibus."
      }
    ]
  }
  detectIntent = async (text, language = "en"): Promise<DialogFlowResponse> => {
    if(this.onSend){
      this.onSend({queryInput:{text:{text}}})
    }
    return this.mockResponse(text)
  }
  mockResponse =  (text): DialogFlowResponse => {    
    
    if (text == 'payment please') {
      return {
        "responseId": "bbbc9201-25a7-46c1-897d-98dfc755fe28",
        // @ts-ignore
        "queryResult": {
          "text": "hey",
          "languageCode": "en",
          "parameters": {
            "in_hours": "false"
          },
          "responseMessages": [
            {
              "text": {
                "text": ["Nulla facilisi. Aliquam vitae enim vitae tellus pellentesque luctus. Phasellus maximus ut metus quis cursus. Nunc ac efficitur felis. Mauris turpis dolor, fringilla sed sollicitudin in, vulputate sit amet urna. Quisque ut tincidunt ex. Nulla pulvinar quam felis, sit amet malesuada nunc molestie quis. Morbi at metus pharetra arcu ultricies rhoncus id ac sem. Phasellus vehicula libero nisi, quis commodo odio suscipit nec. Integer porttitor aliquet ultricies."],
                "redactedText": ["Nulla facilisi. Aliquam vitae enim vitae tellus pellentesque luctus. Phasellus maximus ut metus quis cursus. Nunc ac efficitur felis. Mauris turpis dolor, fringilla sed sollicitudin in, vulputate sit amet urna. Quisque ut tincidunt ex. Nulla pulvinar quam felis, sit amet malesuada nunc molestie quis. Morbi at metus pharetra arcu ultricies rhoncus id ac sem. Phasellus vehicula libero nisi, quis commodo odio suscipit nec. Integer porttitor aliquet ultricies."]
              },
              "source": "VIRTUAL_AGENT"
            }],
        }
      }
    }
    return {
      "responseId": "bbbc9201-25a7-46c1-897d-98dfc755fe28",
      // @ts-ignore
      "queryResult": {
        "text": "hey",
        "languageCode": "en",
        "parameters": {
          "in_hours": "false"
        },
        "responseMessages": [
          {
            "text": {
              "text": ["Nulla facilisi. Aliquam vitae enim vitae tellus pellentesque luctus. Phasellus maximus ut metus quis cursus. Nunc ac efficitur felis. Mauris turpis dolor, fringilla sed sollicitudin in, vulputate sit amet urna. Quisque ut tincidunt ex. Nulla pulvinar quam felis, sit amet malesuada nunc molestie quis. Morbi at metus pharetra arcu ultricies rhoncus id ac sem. Phasellus vehicula libero nisi, quis commodo odio suscipit nec. Integer porttitor aliquet ultricies."],
              "redactedText": ["Nulla facilisi. Aliquam vitae enim vitae tellus pellentesque luctus. Phasellus maximus ut metus quis cursus. Nunc ac efficitur felis. Mauris turpis dolor, fringilla sed sollicitudin in, vulputate sit amet urna. Quisque ut tincidunt ex. Nulla pulvinar quam felis, sit amet malesuada nunc molestie quis. Morbi at metus pharetra arcu ultricies rhoncus id ac sem. Phasellus vehicula libero nisi, quis commodo odio suscipit nec. Integer porttitor aliquet ultricies."]
            },
            "source": "VIRTUAL_AGENT"
          }, {
            "payload": {
              "richContent": [
                this.mockInfo(),
                this.mockChips(),
                this.mockDescription(),
                this.mockImage(),
                this.mockButton(),
                this.mockList(),
                this.mockAccordion()
              ]
            },
            "source": "VIRTUAL_AGENT"
          }],
        "currentPage": {
          "name": "START_PAGE",
          "displayName": "Start Page"
        },
        "intent": {
          "name": "DUMMY",
          "displayName": "Default Welcome Intent"
        },
        "intentDetectionConfidence": 1.0,
        "match": {
          "intent": {
            "name": "DUMMY",
            "displayName": "Default Welcome Intent"
          },
          "resolvedInput": "hey",
          "matchType": "INTENT",
          "confidence": 1.0,
          "modelType": "MODEL_TYPE_STANDARD"
        },
        "redactedInput": "hey",
        "advancedSettings": {
          "loggingSettings": {
            "enableInteractionLogging": true
          }
        }
      },
      "responseType": "FINAL"
    }
  }
}

export { DialogFlowError, DialogFlowAPI };

