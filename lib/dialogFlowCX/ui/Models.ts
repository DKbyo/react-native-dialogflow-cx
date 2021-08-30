import { StyleProp, ViewStyle } from "react-native";

export { ActionsProps } from "./Actions";
export { AvatarProps } from "./Avatar";
export {
  BubbleProps,
  RenderMessageImageProps,
  RenderMessageVideoProps,
  RenderMessageAudioProps,
  RenderMessageTextProps,
} from "./Bubble";
export { ComposerProps } from "./Composer";
export { DayProps } from "./Day";
export { GiftedAvatarProps } from "./GiftedAvatar";
export { InputToolbarProps } from "./InputToolbar";
export { LoadEarlierProps } from "./LoadEarlier";
export { MessageProps } from "./Message";
export { MessageContainerProps } from "./MessageContainer";
export { MessageImageProps } from "./MessageImage";
export { MessageTextProps } from "./MessageText";
export { QuickRepliesProps } from "./QuickReplies";
export { SendProps } from "./Send";
export { SystemMessageProps } from "./SystemMessage";
export { TimeProps } from "./Time";

export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

export interface LeftRightStyle<T> {
  left?: StyleProp<T>;
  right?: StyleProp<T>;
}
type renderFunction = (x: any) => JSX.Element;
export interface User {
  _id: string | number;
  name?: string;
  avatar?: string | number | renderFunction;
}

export interface Reply {
  title: string;
  value: string;
  messageId?: any;
  image?: string;
  link?: string;
}

export interface QuickReplies {
  type: "radio" | "checkbox";
  values: Reply[];
  keepIt?: boolean;
}

export interface IMessage {
  _id: string | number;
  text: string;
  createdAt: Date | number;
  user: User;
  image?: string;
  video?: string;
  audio?: string;
  system?: boolean;
  sent?: boolean;
  received?: boolean;
  pending?: boolean;
  quickReplies?: QuickReplies;
  info?: IInfoMessage;
  description?: IDescriptionMessage;
  button?: IButtonMessage;
  list?: IListMessage[];
  accordion?: IAccordionMessage;
}
export interface IAccordionMessage {
  title: string;
  subtitle?: string;
  image?: string;
  text: string;
  raw: any;
}
export interface IListMessage {
  title?: string;
  isDivider: boolean;
  subtitle?: string;
  event?: string;
  parameters?: any;
  raw?: any;
}
export interface IButtonMessage {
  icon?: string;
  color?: string;
  text: string;
  link?: string;
  event?: string;
  parameters?: any;
  raw?: any;
}
export interface IInfoMessage {
  title: string;
  subtitle?: string;
  image?: string;
  link?: string;
  raw?: any;
}
export interface IDescriptionMessage {
  title: string;
  text: string[];
}

export type IChatMessage = IMessage;

export interface MessageVideoProps<TMessage extends IMessage> {
  currentMessage?: TMessage;
  containerStyle?: StyleProp<ViewStyle>;
  videoStyle?: StyleProp<ViewStyle>;
  videoProps?: object;
  // TODO: should be LightBox properties
  lightboxProps?: object;
}

export interface MessageAudioProps<TMessage extends IMessage> {
  currentMessage?: TMessage;
  containerStyle?: StyleProp<ViewStyle>;
  audioStyle?: StyleProp<ViewStyle>;
  audioProps?: object;
}
