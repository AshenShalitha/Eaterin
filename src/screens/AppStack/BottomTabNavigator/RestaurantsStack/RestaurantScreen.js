import React, { Component } from 'react';
import {
    Dimensions,
    View,
    Text,
    FlatList,
    NetInfo,
    TouchableOpacity,
    InteractionManager,
    AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import { SkypeIndicator } from 'react-native-indicators';

import { OfflineNotice } from '../../../../components/OfflineNotice';
import { RestaurantCard } from '../../../../components/RestaurantCard';
import { colors } from '../../../../utils/Colors';
import * as actions from '../../../../redux/actions';
import { PROTOCOL, HOST } from '../../../../api/API';
import { strings } from '../../../../utils/Strings';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

class RestaurantScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
        };
        this.isConnected = true;
        NetInfo.isConnected.fetch().then(isConnected => {
            this.isConnected = isConnected;
        });
    }

    componentDidMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
        this.interaction = InteractionManager.runAfterInteractions(() => {
            this.fetchRestaurantList();
        });
        this.checkLoginStatus();
        this.setUserData();
    }

    setUserData() {
        const keys = ['id', 'name', 'email', 'mobileNumber', 'imageUrl', 'accessToken'];
        AsyncStorage.multiGet(keys).then((result) => {
            const id = result[0][1];
            const name = result[1][1];
            const email = result[2][1];
            const mobileNumber = result[3][1];
            const imageUrl = result[4][1];
            const accessToken = result[5][1];

            this.props.setId(id);
            this.props.setName(name);
            this.props.setEmail(email);
            this.props.setContactNumber(mobileNumber);
            this.props.setProfilePic(imageUrl);
            this.props.setAccessToken(accessToken);
        });
    }

    checkLoginStatus() {
        AsyncStorage.getItem('accessToken').then(accessToken => {
            const status = accessToken !== null;
            this.props.checkLoggedInStatus(status);
        });
    }

    onRefresh() {
        this.setState({ isFetching: true }, function () { this.fetchRestaurantList(); });
    }

    fetchRestaurantList() {
        this.props.fetchRestaurants();
        if (this.state.isFetching) {
            this.setState({ isFetching: false })
        }
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
        if (this.interaction) this.interaction.cancel();
    }

    handleConnectivityChange = isConnected => {
        if (isConnected) {
            this.isConnected = isConnected;
        } else {
            this.isConnected = isConnected;
        }
    };

    onItemPressed(item) {
        this.props.restaurantSelected(item.item);
        this.props.navigation.navigate('SelectBookingScreen');
    }

    renderItem(item) {
        return (
            <RestaurantCard
                image={`${PROTOCOL}${HOST}${item.item.image_url}`}
                restaurantName={item.item.name}
                address={item.item.address}
                ratings={item.item.ratings}
                maxDiscount={item.item.highest_discount}
                onPress={() => this.onItemPressed(item)}
            />
        );
    }

    renderList() {
        if (this.isConnected) {
            if (this.props.restaurantsLoading) {
                return (
                    <SkypeIndicator color={colors.green_light} size={EStyleSheet.value('40rem')} />
                );
            } else if (this.props.restaurantFetchError) {
                return (
                    <View style={styles.errorContainer}>
                        <TouchableOpacity onPress={() => this.fetchRestaurantList()}>
                            <Text style={styles.errorText}>{strings.errors.serverError} {'\n'}{strings.errors.retry}</Text>
                        </TouchableOpacity>
                    </View>
                );
            } else {
                return (
                    <FlatList
                        data={this.props.restaurantList}
                        renderItem={this.renderItem.bind(this)}
                        keyExtractor={item => item.id.toString()}
                        onRefresh={() => this.onRefresh()}
                        refreshing={this.state.isFetching}
                    />
                );
            }
        } else if (!this.isConnected) {
            return (
                <View style={styles.errorContainer}>
                    <TouchableOpacity onPress={() => this.fetchRestaurantList()}>
                        <Text style={styles.errorText}>{strings.errors.noInternet} {'\n'}{strings.errors.retry}</Text>
                    </TouchableOpacity>
                </View>
            );
        }
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <OfflineNotice />
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Restaurants</Text>
                </View>
                {
                    this.renderList()
                }
            </View>
        );
    }
}

const styles = EStyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    titleContainer: {
        height: '45rem',
        width: entireScreenWidth
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
    },
    errorContainer: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    errorText: {
        textAlign: 'center',
        paddingVertical: '5rem',
    }
});

const mapStateToProps = state => {
    return {
        restaurantsLoading: state.booking.restaurantsLoading,
        restaurantList: state.booking.restaurantList,
        restaurantFetchError: state.booking.restaurantFetchError
    };
};

export default connect(mapStateToProps, actions)(RestaurantScreen);
