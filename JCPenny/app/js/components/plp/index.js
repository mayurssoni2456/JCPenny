
import React, { Component } from 'react';


import { Container, Content, Text, Button, Icon, Left, Right, Body, Grid, ListItem, List, Thumbnail, Spinner } from 'native-base';
import {StyleSheet, TouchableOpacity, View, ScrollView, TouchableHighlight, ListView} from 'react-native';

//import styles from './styles';
import Footer from '../footer';
import {Actions} from "react-native-router-flux";

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
  viewRow: {
    flex:1,
      flexDirection: 'row',
      padding: 5,
      margin: 10,
      borderBottomWidth: 1,
      borderColor: '#CCC'
  },

});

export default class PLP extends Component {

  static propTypes = {
    pushRoute: React.PropTypes.func,
    title: React.PropTypes.string,
    headerIconDetails: React.PropTypes.shape({
      key: React.PropTypes.string
    }),
    loading: React.PropTypes.bool
  }

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      results: [],
      loading: true,
      dataSource: ds.cloneWithRows([{name:'Loading', image: {url:'https://m.jcpenney.com/v4/categories/root'}}])
    }
  }

  load(url) {
    var that = this;
    // Set loading to true when the search starts to display a Spinner
     // that.setState({
     //   loading: true
     // });

    
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
          // Store the results in the state variable results and set loading to 
          // false to remove the spinner and display the list of categories
          console.log(responseJson);
          // this.setState({
          //   title:responseJson.name || responseJson.query.split('+').join(' ')
          // });
          let results = [];
          if(responseJson.products){
            if(!responseJson.products.data){
              results = responseJson.products;
              // that.setState({
              //     results: responseJson.products,
              //     loading: false
              // });
            }
            else {
              results = responseJson.products.data;
              // that.setState({
              //     results: responseJson.products.data,
              //     loading: false
              // });
            }
          }
          
          else {
            fetch(responseJson.groups[0].categories[0].href)
            .then((response) => response.json())
            .then((responseJson) => {
                // Store the results in the state variable results and set loading to 
                // false to remove the spinner and display the list of categories
                if(responseJson.products){
                  if(!responseJson.products.data){
                    results = responseJson.products;
                    // that.setState({
                    //     results: responseJson.products,
                    //     loading: false
                    // });
                  }
                  else {
                    results = responseJson.products.data;
                    // that.setState({
                    //     results: responseJson.products.data,
                    //     loading: false
                    // });
                  }
                  
                }
                
                
            })
            .catch((error) => {

                that.setState({
                    loading: false
                });

                console.error(error);
            });
            
          }

          const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
          that.setState({
              results: results,
              loading: false,
              dataSource:ds.cloneWithRows(results)
          });
      })
      .catch((error) => {

          that.setState({
              loading: false
          });

          console.error(error);
      });
  }

  componentDidMount() {

    //const { props: { plpUrl } } = this;
    const plpUrl = this.props.plpUrl || {};
    this.load(plpUrl);
    //this.props.setPLP(undefined);
    /*this.setState({
      title:'Red Dress'
    });*/
  }

  pushRoute(name,pdpUrl) {
    Actions.pdp({pdpUrl:pdpUrl, title:name})
  }

  render() {
      return(
        <View {...this.props}  style={styles.container}>
          <ScrollView>
          
            <ListView
              initialListSize={24}
              dataSource = {this.state.dataSource}
              renderRow = {
                 (rowData, sectionId, rowID) => (
                   
                <TouchableHighlight onPress={() =>  this.pushRoute(rowData.name, rowData.url)} underlayColor='rgba(0,0,0,0)' style={styles.viewRow}>
                  <View style={{ flex:1,flexDirection: 'row', alignItems: 'center'}}>
                    <Thumbnail square size={80} source={require('../../../images/no-image-icon-15.png')} />
                    <Text style={{fontWeight: '200', color: '#696969', fontSize: 14, flex:1}}>{rowData.name}</Text>
                    {rowData.prices ? 
                    <View >
                      <Text style={{fontWeight: '200', color: '#696969', fontSize: 14, flex:1}}>{rowData.prices[0].max} sale</Text>
                      <Text style={{fontWeight: '200', color: '#696969', fontSize: 14, flex:1}}>{rowData.prices[1].max} original</Text>
                    </View>
                    :
                    null
                    }
                  </View>
                </TouchableHighlight>
                 )
              }
            />

            
          
          </ScrollView>
          <Footer/>
        </View>
      );
  }
}
