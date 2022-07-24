import React from 'react';
import { Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { connectHighlight } from 'react-instantsearch-native';

const Highlight = ({ attribute, hit, highlight }) => {
  const highlights = highlight({
    highlightProperty: '_highlightResult',
    attribute,
    hit,
  });

  return (
    <Text>
      {highlights.map(({ value, isHighlighted }, index) => {
        const style = {
          backgroundColor: isHighlighted ? 'yellow' : 'transparent',
        };

        return (
          <Text key={index} style= {styles.words}>
            @{value}
          </Text>
        );
      })}
    </Text>
  );
};

Highlight.propTypes = {
  attribute: PropTypes.string.isRequired,
  hit: PropTypes.object.isRequired,
  highlight: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  words: {
    fontStyle: 'italic'
  }
})

export default connectHighlight(Highlight);