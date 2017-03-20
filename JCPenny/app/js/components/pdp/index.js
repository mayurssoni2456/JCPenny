
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Content, Text, Button, Icon, Left, Right, Body, Grid, ListItem, List, Thumbnail, Spinner } from 'native-base';

import styles from './styles';
import FooterBar from '../footer';
import HeaderBar from '../header';

const {
  popRoute,
  pushRoute
} = actions;

class PDP extends Component {

  static propTypes = {
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
    pushRoute: React.PropTypes.func,
    title: React.PropTypes.string,
    headerIconDetails: React.PropTypes.shape({
      key: React.PropTypes.string
    })
  }

  constructor(props) {
    super(props);
    this.state = {
      title: 'PDP',
      headerIconDetails: {
        leftHeaderIcon:'ios-arrow-back',
        leftHeaderIconAction: 'popRoute',
        rightHeaderIcon: 'search',
        rightHeaderIconAction: 'search'  
      },
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

  //popRoute() {
    //this.props.popRoute(this.props.navigation.key);
  //}

  pushRoute(route, index) {
    this.props.setIndex(index);
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }

  render() {
    const { props: { index, list } } = this;
    
      this.load(index);
      return(
      
      <Container style={styles.container}>
        <HeaderBar title={this.state.title} headerIconDetails={this.state.headerIconDetails} />
        
        <Content padder>
          <Grid style={styles.mt}>
          <Text>PDP</Text>
          
          </Grid>
        </Content>

        <FooterBar />
      </Container>

      );
  }
}

function bindAction(dispatch) {
  return {
    pushRoute: (route, key) => dispatch(pushRoute(route, key)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});


export default connect(mapStateToProps, bindAction)(PDP);
