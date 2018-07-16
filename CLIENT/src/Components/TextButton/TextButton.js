import React, {Component} from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const TextButton = (props) => {
    return (
        <TouchableOpacity style={styles.Underline} {...props}>
            <Text style={styles.TextButton}>{props.buttonText}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    Underline: {
        borderBottomColor: "#e2cbcb",
        borderBottomWidth: 1,
    },
    TextButton: {
        color: "#e2cbcb",
        fontSize: 18,
        fontWeight: 'bold',
    }
})

export default TextButton;