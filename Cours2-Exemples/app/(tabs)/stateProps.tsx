import React, { Component } from 'react';
import { Text, View } from 'react-native';

class MyFirstComponent extends Component {
    state={
        monEtat: 'je suis en M1 ESGI et je suis heureux de découvrir React Native ! Clique moi pour découvrir la vérité !'
    }
    updateState = () => {
        this.setState({monEtat: 'je suis en M1 ESGI et je suis triste de découvrir React Native :-('})
    }
    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text 
                    style={{fontSize: 20, fontWeight: 'bold', color: '#fff'}}
                    onPress={this.updateState}>
                        {this.state.monEtat}
                </Text>
            </View>
        );
    }
}

export default MyFirstComponent;
