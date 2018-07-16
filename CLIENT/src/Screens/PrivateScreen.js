import React from 'react';
import { View, Text, TouchableOpacity, Alert, AsyncStorage} from 'react-native';
import CustomButton from '../Components/Button/Button';

const PrivateScreen = (props) => {
    const { navigation } = props;
    const username = navigation.getParam('username', 'username does not exist');

    handleSignOut = () => {
        
        Alert.alert("Log Out", "Are you sure you wish to log out?", 
            [   {text: 'cancel', style:'cancel'},
                {text: 'OK', onPress: async () => {
                    await AsyncStorage.removeItem('x-auth');
                    props.navigation.navigate("Home")
                }}]
        );
        
    }

    return (
        <View style={{height:300, justifyContent: "space-around", alignItems:"center"}}>
            <Text style={{fontSize: 24, fontWeight: "bold", color: '#af6671'}}>
                {`welcome ${username}`}
            </Text>
            <TouchableOpacity>
                <CustomButton
                    onPress={this.handleSignOut}
                    buttonText={"Log Out"}
                />
            </TouchableOpacity>
        </View>
    );
}

export default PrivateScreen;