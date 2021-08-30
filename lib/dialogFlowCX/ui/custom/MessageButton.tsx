import React, { Component } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { IMessage, Reply } from "../Models";
export interface ButtonProps {
  currentMessage?: IMessage;
  backgroundColor: string;
  color: string;
  onButtonPress?(IButtonMessage): void;
}
import Icon from "react-native-vector-icons/MaterialIcons";

const styles = StyleSheet.create({
  touchable: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    borderRadius: 10,
    marginBottom: 20,
  },
  container: {
    marginLeft: 10,
    marginTop: 20,
    marginBottom: 20,
    flexDirection: "row",
    minWidth: 300,
    alignItems: "center",
    flexWrap: "wrap",
  },
  wrapText: {},
  title: {
    flex: 1,
    marginBottom: 10,
    fontSize: 16,
  },
  iconWrapper: {},
});

export default class MessageButton extends Component<ButtonProps> {
  handlePress = () => {
    if (this.props.onButtonPress) {
      this.props.onButtonPress(this.props.currentMessage.button);
    }
  };

  render() {
    const { currentMessage, backgroundColor, color } = this.props;
    return (
      <TouchableOpacity
        style={[styles.touchable, { backgroundColor }]}
        onPress={this.handlePress}
        disabled={!currentMessage.button.link && !currentMessage.button.event}
      >
        <View style={styles.container}>
          {currentMessage.button.icon && (
            <View style={styles.iconWrapper}>
              <Icon
                style={{ fontSize: 25 }}
                name={currentMessage.button.icon.replace("_", "-")}
                color={currentMessage.button.color}
              />
            </View>
          )}
          <Text style={[styles.title, { color }]}>
            {currentMessage.button.text}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
