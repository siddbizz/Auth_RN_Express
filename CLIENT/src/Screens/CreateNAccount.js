import React, {Component} from 'react';
import {View, StyleSheet, KeyboardAvoidingView, Keyboard} from 'react-native';
import Input from '../Components/Input/Input';
import CustomButton from '../Components/Button/Button';
import validator from 'validator';
import {URL} from '../Common/URL';
import axios from 'axios';

class CreateNAccount extends Component {

    state= {
        email: '',
        username: '',
        password: ''
      }
      
      handleEmailChange = (text) => {
        this.setState({email: text})
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
    
      handleSignUp = () => {
        const { email, username, password } = this.state;
        Keyboard.dismiss();

        if(validator.isEmail(email) && username.trim() && password.trim()) {

            axios.post( `${URL}user/register`, {
                email,
                username,
                password
            }).then(resp => {

                if(resp.status == "201") {
                    this.setState({email: '', username: '', password: ''}, ()=>{
                        this.props.navigation.navigate("Home");
                    })
                }
                else {alert("Bad request")};
                
            }).catch(err => alert(err));

        } else {
            alert("Account does not exist or is Invalid!");
        }
      }

    render() {
        return(
            <KeyboardAvoidingView style={styles.Container} behavior="padding" enabled>        
                <View style={styles.formContainer}>
                    <Input 
                        placeholder={"Email"}
                        onChangeText={this.handleEmailChange}
                        value={this.state.email}
                        keyboardType={'email-address'}
                    />
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

                <View style={{padding: "10%"}}>
                    <CustomButton
                        onPress={this.handleSignUp}
                        buttonText={"Sign Up"}
                    />
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    Container: {
        flex: 1, 
        backgroundColor: "#fff",
        alignItems: 'center',
        paddingTop: "30%",
    },
    formContainer:{
        height: 225,
        justifyContent: "space-around"
    }
})

export default CreateNAccount;