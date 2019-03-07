import React, { Component } from 'react';
import {
    Dimensions,
    View,
    Text,
    AsyncStorage
} from 'react-native';
import {
    Button
} from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

class ProileScreen extends Component {
    render() {
        return (
            <View style={styles.mainContainer}>
                <Text>Profile Screen</Text>
                <Button
                    style={{ alignSelf: 'center', paddingHorizontal: 10 }}
                    onPress={() => {
                        AsyncStorage.removeItem('accessToken').then(() => {
                            this.props.navigation.navigate('Auth');
                        });
                    }}
                >
                    <Text>Logout</Text>
                </Button>
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

export default ProileScreen;