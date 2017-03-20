import React, { Component } from 'react';
import { TouchableOpacity, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Title, Content, Text, Button, Icon, Left, Body, Right, Spinner, Thumbnail, List, ListItem} from 'native-base';
import { Grid, Row } from 'react-native-easy-grid';

import styles from './styles';
import FooterBar from '../footer';
import HeaderBar from '../header';

const {
  //reset,
  pushRoute,
} = actions;

class Stores extends Component {

  static propTypes = {
    loading: React.PropTypes.bool,
    pushRoute: React.PropTypes.func,
    results: React.PropTypes.arrayOf(React.PropTypes.string),
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
    title: React.PropTypes.string,
    headerIconDetails: React.PropTypes.shape({
      key: React.PropTypes.string
    })
  }

  constructor(props) {
    super(props);
    this.state = {
      results: [],
      title: 'Stores',
      headerIconDetails: {
        leftHeaderIcon:'ios-arrow-back',
        leftHeaderIconAction: 'popRoute',
        rightHeaderIcon: 'search',
        rightHeaderIconAction: 'search'  
      },
    }
  }

  componentDidMount() {
    var that = this;
    that.load();
  }

  pushRoute(route, index) {
    this.props.setIndex(index);
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
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
          that.setState({
              results: responseJson.groups[0].categories,
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

  render() {
    return (
      <Container style={styles.container}>
        <HeaderBar title={this.state.title} headerIconDetails={this.state.headerIconDetails} />
      
        <Content>
          <Grid style={styles.mt}>
           <Text>Stores</Text>
    
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
    popRoute: key => dispatch(popRoute(key))
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(Stores);