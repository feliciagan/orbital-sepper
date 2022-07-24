import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { connectInfiniteHits } from 'react-instantsearch-native';
import Highlight from './Highlight';
import Highlights from './Highlights';
import Highlightss from './Highlightss';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  separator: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  item: {
    padding: 10,
    //height: 120,
    flexDirection: 'column',
  },
  titleText: {
    fontWeight: 'bold',
  },

  username: {
    flexDirection: 'row',
    marginBottom: 10
  },

  asks: {
    fontStyle: 'italic'
  }
});

const InfiniteHits = ({ hits, hasMore, refineNext }) => {
  
  const navigation = useNavigation();
  /*const [record, setRecord] = useState(null);

  useEffect( () => {
    async function load() {
      if (recordDoc !== null) {
        const recordDoc = productDoc(record.objectID)
        const snapshot = await getDoc(recordDoc);
        console.log(snapshot.data());
      }
      
    }
    load();
  }, [record]); */
  return (
  <FlatList
    data={hits}
    keyExtractor={item => item.objectID}
    ItemSeparatorComponent={() => <View style={styles.separator} />}
    onEndReached={() => hasMore && refineNext()}
    renderItem={({ item }) => (
      

      <TouchableOpacity style={styles.item} 
      /*onPress={() => 
        navigation.navigate('AfterSearchScreen', {
            userName: "username",
            //profilePic: "profilePic",
            //indivpost: "indivpost",
            post: "post",
            header: item.getObject(item.objectID, {attributesToRetrieve: ["header"]})
        })}*/
        >
        <View style={styles.username}>
          <Highlight attribute="username" hit={item} />
          <Text style={styles.asks}> asks </Text>
        </View>
        <Highlights attribute="header" hit={item} />
        <Highlightss attribute="post" hit={item} />
      </TouchableOpacity>
    )}
  />
  )
};

InfiniteHits.propTypes = {
  hits: PropTypes.arrayOf(PropTypes.object).isRequired,
  hasMore: PropTypes.bool.isRequired,
  refineNext: PropTypes.func.isRequired,
};

export default connectInfiniteHits(InfiniteHits);
