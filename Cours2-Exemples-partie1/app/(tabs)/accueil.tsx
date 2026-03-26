import React from 'react';
import { StyleSheet, View } from 'react-native';

const Accueil = () => {
    return (
        <View style={styles.conteneur}>
            <View style={styles.carreRouge}/>
            <View style={styles.carreBleu}/>
            <View style={styles.carreVert}/>
        </View>
    );
}

export default Accueil;

const styles = StyleSheet.create({
    conteneur: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        backgroundColor: 'grey',
        height: '100%'
    },
    carreRouge: {
        width: 100,
        height: 100,
        backgroundColor: 'red',
    },
    carreBleu: {
        width: 100,
        height: 100,
        backgroundColor: 'blue',
    },
    carreVert: {
        width: 100,
        height: 100,
        backgroundColor: 'green',
    },
});