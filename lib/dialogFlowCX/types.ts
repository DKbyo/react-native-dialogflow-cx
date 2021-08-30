import { Button, ColorValue } from "react-native";

export interface Parameters {
  in_hours: string;
}

export interface Text {
  text: string[];
  redactedText: string[];
}

export interface Payload {
  richContent: (ChipElement | ButtonElement | InfoElement | DescriptionElement | ImageElement | ListElement | ListDivider| AccordionElement)[][];
}

export interface RichContent {
  type: string
}
export interface ListDivider extends RichContent{

}
export interface AccordionElement extends RichContent{
  title: string,
  subtitle?: string,
  image?: {
    src: {
      rawUrl: string
    }
  },
  text: string
}

export interface ChipElement extends RichContent {
  options: ChipOption[];
}
export interface ChipOption {
  text: string;
  image?: ChipImage;
  link?: string;
}
export interface ChipImage {
  src: ChipSrc;
}
export interface ChipSrc {
  rawUrl: string
}
export interface ButtonElement extends RichContent {
  icon?: ButtonIcon;
  text: string;
  link?: string;
  event?: ButtonEvent;
}

export interface ListElement extends RichContent{
  title: string,
  subtitle?: string,
  event?: ListEvent
}
export interface ListEvent{
  name: string,
  languageCode: string,
  parameters: any
}
export interface ButtonIcon {
  type: string;
  color: string
}
export interface ButtonEvent {
  name: string;
  languageCode: string;
  parameters: any;
}
export interface InfoElement extends RichContent{
  title: string;
  subtitle?: string;
  image?: {
    src: {
      rawUrl: string
    }
  },
  actionLink?: string
}
export interface DescriptionElement extends RichContent{
  title: string;
  text?: string[];  
}

export interface ImageElement extends RichContent{  
  rawUrl: string;  
  accessibilityText?: string;
}

export interface ResponseMessage {
  text?: Text;
  source: string;
  payload?: Payload;
}

export interface CurrentPage {
  name: string;
  displayName: string;
}

export interface Intent {
  name: string;
  displayName: string;
}

export interface Intent2 {
  name: string;
  displayName: string;
}

export interface Match {
  intent: Intent2;
  resolvedInput: string;
  matchType: string;
  confidence: number;
  modelType: string;
}

export interface LoggingSettings {
  enableInteractionLogging: boolean;
}

export interface AdvancedSettings {
  loggingSettings: LoggingSettings;
}

export interface QueryResult {
  text: string;
  languageCode: string;
  parameters: Parameters;
  responseMessages: ResponseMessage[];
  currentPage: CurrentPage;
  intent: Intent;
  intentDetectionConfidence: number;
  diagnosticInfo: any;
  match: Match;
  redactedInput: string;
  advancedSettings: AdvancedSettings;
}

export interface DialogFlowResponse {
  responseId: string;
  queryResult: QueryResult;
  responseType: string;
}
export interface ErrorElement{
  code: string
  message: string
  status: string
}
export interface QueryParameters{

}
export interface QueryInput{

}
export interface DialogFlowRequest{
  queryParams:QueryParameters
  queryInput: QueryInput
}
export interface ClickAccordionEvent{
  element:AccordionElement
}
export interface ClickButtonEvent{
  element:ButtonElement
}
export interface ClickInfoEvent{
  element:InfoElement
}
export interface ClickListEvent{
  element: ListElement
}
export interface ErrorEvent{
  error: ErrorElement
}
export interface DialogFlowMessengerProps{
  location: string
  agent: string
  language:string
  //Style
  dfMessengerBotMessage: ColorValue
  dfMessengerUserMessage: ColorValue
  dfMessengerFontColor: ColorValue
  //Events
  dfAccordionClicked: (event:ClickAccordionEvent)=>{}
  dfButtonClicked(event:ClickButtonEvent):void
  dfChipClicked: (query:string)=>{}
  dfInfoCardClicked: (event:ClickInfoEvent)=>{}
  dfListElementClicked: (event:ClickListEvent)=>{}
  dfMessengerError: (event: ErrorEvent)=>{}
  //dfMessengerLoaded: ()
  dfRequestSent: (sent: DialogFlowRequest)=>{}
  dfResponseReceived: (response:DialogFlowResponse)=>{}
  dfUserInputEntered: (input:string)=>{}
}