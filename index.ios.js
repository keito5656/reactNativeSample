/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 var MOCKED_MOVIES_DATA = [
  {title: 'Title', year: '2015', posters: {thumbnail: 'http://i.imgur.com/UePbdph.jpg'}},
];
var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';


import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ListView
} from 'react-native';

class tutorial extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
        sectionHeaderHasChanged: (s1, s2) => s1 !== s2
      }),
      loaded: false
    }
  }
  componentDidMount() {
    this.fetchData()
  }
  fetchData() {
    fetch(REQUEST_URL)
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRowsAndSections(this.converContent(responseData.movies)),
        loaded: true,
      });
      console.log('done fetch');
    })
    .done()
  }

  converContent(content) {
    var sectionHeaderData = {}; // Create the blank map
    content.forEach(function(item) {
      if (!sectionHeaderData[item.title]) {
        // Create an entry in the map for the category if it hasn't yet been created
        sectionHeaderData[item.title] = [];
      }
      sectionHeaderData[item.title].push(item);
    });
    return sectionHeaderData;
  }
  render() {
    console.log('rende Called');
    if (!this.state.loaded) {
      return this.renderLoadingView()
    }
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderMovie}
        style={styles.listView}
        renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator} />}
        renderSectionHeader={this.renderSectionHeader}
      />
    )
  }

  renderMovie(movie) {
    return (
      <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{uri: movie.posters.thumbnail}}
          style={styles.thumbnail}
        />
      </View>
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.year}>{movie.year}</Text>
        </View>
      </View>
    );
  }

  renderSectionHeader(sectionData, title) {
    return (
      <View style={styles.headerContainer}>
      <Image
        source={{uri: 'http://i.imgur.com/UePbdph.jpg'}}
        style={styles.profileThumbnail}
      />
        <Text style={styles.userName}>カモメ</Text>
      </View>
    )
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading movies...
        </Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  separator: {
    height: 10,
    backgroundColor: '#CCCCCC',
  },
  headerContainer: {
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginBottom: 5,
    marginTop: 5,
    backgroundColor: '#ffffff'
  },
  profileThumbnail: {
    marginTop: 10,
    marginLeft: 10,
    width: 30,
    height: 30,
  },
  userName: {
    fontSize: 20,
    marginTop: 10,
    marginLeft: 5,
    textAlign: 'left'
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 20,
    marginBottom: 8,
    marginTop: 10,
    textAlign: 'center'
  },

  rightContainer: {
    flex: 1
  },
    year: {
    textAlign: 'center'
  },
  thumbnail: {
    width: 320,
    height: 320,
    alignItems: 'center'
  },
  listView: {
    paddingTop: 20,
  }
});

AppRegistry.registerComponent('tutorial', () => tutorial);
