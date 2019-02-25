import React, { Component } from 'react';
import {
    Dimensions,
    View,
    Text,
    FlatList
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

import { RestaurantCard } from '../../../../components/RestaurantCard';
import { colors } from '../../../../utils/Colors';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

class RestaurantScreen extends Component {

    onItemPressed() {
        this.props.navigation.navigate('SelectBookingScreen');
    }

    renderItem(item) {
        return (
            <RestaurantCard
                image={item.item.image}
                restaurantName={item.item.restaurantName}
                address={item.item.address}
                ratings={item.item.ratings}
                maxDiscount={item.item.maxDiscount}
                onPress={this.onItemPressed.bind(this)}
            />
        )
    }

    render() {
        const data = [
            {
                image: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
                restaurantName: 'The Sizzle',
                address: 'Kollupitiya > 24, Deal Place, Kollupitiya',
                ratings: '4.5',
                maxDiscount: '25'
            },
            {
                image: 'https://images.unsplash.com/photo-1525648199074-cee30ba79a4a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
                restaurantName: 'The Sizzle',
                address: 'Kollupitiya > 24, Deal Place, Kollupitiya',
                ratings: '4.5',
                maxDiscount: '25'
            },
            {
                image: 'https://images.unsplash.com/photo-1542282811-943ef1a977c3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1052&q=80',
                restaurantName: 'The Sizzle',
                address: 'Kollupitiya > 24, Deal Place, Kollupitiya',
                ratings: '4.5',
                maxDiscount: '25'
            },
            {
                image: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
                restaurantName: 'The Sizzle',
                address: 'Kollupitiya > 24, Deal Place, Kollupitiya',
                ratings: '4.5',
                maxDiscount: '25'
            },
            {
                image: 'https://images.unsplash.com/photo-1525648199074-cee30ba79a4a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
                restaurantName: 'The Sizzle',
                address: 'Kollupitiya > 24, Deal Place, Kollupitiya',
                ratings: '4.5',
                maxDiscount: '25'
            },
            {
                image: 'https://images.unsplash.com/photo-1542282811-943ef1a977c3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1052&q=80',
                restaurantName: 'The Sizzle',
                address: 'Kollupitiya > 24, Deal Place, Kollupitiya',
                ratings: '4.5',
                maxDiscount: '25'
            }
        ];
        return (
            <View style={styles.mainContainer}>
                <Text style={styles.title}>Restaurants</Text>
                <FlatList
                    data={data}
                    renderItem={this.renderItem.bind(this)}
                    keyExtractor={item => item.toString()}
                />
            </View>
        );
    }
}

const styles = EStyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: '13rem',
        color: colors.ash_dark,
        paddingVertical: '15rem',
        paddingLeft: '10rem',
        alignSelf: 'flex-start'
    },
    listContainer: {
        flex: 1
    }
});

export default RestaurantScreen;