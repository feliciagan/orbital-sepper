import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  Button,
} from 'react-native';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  connectRefinementList,
} from 'react-instantsearch-native';
import SearchBox from '../components/SearchBox';
import InfiniteHits from '../components/InfiniteHits';
import Filters from '../components/Filters';
import { auth, db } from '../firebase/index.js'
import { onSnapshot, query, collection, orderBy, getDoc } from 'firebase/firestore';
import colors from "../assets/colors/colors.js";

//const productDoc = id => collection(db, '/tasks/${id} ')
const searchClient = algoliasearch(
  '5LE4KG5PFC',
  'b3d6181964669a080786eb2524d5a477'
);

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

const VirtualRefinementList = connectRefinementList(() => null);

class ForumSearchScreen extends React.Component {
  root = {
    Root: View,
    props: {
      style: {
        flex: 1,
      },
    },
  };

  state = {
    isModalOpen: false,
    searchState: {},
  };

  toggleModal = () =>
    this.setState(({ isModalOpen }) => ({
      isModalOpen: !isModalOpen,
    }));

  onSearchStateChange = searchState =>
    this.setState(() => ({
      searchState,
    }));

  

  render() {
    const { isModalOpen, searchState } = this.state;

    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar barStyle="light-content" />
        <View style={styles.container}>
          <InstantSearch
            searchClient={searchClient}
            indexName="tasks"
            root={this.root}
            searchState={searchState}
            onSearchStateChange={this.onSearchStateChange}
          >
            {/*<VirtualRefinementList attribute="tag" />

            <Filters
              isModalOpen={isModalOpen}
              searchClient={searchClient}
              searchState={searchState}
              toggleModal={this.toggleModal}
              onSearchStateChange={this.onSearchStateChange}
            />  */}

            <SearchBox />
            {/*<Button
              title="Filters"
              color="#252b33"
              onPress={this.toggleModal}
            /> */}
            <InfiniteHits />
          </InstantSearch>
        </View>
      </SafeAreaView>
    );
  }
}

export default ForumSearchScreen;

