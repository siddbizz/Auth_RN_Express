import React from 'react';
import { StyleSheet, View, Image, KeyboardAvoidingView, Keyboard, AsyncStorage, ActivityIndicator } from 'react-native';
import Input from '../Components/Input/Input';
import CustomButton from '../Components/Button/Button';
import TextButton from '../Components/TextButton/TextButton';
import {URL} from '../Common/URL';
import axios from 'axios';

export default class AuthScreen extends React.Component {
  state= {
    username: '',
    Password: '',
    loading: true
  }

  async componentDidMount() {
    const token = await AsyncStorage.getItem('x-auth');

    if(token)
    {
      axios.get(`${URL}protected/protected`, {
        headers: {
          'x-auth': token
        }
        }).then(resp => {
            if(resp.status == "200") {
                const {username} = resp.data;
                this.props.navigation.navigate('Private', {username});
              } else {
                this.setState({loading: false});
              }
        }).catch((err)=> {
          this.setState({loading: false});
        })
    } else {
      this.setState({loading: false});
    }
  }

  handleUserNameChange = (text) =>{
    this.setState({
        username: text
    })
  }

  handlePasswordChange = (text) => {
    this.setState({
      password: text
    })
  }

  handleSignIn = () => {
    const { username, password } = this.state;
    Keyboard.dismiss();
    this.setState({loading: true});

    if(username.trim() && password.trim()) {
        axios.post(`${URL}user/login`, {
          username,
          password
        }).then(resp => {
            if(resp.status == "201"){
                const token = resp.headers['x-auth'];
                
                if(token){
                  AsyncStorage.setItem('x-auth', token).then(()=>{
                    this.props.navigation.navigate('Private', {username});
                  }).catch((err)=>{
                      this.setState({loading: false}, ()=> {alert('error while loging in')});
                  })
                }
            } else {
              this.setState({loading: false}, ()=>{
                alert("Invalid login credentials!");
              })
            }
            
        }).catch(err => {
          this.setState({loading: false}, ()=> {alert('error while loging in')});
        })
    } else {
      this.setState({loading: false}, ()=> {alert("Username/ password not provided")});
    }
  }

  openSignUp = () => {
    this.props.navigation.navigate('SignUp')
  }

  render() {
    if(this.state.loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" animating/>
        </View>
      )
    }

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={{width: "20%", height:"20%"}}>
            <Image source={require('../../assets/images/rocket.png')} style={{flex:1, width: null, height: null}}/>  
        </View>
        
        <View style={styles.formContainer}>
          <Input 
            placeholder={"Username"}
            onChangeText={this.handleUserNameChange}
            value={this.state.username}
           />
          <Input 
            placeholder={"Password"} 
            secureTextEntry
            onChangeText={this.handlePasswordChange}
            value={this.state.password}
            />
        </View>

        <View style={[styles.formContainer, {alignItems: 'center'}]}>
          <CustomButton
            onPress={this.handleSignIn}
            buttonText={"Sign In"}
           />
          <TextButton 
            onPress={this.openSignUp}
            buttonText={"Sign Up!"}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "35%",
    alignItems: 'center',
    backgroundColor:"#fff"
  },
  formContainer: {
    height: 150,
    justifyContent: 'space-around',
    marginBottom: '5%',
  }
});