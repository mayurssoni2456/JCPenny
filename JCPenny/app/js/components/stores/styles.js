
const React = require('react-native');

const { StyleSheet } = React;
export default {
  container: {
    backgroundColor: '#FFFFFF',
    flex:1
  },
  row: {
    justifyContent: 'center',
    padding: 5,
    margin: 10,
    width: 100,
    height: 100,
    backgroundColor: '#F6F6F6',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#CCC'
  },
  text: {
    fontSize: 20,
    marginBottom: 15,
    alignItems: 'center',
  },
  mt: {
    marginTop: 18,
  },
  inputView:
  {
    flex:1,
    height: 26,
    borderColor: 'red',
    borderBottomWidth: 1,
    justifyContent:'flex-start',
    marginRight:10,
    marginLeft:5,
  },
  mapIconView:
  {
    flexDirection:'row',
    alignItems: 'center',    
    // backgroundColor:'blue'
  },
  input:
  {
    // flex:1,
    height: 25,
    // backgroundColor: '#F6F6F6',
    borderBottomWidth: 1,
    // margin:10,
    // borderWidth: 1,
    // borderColor:'#D7D7D7',
  }
};
