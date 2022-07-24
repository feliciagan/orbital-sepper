import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import { connectSearchBox } from 'react-instantsearch-native';
import colors from "../assets/colors/colors.js";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
    flexDirection: 'row'
  },
  input: {
    width: 320,
    height: 48,
    padding: 12,
    marginLeft: 12,
    fontSize: 16,
    backgroundColor: colors.pink,
    borderRadius: 10,
    //borderWidth: 1,
    //borderColor: '#ddd',
    //shadowColor: '#000',
    //shadowOffset: { width: 0, height: 2 },
    //shadowOpacity: 0.2,
    //shadowRadius: 2,
  },
});

const SearchBox = ({ currentRefinement, refine }) => (
  <View style={styles.container}>
    <Ionicons name='search' color={colors.blue} size={40}></Ionicons>
    <TextInput
      style={styles.input}
      onChangeText={value => refine(value)}
      value={currentRefinement}
      placeholder=""
    />
  </View>
);

SearchBox.propTypes = {
  currentRefinement: PropTypes.string.isRequired,
  refine: PropTypes.func.isRequired,
};

export default connectSearchBox(SearchBox);