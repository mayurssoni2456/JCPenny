import React from 'react';
import {StyleSheet, TouchableOpacity, View, ScrollView, TouchableHighlight, ListView} from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";
import Footer from '../footer';

var SplashScreen = require('@remobile/react-native-splashscreen');
import { Container, Title, Content, Text, Icon, Left, Body, Right, Spinner, Thumbnail, List, ListItem} from 'native-base';


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1
  },
  text: {
    fontSize: 20,
    marginBottom: 15,
    alignItems: 'center',
  },
  mt: {
    marginTop: 18,
  },
  listView: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  viewRow: {
    justifyContent: 'center',
    padding: 5,
    margin: 10,
    width: 100,
    height: 150,
    backgroundColor: '#FFFFFF',
    alignItems: 'center'
  }
});

export default class Departments extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      results: [],
      dataSource: ds.cloneWithRows([{name:'Loading', image: {url:'https://m.jcpenney.com/v4/categories/root'}}])
    }
  }

  componentDidMount() {

    console.log('mount');
    var that = this;
    SplashScreen.hide();
    // const { props: { departmentData, list } } = that;
    // console.log(departmentData);
    // if(departmentData && departmentData.length > 0){
    //   alert('cache');
    //   this.setState({
    //     results: departmentData
    //   });
    // }
    // else {
    that.load();
    //}
    
  }

  pushRoute(index) {
    Actions.subCategories({data:this.state.results[index].groups, title: this.state.results[index].name})
  }

  load() {
    var that = this;
    // Set loading to true when the search starts to display a Spinner
    that.setState({
      loading: true
    });

    
    return fetch('https://m.jcpenney.com/v4/categories/root')
      .then((response) => response.json())
      .then((responseJson) => {
          // Store the results in the state variable results and set loading to 
          // false to remove the spinner and display the list of categories
          const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
          that.setState({
              results: responseJson.groups[0].categories,
              loading: false,
              dataSource:ds.cloneWithRows(responseJson.groups[0].categories)
          });
          

      })
      .catch((error) => {

          that.setState({
              loading: false
          });

          console.error(error);
      });
  }

  render(){
    return (
      <View {...this.props}  style={styles.container}>
        

        <ListView
          contentContainerStyle={styles.listView}
          initialListSize={24}
          dataSource = {this.state.dataSource}
          renderRow = {
             (rowData, sectionId, rowID) => (
               
            <TouchableHighlight onPress={() => this.pushRoute(rowID)} underlayColor='rgba(0,0,0,0)' style={styles.viewRow}>
              <View>
                  <Thumbnail square size={80} source={{uri: rowData.image.url}} />
                  <Text style={{flex: 1,fontWeight: '200', color: '#696969', alignItems: 'center'}}>{rowData.name}</Text>
              </View>
            </TouchableHighlight>
             )
          }
        />
        <Footer/>
      </View>
    );
  }
}
