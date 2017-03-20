
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Content, Text, Button, Icon, Left, Right, Body, Grid, ListItem, List, Thumbnail, Spinner } from 'native-base';
import { View } from 'react-native';
import { setPLP } from '../../actions/plp';
import styles from './styles';
import FooterBar from '../footer';
import HeaderBar from '../header';

const {
  popRoute,
  pushRoute
} = actions;

class PLP extends Component {

  static propTypes = {
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
    pushRoute: React.PropTypes.func,
    title: React.PropTypes.string,
    headerIconDetails: React.PropTypes.shape({
      key: React.PropTypes.string
    }),
    loading: React.PropTypes.bool,
    setPLP: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      title: 'PLP',
      headerIconDetails: {
        leftHeaderIcon:'ios-arrow-back',
        leftHeaderIconAction: 'popRoute',
        rightHeaderIcon: 'search',
        rightHeaderIconAction: 'search'  
      },
      results: [],
      loading: true
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
            title:responseJson.name || responseJson.query.split('+').join(' ')
          });
          if(responseJson.products){
            if(!responseJson.products.data){
              that.setState({
                  results: responseJson.products,
                  loading: false
              });
            }
            else {
              that.setState({
                  results: responseJson.products.data,
                  loading: false
              });
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
                    that.setState({
                        results: responseJson.products,
                        loading: false
                    });
                  }
                  else {
                    that.setState({
                        results: responseJson.products.data,
                        loading: false
                    });
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
      })
      .catch((error) => {

          that.setState({
              loading: false
          });

          console.error(error);
      });
  }

  componentDidMount() {

    const { props: { plpUrl } } = this;
    this.load(plpUrl);
    this.props.setPLP(undefined);
    /*this.setState({
      title:'Red Dress'
    });*/
  }

  //popRoute() {
    //this.props.popRoute(this.props.navigation.key);
  //}

  pushRoute(route, index) {
    this.props.pushRoute({ key: route, index: 1 }, this.props.navigation.key);
  }

  render() {
    
    
      //this.load(plpUrl);
      console.log(this.state.results);
      return(
      
      <Container style={styles.container}>
        <HeaderBar title={this.state.title} headerIconDetails={this.state.headerIconDetails} />
        
          <Content padder>
            <Grid style={styles.mt}>
              {this.state.loading ? 
                <Spinner /> : 
              <List dataArray={this.state.results} renderRow={(item) =>
                  <ListItem button onPress={() => this.pushRoute('pdp', item.url)}>
                      <Thumbnail square size={80} source={{uri: 'https://s7d9.scene7.com/is/image/JCPenney/DP1129201621250175S.jpg'}} />
                      <Text style={{fontWeight: '200', color: '#696969', fontSize: 14, flex:1}}>{item.name}</Text>
                      <View>
                        <Text style={{fontWeight: '200', color: '#696969', fontSize: 14, flex:1}}>{item.prices[0].max} sale</Text>
                        <Text style={{fontWeight: '200', color: '#696969', fontSize: 14, flex:1}}>{item.prices[1].max} original</Text>
                      </View>
                  </ListItem>
              } />
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
    setPLP: plpUrl => dispatch(setPLP(plpUrl)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
  plpUrl: state.plp.plpUrl
});


export default connect(mapStateToProps, bindAction)(PLP);
