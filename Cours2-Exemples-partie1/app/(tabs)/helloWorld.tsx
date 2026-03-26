import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text1}>Hello World!</Text>
                <Text style={styles.text2}>Bonjour les M1</Text>
                <Text style={styles.text3}>Hola Todos!</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3a6071'
    },
    text1: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    },
    text2: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0ff'
    },
    text3: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#f0f'
    }
});