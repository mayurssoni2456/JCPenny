
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Content, Text, List, ListItem, Header, Left, Body, Right, Button, Icon, Title, InputGroup, Input, Item } from 'native-base';

//import { setIndex } from '../../actions/list';
//import { actions } from 'react-native-navigation-redux-helpers';
//import { setPLP } from '../../actions/plp';
//import navigateTo from '../../actions/sideBarNav';
import myTheme from '../../themes/base-theme';

import styles from './style';
import SearchBar from './../searchBar'

// const {
//   reset,
//   pushRoute,
//   popRoute
// } = actions;

class HeaderBar extends Component {

  /*static propTypes = {
    // setIndex: React.PropTypes.func,
    navigateTo: React.PropTypes.func,
  }*/

  /*static propTypes = {
    //name: React.PropTypes.string,
    //navigateTo: React.PropTypes.func,
    //reset: React.PropTypes.func,
    popRoute: React.PropTypes.func
  }*/
  static propTypes = {
    // navigation: React.PropTypes.shape({
    //   key: React.PropTypes.string,
    // }),
    pushRoute: React.PropTypes.func,
    title: React.PropTypes.string,
    navigateTo: React.PropTypes.func,
    popRoute: React.PropTypes.func,
    setPLP: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      search: 'Red Dress',
      status:false
    }
  }

  //navigateTo(route) {
    //this.props.navigateTo(route, 'home');
  //}

  popRoute() {
    this.props.popRoute(this.props.navigation.key);
  }

  pushRoute(route) {
    //this.props.setIndex(index);
    //alert(plpUrl)
    let plpUrl = 'https://m.jcpenney.com/v4/search?q=' + this.state.searchText;
    this.props.setPLP(plpUrl);
    this.props.pushRoute({ key: route, index: 2 }, this.props.navigation.key);
  }

  searchToggle() {
    this.setState({
      status:!this.state.status
    })
  }

  render() {
    let href = "https://m.jcpenney.com/v4/search?q=red%20dress";
    return (
      <View >
      <Header>
        
          <Left>
            {
              this.props.headerIconDetails.leftHeaderIcon ? 
                <Button transparent onPress={() => this.popRoute()}>
                  <Icon active name={this.props.headerIconDetails.leftHeaderIcon} />
                </Button>
                :
                <Text></Text>
              
            }
            
          </Left>

          <Body>
            <Title>{(this.props.title) ? this.props.title : 'Departments'}</Title>
          </Body>

          <Right>
          {
            this.props.headerIconDetails.rightHeaderIcon ?
            <Button transparent onPress={() => this.searchToggle()}>
              <Icon name={this.props.headerIconDetails.rightHeaderIcon} />
            </Button>
            :
            <Text></Text>
          }
          </Right>
        
       
      </Header>
       {this.state.status && <View style={{backgroundColor: '#f7f7f7'}}>
          <InputGroup>                                             
            <Input placeholder="Search" value={this.state.searchText}  onChangeText={(text) => this.setState({searchText:text})}/>                    
            <Button transparent onPress={()=>this.pushRoute('plp')}><Text>Go</Text></Button>
          </InputGroup>                    
          
        </View>
        }
      </View>
    );
  }
}

// function bindAction(dispatch) {
//   return {
//     popRoute: key => dispatch(popRoute(key)),
//     pushRoute: (route, key) => dispatch(pushRoute(route, key)),
//     setPLP: plpUrl => dispatch(setPLP(plpUrl))
//   };
// }

// const mapStateToProps = state => ({
//   navigation: state.cardNavigation,
// });

// export default connect(mapStateToProps, bindAction)(HeaderBar);
