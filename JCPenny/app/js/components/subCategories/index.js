
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Content, Text, Button, Icon, Left, Right, Body, Grid, ListItem, List, Thumbnail, Spinner } from 'native-base';

import { setPLP } from '../../actions/plp';
import { setDepartment } from '../../actions/department';

import styles from './styles';
import FooterBar from '../footer';
import HeaderBar from '../header';

const {
  popRoute,
  pushRoute
} = actions;

class SubCategories extends Component {

  static propTypes = {
    departmentData: React.PropTypes.arrayOf(React.PropTypes.string),
    cachedDepartmentData: React.PropTypes.arrayOf(React.PropTypes.string),
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
    pushRoute: React.PropTypes.func,
    title: React.PropTypes.string,
    setPLP: React.PropTypes.func,
    headerIconDetails: React.PropTypes.shape({
      key: React.PropTypes.string
    }),

  }

  constructor(props) {
    super(props);
    this.state = {
      title: 'Sub Categories',
      headerIconDetails: {
        leftHeaderIcon:'ios-arrow-back',
        leftHeaderIconAction: 'popRoute',
        rightHeaderIcon: 'search',
        rightHeaderIconAction: 'search'  
      },
      results: [],
      cachedDepartmentData: []
    }
  }

  /*load(url) {
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
          if(responseJson.products){
            that.setState({
                results: responseJson.products.data,
                loading: false
            });
          }
          
          else {
            fetch(responseJson.groups[0].categories.href)
            .then((response) => response.json())
            .then((responseJson) => {
                // Store the results in the state variable results and set loading to 
                // false to remove the spinner and display the list of categories
                if(responseJson.products){
                  that.setState({
                      results: responseJson.products.data,
                      loading: false
                  });
                }
                
                
            })
            .catch((error) => {

                that.setState({
                    loading: false
                });

                console.error(error);
            });
            
          }
      })
      .catch((error) => {

          that.setState({
              loading: false
          });

          console.error(error);
      });
  }*/

  componentDidMount() {
    const { props: { departmentData } } = this;
    this.setState({
      cachedDepartmentData: departmentData.subCategoryData,
      title: departmentData.subCategoryTitle
    });
    this.props.setDepartment([]);
  }

  //popRoute() {
    //this.props.popRoute(this.props.navigation.key);
  //}

  pushRoute(route, plpUrl) {
    //this.props.setIndex(index);
    //this.props.setSubCategories(this.state.results);
    this.props.setPLP(plpUrl);
    this.props.pushRoute({ key: route, index: 2 }, this.props.navigation.key);

  }

  render() {
    //const { props: { departmentData } } = this;
   
    // if(typeof departmentData === 'string') {
    //   return (
    //     <Spinner/>
    //     );
    // }
    let ds = [], items;
    // if(this.state.cachedDepartmentData){
    //   items = this.state.cachedDepartmentData
    // }
    items = this.state.cachedDepartmentData;
    // else {
    //   items = departmentData[0].groups;
    // }
    items.forEach(function(item, i){
      item.categories.forEach(function(innerItem, j) {
        ds.push(innerItem);
      });
    });
    
    return (
      <Container style={styles.container}>
        <HeaderBar title={this.state.title} headerIconDetails={this.state.headerIconDetails} />
        
        <Content padder>
          <Grid style={styles.mt}>
           
            <List dataArray={ds} renderRow={(item) =>
              <ListItem button onPress={() => this.pushRoute('plp', item.href)}>
                  <Thumbnail square size={80} source={{uri: item.image ? item.image.url : 'https://www.freeiconspng.com//uploads//no-image-icon-15.png'}} />
                  <Text style={{fontWeight: '200', color: '#696969'}}>{item.name}</Text>
              </ListItem>
            } />
          
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
    setPLP: plpUrl => dispatch(setPLP(plpUrl)),
    setDepartment: dataArray => dispatch(setDepartment(dataArray))
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  departmentData: state.department.departmentData
});


export default connect(mapStateToProps, bindAction)(SubCategories);
