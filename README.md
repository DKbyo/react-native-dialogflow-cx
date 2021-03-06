# React Native Dialogflow CX Messenger
[![React Native Dailogflow CX Messenger](https://img.shields.io/badge/-React%20Native%20Dialogflow%20CX%20Messenger-blue)](https://github.com/DKbyo/react-native-dialogflow-cx)


[![npm version](https://img.shields.io/npm/v/react-native-dialogflow-messenger.svg?style=for-the-badge)](https://www.npmjs.com/package/react-native-dialogflow-messenger)
[![npm](https://img.shields.io/npm/dt/react-native-dialogflow-messenger.svg?style=for-the-badge)](https://www.npmjs.com/package/react-native-dialogflow-messenger)
![Platform - Android and iOS](https://img.shields.io/badge/platform-Android%20%7C%20iOS-blue.svg?style=for-the-badge)
[![License: APACHE2](https://img.shields.io/badge/license-MIT%2FApache--2.0-blue)](https://www.apache.org/licenses/LICENSE-2.0)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=for-the-badge)](https://github.com/prettier/prettier)

# Introduction

This library implements the [Dialogflow Messenger custom payload protocol](https://cloud.google.com/dialogflow/cx/docs/concept/integration/dialogflow-messenger), you just need [enable the DialogFlow Messenger integration](https://cloud.google.com/dialogflow/cx/docs/concept/integration) and use this library with you **Agent ID** and **Location**

# Demo

<img src="https://cdn.statically.io/gh/DKByo/react-native-dialogflow-cx/0.0.2/assets/demo.gif" width="150"/>

# Installation

Add the dependency:

```shell
yarn add react-native-dialogflow-messenger
yarn add react-native-vector-icons
react-native link react-native-vector-icons
```

## Peer Dependencies

###### IMPORTANT! You need install them

```js
"react": ">= 17.x.x",
"react-native": ">= 0.64.x",
```

# Usage

## Import

```js


import { DialogFlowMessenger } from "react-native-dialogflow-messenger";
```

## Component Usage

```js
<DialogFlowMessenger
  location="<location>"
  agent="<agent_id>"      
  //Style
  dfMessengerBotMessage="#878fac"
  dfMessengerUserMessage="#479b3d"
  dfMessengerFontColor="#FFFFFF"
  //UI Events 
  dfAccordionClicked={(event)=>console.log("Accordion",event)}
  dfButtonClicked={(event)=>console.log("Button",event)}
  dfChipClicked={(event)=>console.log("Chip",event)}
  dfInfoCardClicked={(event)=>console.log("Info",event)}
  dfListElementClicked={(event)=>console.log("list",event)}
  //Dialogflow Events
  dfMessengerError={(event)=>console.log("Error",event)}
  dfRequestSent={(event)=>console.log("Send",event)}
  dfResponseReceived={(event)=>console.log("Response",event)}
  dfUserInputEntered={(event)=>console.log("UserInput",event)}
    />
```

# Configuration - Props

| Property              |  Type   | Default | Description                                             |
| --------------------- | :-----: | :-----: | ------------------------------------------------------- |
| location              | string  |         | make the button outline                                 |
| agent                 | string  |         | make the button with a solid background and a shadow    |
| dfMessengerBotMessage | color   | #fefefe | make the button with a gradient background and a shadow |
| dfMessengerUserMessage| color   | #dcdcdc | change the button's width                               |
| dfMessengerFontColor  | color   | #FFFFFF | change the button's width                               |
| dfAccordionClicked    | func    |         | change the button's width                               |
| dfButtonClicked       | func    |         | change the button's width                               |
| dfChipClicked         | func    |         | change the button's width                               |
| dfInfoCardClicked     | func    |         | make the button with a gradient background and a shadow |
| dfListElementClicked  | func    |         | make the button with a gradient background and a shadow |
| dfMessengerError      | func    |         | make the button with a gradient background and a shadow |
| dfRequestSent         | func    |         | make the button with a gradient background and a shadow |
| dfResponseReceived    | func    |         | make the button with a gradient background and a shadow |
| dfUserInputEntered    | func    |         | make the button with a gradient background and a shadow | 

## Dialogflow Messenger Protocol

# Properties

- [X] df-messenger-bot-message	Bubble background color for agent messages.
- [ ] df-messenger-button-titlebar-color	Color for the floating button and the titlebar of the chat dialog.
- [ ] df-messenger-button-titlebar-font-color	Font color for the title in the titlebar.
- [ ] df-messenger-chat-background-color	Color for the chat dialog background.
- [X] df-messenger-font-color	Font color for messages.
- [ ] df-messenger-input-box-color	Background color for the text input box.
- [ ] df-messenger-input-font-color	Font color for the text input box.
- [ ] df-messenger-input-placeholder-font-color	Font color for placeholder text in text input box.
- [ ] df-messenger-minimized-chat-close-icon-color	Color of the close icon in the closed chat view.
- [ ] df-messenger-send-icon	Color of the send icon in the text input box.
- [X] df-messenger-user-message	Bubble background color for user messages.

# Features

- [X] Info
- [X] Chips
- [X] Description
- [X] Image
- [X] Button
- [X] Lists
- [X] Accordion
- [X] Combining response types

# Events
 
- [X] df-accordion-clicked
- [X] df-button-clicked
- [X] df-chip-clicked
- [X] df-info-card-clicked
- [X] df-list-element-clicked
- [X] df-messenger-error
- [ ] df-messenger-loaded
- [X] df-request-sent
- [X] df-response-received
- [X] df-user-input-entered


## Future Plans

- [ ] Add more style settings
- [ ] Expose messages array
- [ ] Add "Typying" animation
- [ ] Add support for Dialogflow ES

# Change Log

0.0.1 First release completely operational!

## Author

Danyel Cabello, danyel.nerv@gmail.com

# React Native Gifted Chat

This project is based on [React Native Gifted Chat](https://github.com/FaridSafi/react-native-gifted-chat)

## License

React Native Library Boilerplate is available under the Apache2 license. See the LICENSE file for more info.
