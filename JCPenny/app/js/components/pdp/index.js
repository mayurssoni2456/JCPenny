
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Content, Text, Button, Icon, Left, Right, Body, Grid, ListItem, List, Thumbnail, Spinner } from 'native-base';
import {Image, View, ScrollView} from 'react-native';
import styles from './styles';
import Footer from '../footer';
const {
  popRoute,
  pushRoute
} = actions;

export default class PDP extends Component {

  static propTypes = {
    pushRoute: React.PropTypes.func,
    title: React.PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {
      loading: 'true',
      results: []
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
          this.setState({
            title:responseJson.name
          });
          
          that.setState({
              results: responseJson,
              loading: false
          });
      })
      .catch((error) => {

          that.setState({
              loading: false
          });

          console.error(error);
      });
  }

  componentDidMount(){
    //const { props: { pdpUrl } } = this;
    const pdpUrl = this.props.pdpUrl || 'No Title';
    this.load(pdpUrl);
    //this.props.setPDP(undefined);
  }

  render() {
      return(
    
      <View {...this.props}  style={styles.container}>
        
        <ScrollView>
        {
          this.state.loading ? <Spinner/> : 
          <View>
          { this.state.results.image ? 
          <Image style={{width: 300, height: 300}} source={{uri:this.state.results.image.url }}/>
          :
          null
          }
          { this.state.results.images ? 
          <Image style={{width: 300, height: 300}} source={{uri:this.state.results.images[0].url }}/>
          :
          null
          } 
          </View>
        }      
        
        </ScrollView>

        <Footer />
      </View>

      );
  }
}

