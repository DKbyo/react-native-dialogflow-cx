import type {
  ResponseMessage,
  ChipElement,
  ButtonElement,
  InfoElement,
  DescriptionElement,
  ImageElement,
  ListElement,
  AccordionElement,
} from "./types";
import { IMessage, User, Reply, IListMessage } from "./ui";
import { v4 as uuidv4 } from "uuid";

const giftTextMessage = (message: ResponseMessage, user: User): IMessage[] => {
  const giftTextMessages: IMessage[] = [];
  message.text.text.forEach((m) => {
    giftTextMessages.push({
      _id: uuidv4(),
      text: m,
      user,
      createdAt: new Date(),
    });
  });
  return giftTextMessages;
};
const giftPayloadMessage = (
  message: ResponseMessage,
  user: User,
): IMessage[] => {
  const giftPayloadMessages: IMessage[] = [];
  if (message.payload.richContent) {
    message.payload.richContent.forEach((elements) => {
      try {
        processElements(elements, giftPayloadMessages, user);
      } catch (e) {
        console.error("Error processiong ", elements);
      }
    });
  }
  return giftPayloadMessages;
};
const processElements = (
  elements,
  giftPayloadMessages: IMessage[],
  user: User,
) => {
  let currentList: Array<IListMessage> = [];
  let previousElement = null;
  elements.forEach((element) => {
    switch (element.type) {
      case "chips":
        const chipElement = element as ChipElement;
        giftPayloadMessages.push({
          _id: uuidv4(),
          text: "",
          user,
          createdAt: new Date(),
          quickReplies: {
            values: chipElement.options.map((option): Reply => {
              return {
                title: option.text,
                value: option.text,
                link: option.link,
                image: option.image?.src?.rawUrl,
              };
            }),
            type: "radio",
            keepIt: false,
          },
        });
        previousElement = element.type;
        break;
      case "info":
        const infoElement = element as InfoElement;
        giftPayloadMessages.push({
          _id: uuidv4(),
          text: "",
          user,
          createdAt: new Date(),
          info: {
            title: infoElement.title,
            subtitle: infoElement.subtitle,
            image: infoElement.image?.src?.rawUrl,
            link: infoElement.actionLink,
            raw: infoElement,
          },
        });
        previousElement = element.type;
        break;
      case "description":
        const descriptionElement = element as DescriptionElement;
        giftPayloadMessages.push({
          _id: uuidv4(),
          text: "",
          user,
          createdAt: new Date(),
          description: {
            title: descriptionElement.title,
            text: descriptionElement.text,
          },
        });
        previousElement = element.type;
        break;
      case "image":
        const imageElement = element as ImageElement;
        giftPayloadMessages.push({
          _id: uuidv4(),
          text: "",
          user,
          createdAt: new Date(),
          image: imageElement.rawUrl,
        });
        previousElement = element.type;
        break;
      case "button":
        const buttonElement = element as ButtonElement;
        giftPayloadMessages.push({
          _id: uuidv4(),
          text: "",
          user,
          createdAt: new Date(),
          button: {
            icon: buttonElement.icon?.type,
            color: buttonElement.icon?.color,
            text: buttonElement.text,
            link: buttonElement.link,
            event: buttonElement.event?.name,
            parameters: buttonElement.event?.parameters,
            raw: buttonElement,
          },
        });
        previousElement = element.type;
        break;
      case "accordion":
        const accordionElement = element as AccordionElement;
        giftPayloadMessages.push({
          _id: uuidv4(),
          text: "",
          user,
          createdAt: new Date(),
          accordion: {
            title: accordionElement.title,
            subtitle: accordionElement.subtitle,
            image: accordionElement.image?.src?.rawUrl,
            text: accordionElement.text,
            raw: accordionElement,
          },
        });
        previousElement = element.type;
        break;
      case "list":
        const listElement = element as ListElement;
        if (previousElement != "list" && previousElement != "divider") {
          if (currentList.length > 0) {
            giftPayloadMessages.push({
              _id: uuidv4(),
              text: "",
              user,
              createdAt: new Date(),
              list: currentList,
            });
          }
          currentList = [];
        }
        currentList.push({
          title: listElement.title,
          subtitle: listElement.subtitle,
          event: listElement.event?.name,
          parameters: listElement.event?.parameters,
          isDivider: false,
          raw: listElement,
        });
        previousElement = element.type;
        break;
      case "divider":
        if (previousElement != "list" && previousElement != "divider") {
          if (currentList.length > 0) {
            giftPayloadMessages.push({
              _id: uuidv4(),
              text: "",
              user,
              createdAt: new Date(),
              list: currentList,
            });
          }
          currentList = [];
        }
        currentList.push({
          isDivider: true,
        });
        previousElement = element.type;
        break;
    }
  });
  if (currentList.length > 0) {
    giftPayloadMessages.push({
      _id: uuidv4(),
      text: "",
      user,
      createdAt: new Date(),
      list: currentList,
    });
  }
};

const dialogFlowMessagesToGiftMessages = (
  messages: ResponseMessage[],
  user: User,
): IMessage[] => {
  const giftMessages: IMessage[] = [];
  messages.forEach((message) => {
    if (message.text) {
      giftMessages.push(...giftTextMessage(message, user));
    } else if (message.payload) {
      giftMessages.push(...giftPayloadMessage(message, user));
    }
  });
  return giftMessages.reverse();
};

const repluToGiftMessage = (reply: Reply): IMessage => {
  if (reply.link) {
    return null;
  }
  return {
    _id: uuidv4(),
    user: {
      _id: 1,
      avatar: null,
    },
    createdAt: new Date(),
    text: reply.value,
  };
};
export { dialogFlowMessagesToGiftMessages, repluToGiftMessage };
