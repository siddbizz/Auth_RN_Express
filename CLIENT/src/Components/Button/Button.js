import React, {Component} from 'react';
import {TouchableOpacity, Text, StyleSheet, Dimensions} from 'react-native';

const { width, height } = Dimensions.get('window');

const CustomButton = (props) => {
    return (
        <TouchableOpacity style = {styles.buttonContainer} {...props}>
            <Text style={styles.buttonText}>{props.buttonText}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        width: 0.9 * width,
        height: 0.07 * height,
        borderRadius: 30,
        backgroundColor: "#cc675a",
        justifyContent: "center",
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "#fff"
    }
})

export default CustomButton;