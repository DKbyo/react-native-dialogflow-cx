import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
  Image
} from 'react-native'
import { IMessage, Reply } from './Models'
import Color from './Color'
import { warning, StylePropType } from './utils'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    maxWidth: 300,
  },
  quickReply: {    
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    maxWidth: 200,
    paddingVertical: 7,
    paddingHorizontal: 12,
    minHeight: 50,
    borderRadius: 13,
    margin: 3,    
  },
  quickReplyImage:{
    width: 20,
    height:20,
    marginRight: 10
  },
  quickReplyText: {
    overflow: 'visible',
  },
  sendLink: {
    borderWidth: 0,
  },
  sendLinkText: {
    color: Color.defaultBlue,
    fontWeight: '600',
    fontSize: 17,
  },
})

export interface QuickRepliesProps {
  nextMessage?: IMessage
  currentMessage?: IMessage
  color?: string
  sendText?: string
  quickReplyStyle?: StyleProp<ViewStyle>
  quickReplyTextStyle?: StyleProp<TextStyle>
  onQuickReply?(reply: Reply[]): void
  renderQuickReplySend?(): React.ReactNode
}

export interface QuickRepliesState {
  replies: Reply[],
  used: boolean
}

const sameReply = (currentReply: Reply) => (reply: Reply) =>
  currentReply.value === reply.value

const diffReply = (currentReply: Reply) => (reply: Reply) =>
  currentReply.value !== reply.value

export default class QuickReplies extends Component<
  QuickRepliesProps,
  QuickRepliesState
> {
  static defaultProps = {
    currentMessage: {
      quickReplies: [],
    },
    onQuickReply: () => {},
    color: Color.black,//Color.peterRiver,
    sendText: 'Send',
    keepReplies: false,
    renderQuickReplySend: undefined,
    quickReplyStyle: undefined,
    quickReplyTextStyle: undefined,
  }

  static propTypes = {
    currentMessage: PropTypes.object.isRequired,
    onQuickReply: PropTypes.func,
    color: PropTypes.string,
    sendText: PropTypes.string,
    keepReplies: PropTypes.bool,
    renderQuickReplySend: PropTypes.func,
    quickReplyStyle: StylePropType,
    quickReplyTextStyle: StylePropType
  }

  state = {
    replies: [],
    used: false
  }

  handlePress = (reply: Reply) => () => {
    const { currentMessage } = this.props
    const { replies } = this.state
    this.setState({used:true})
    if (currentMessage) {
      const { type } = currentMessage.quickReplies!
      switch (type) {
        case 'radio': {
          this.handleSend([reply])()
          return
        }

        case 'checkbox': {
          if (replies.find(sameReply(reply))) {
            this.setState({
              replies: this.state.replies.filter(diffReply(reply)),
            })
          } else {
            this.setState({ replies: [...this.state.replies, reply] })
          }
          return
        }

        default: {
          warning(`onQuickReply unknown type: ${type}`)
          return
        }
      }
    }
  }

  handleSend = (replies: Reply[]) => () => {
    const { currentMessage } = this.props
    if (this.props.onQuickReply) {
      this.props.onQuickReply(
        replies.map((reply: Reply) => ({
          ...reply,
          messageId: currentMessage!._id,
        })),
      )
    }
  }

  shouldComponentDisplay = () => {
    return !this.state.used;
    /*const { currentMessage, nextMessage } = this.props
    const hasReplies = !!currentMessage && !!currentMessage!.quickReplies
    const hasNext = !!nextMessage && !!nextMessage!._id
    const keepIt = currentMessage!.quickReplies!.keepIt

    if (hasReplies && !hasNext) {
      return true
    }
    if (hasReplies && hasNext && keepIt) {
      return true
    }
    return false*/
  }

  renderQuickReplySend = () => {
    const { replies } = this.state
    const { sendText, renderQuickReplySend: customSend } = this.props

    return (
      <TouchableOpacity
        style={[styles.quickReply, styles.sendLink]}
        onPress={this.handleSend(replies)}
      >
        {customSend ? (
          customSend()
        ) : (
          <Text style={styles.sendLinkText}>{sendText}</Text>
        )}
      </TouchableOpacity>
    )
  }

  render() {
    const { currentMessage, color, quickReplyStyle, quickReplyTextStyle } = this.props
    const { replies } = this.state

    if (!this.shouldComponentDisplay()) {
      return null
    }

    const { type } = currentMessage!.quickReplies!    
    return (
      <View style={styles.container}>
        {currentMessage!.quickReplies!.values.map(
          (reply: Reply, index: number) => {
            const selected =
              type === 'checkbox' && replies.find(sameReply(reply))
            return (
              <TouchableOpacity
                onPress={this.handlePress(reply)}
                style={[                  
                  styles.quickReply,                  
                  { borderColor: color },
                  selected && { backgroundColor: color },
                  quickReplyStyle,
                ]}
                key={`${reply.value}-${index}`}
              >
                {reply.image && (
                  <Image style={[styles.quickReplyImage]} source={{
                    uri: reply.image}} />
                )}
                <Text
                  numberOfLines={10}
                  ellipsizeMode={'tail'}
                  style={[
                    styles.quickReplyText,
                    { color: selected ? Color.white : color },
                    quickReplyTextStyle
                  ]}
                >
                  {reply.title}
                </Text>
              </TouchableOpacity>
            )
          },
        )}
        {replies.length > 0 && this.renderQuickReplySend()}
      </View>
    )
  }
}
