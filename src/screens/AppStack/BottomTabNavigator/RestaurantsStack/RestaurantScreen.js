import React, { Component } from 'react';
import {
    Dimensions,
    View,
    Text,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

class RestaurantScreen extends Component {
    render() {
        return (
            <View style={styles.mainContainer}>
                <Text>Restaurant Screen</Text>
            </View>
        );
    }
}

const styles = EStyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default RestaurantScreen;