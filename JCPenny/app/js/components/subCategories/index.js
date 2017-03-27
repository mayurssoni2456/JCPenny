import React from 'react';
import {StyleSheet, TouchableOpacity, View, ScrollView, TouchableHighlight, ListView} from "react-native";
import Button from "react-native-button";
import {Actions} from "react-native-router-flux";
import { Container, Title, Content, Text, Icon, Left, Body, Right, Spinner, Thumbnail, List, ListItem} from 'native-base';
import Footer from '../footer';

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        flex:1
    },
    row: {
      flex:1,
      flexDirection: 'row',
      padding: 5,
      margin: 10,
      borderBottomWidth: 1,
      borderColor: '#CCC'
    }
});


export default class extends React.Component {
    constructor(props) {
      super(props);
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = {
        results: [],
        dataSource: ds.cloneWithRows([{name:'Loading', image: {url:'https://m.jcpenney.com/v4/categories/root'}}])
      };
    }

    pushRoute(name,href){
      Actions.plp({plpUrl:href, title:name})
    }

    componentDidMount() {

      const data = this.props.data || {};
      // this.setState({
      //   results: data
      // });
      let ds = [];
      data.forEach(function(item, i){
        item.categories.forEach(function(innerItem, j) {
          ds.push(innerItem);
        });
      });
      console.log(ds);
      const ds1 = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
          this.setState({
              results: ds,
              loading: false,
              dataSource:ds1.cloneWithRows(ds)
          });
    }

    render(){
        return (
            <View style={[styles.container, this.props.style]}>
               
              <ListView
                initialListSize={24}
                dataSource = {this.state.dataSource}
                renderRow = {
                   (rowData, sectionId, rowID) => (
                     
                  <TouchableHighlight onPress={() => this.pushRoute(rowData.name,rowData.href)} underlayColor='rgba(0,0,0,0)' style={styles.row}>
                    <View style={{ flex:1,flexDirection: 'row', alignItems: 'center'}}>
                      <Thumbnail square size={80} source={{uri: rowData.image ? rowData.image.url : 'https://www.freeiconspng.com//uploads//no-image-icon-15.png'}} />
                      <Text style={{fontWeight: '200', color: '#696969', marginLeft:10}}>{rowData.name}</Text>
                    </View>
                  </TouchableHighlight>
                   )
                }
             />
             <Footer />
            </View>
        );
    }
}
