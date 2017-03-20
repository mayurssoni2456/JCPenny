
import React, { Component } from 'react';
import { TouchableOpacity, View, ScrollView, TouchableHighlight, ListView } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Title, Content, Text, Button, Icon, Left, Body, Right, Spinner, Thumbnail, List, ListItem} from 'native-base';
import { Grid, Row } from 'react-native-easy-grid';

import { setDepartment } from '../../actions/department';
import styles from './styles';
import FooterBar from '../footer';
import HeaderBar from '../header';

const {
  //reset,
  pushRoute,
} = actions;

class Departments extends Component {

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
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      results: [],
      title: 'Departments',
      headerIconDetails: {
        rightHeaderIcon: 'search',
        rightHeaderIconAction: 'search'
      },
      dataSource: ds.cloneWithRows([{name:'Loading', image: {url:'https://m.jcpenney.com/v4/categories/root'}}])
    }
  }

  componentDidMount() {
    console.log('mount');
    var that = this;
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

  pushRoute(route, index) {
    this.props.setDepartment({'subCategoryData': this.state.results[index].groups, 'subCategoryTitle': this.state.results[index].name})
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

  render() {
    console.log(this.state.results);

    let counter = 0;
    return (
      <Container style={styles.container}>
        <HeaderBar title={this.state.title} headerIconDetails={this.state.headerIconDetails} />
      
        <Content>
          <Grid style={styles.mt}>
           {this.state.loading ? 
              <Spinner /> : 

              <ListView
                contentContainerStyle={styles.listView}
                initialListSize={24}
                dataSource = {this.state.dataSource}
                renderRow = {
                   (rowData, sectionId, rowID) => (
                     
                  <TouchableHighlight onPress={() => this.pushRoute('subCategories', rowID)} underlayColor='rgba(0,0,0,0)' style={styles.viewRow}>
                    <View>
                        <Thumbnail square size={80} source={{uri: rowData.image.url}} />
                        <Text style={{flex: 1,fontWeight: '200', color: '#696969', alignItems: 'center'}}>{rowData.name}</Text>
                    </View>
                  </TouchableHighlight>
                   )
                }
             />
            }
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
    popRoute: key => dispatch(popRoute(key)),
    setDepartment: subCategoryInfo => dispatch(setDepartment(subCategoryInfo))
  };
}

const mapStateToProps = state => ({
  departmentData: state.department.departmentData,
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(Departments);
