import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const AfterSearchScreen = ({ route, navigation }) => {

  const { userName, post, header } = route.params;
  return (
    <View>
      <Text>{header}</Text>
    </View>
  )
}

export default AfterSearchScreen

const styles = StyleSheet.create({})