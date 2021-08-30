import React, { Component } from "react";
import { View, Text, StyleSheet, ColorValue } from "react-native";
import { IMessage } from "../Models";
export interface DescriptionProps {
  currentMessage?: IMessage;
  backgroundColor: ColorValue;
  color: ColorValue;
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginTop: 20,
    marginBottom: 20,
    flexDirection: "row",
    minWidth: 300,
  },
  wrapText: {},
  title: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {},
  wrapper: {
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
});

export default class MessageDescription extends Component<DescriptionProps> {
  render() {
    const { currentMessage, color, backgroundColor } = this.props;
    return (
      <View style={[styles.wrapper, { backgroundColor }]}>
        <View style={[styles.container]}>
          <View style={styles.wrapText}>
            <Text style={[styles.title, { color }]}>
              {currentMessage.description.title}
            </Text>
            {currentMessage.description.text.map((text, index) => (
              <Text key={index} style={[styles.text, { color }]}>
                {text}
              </Text>
            ))}
          </View>
        </View>
      </View>
    );
  }
}
