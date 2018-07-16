import React from 'react';
import { TextInput, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const Input = (props) => {
    return (
        <TextInput 
            style={styles.TextInput}
            underlineColorAndroid={"transparent"}
            {...props}
            />
    )
}

const styles = StyleSheet.create({
    TextInput: {
        width: 0.9 * width,
        height: 0.07 * height,
        backgroundColor: "#f0f0f0",
        paddingLeft: "4%",
        borderRadius: 30,
        fontSize: 18,
    }
})

export default Input;