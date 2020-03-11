import React, { Component } from 'react';
import { HomeIconWithBadge,Text, View,Button,TextInput,StyleSheet,ActivityIndicator,FlatList } from 'react-native';
import Card from './Cards';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import Search from './Search'



class HomeScreen extends Component{
    constructor(props){
        super(props);
        this.state = {
        given_name: '',
        family_name: '',
        text : '',
        email: '',
        password: '',
        loginEmail:'',
        loginPass:'',
        chit_id: '',
        chit_content:'',
        timestamp: '',
        longitude: '',
        latitude: ''
        };  
    }
    
    Show =()=>{
        this.props.navigation.navigate('UserProfile');
      }
    
    handleGivenName = (text) => {
        this.setState({ given_name: text })
    }

    handleSearch = (text) => {
        this.setState({ given_name: text })
    }
    
//     handleSearch = (value) => {
//     this.setState({ given_name: value}, this.search)
//    }
    getChits(){
        return fetch('http://10.0.2.2:3333/api/v0.0.5/chits')
        .then((response) => response.json())
        .then((responseJson) => {
        this.setState({
        isLoading: false,
        chitsContent: responseJson,
        });
        })
        .catch((error) =>{
        console.log(error);
        });
      }

      search(){
        return fetch('http://10.0.2.2:3333/api/v0.0.5/search_user?q='+this.state.given_name)
        .then((response) => response.json())
        .then((responseJson) => {
        this.setState({
        isLoading: false,
        userInfo: responseJson,
        });
        })
        .catch((error) =>{
        console.log(error);
        });
      }

      componentDidMount(){
        this.getChits();
       } 
          
 render(){
    if(this.state.isLoading){
        return(
        <View>
        <ActivityIndicator/>
        </View>
        )
    }
return( 
<View> 
    <Text style= {styles.textStyle}>Most recent chits</Text>
    <FlatList
    data={this.state.chitsContent}
    renderItem={({item})=>
  <View>
<TouchableOpacity>
<Card>
<Text style= {styles.chits}>{item.user.given_name + ' '+ item.user.family_name}</Text>
<Text style= {styles.chits}>{item.chit_content}</Text>
</Card>
</TouchableOpacity>
  </View>
  }
  keyExtractor={({id}, index) => id}
  />
 </View>
 );
 }
}

const TabNavigator = createBottomTabNavigator({
  Settings: HomeScreen,
  Home: Search,
});
export default createAppContainer(TabNavigator);



//  export default HomeScreen;

const styles = StyleSheet.create({
  textStyle: {
    fontSize : 30,
    alignSelf:'center',
    color : '#007aff',
    fontWeight : '600',
    paddingTop : 10,
    paddingBottom : 10 
  },
    chits: {
    color: 'black',
    fontSize: 20,
    textShadowColor: 'gray',
    fontFamily: 'sans-serif',
    textShadowRadius: 19,
    },
    input: {
        margin: 10,
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
      },

      
});



// style={{flexDirection: 'row',flex:1,justifyContent:'space-evenly', alignItems : 'center' }}