import React, { Component } from 'react';
import {
    Dimensions,
    View,
    Text,
    AsyncStorage,
    TouchableOpacity,
    FlatList,
    NetInfo,
    InteractionManager
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';
import { SkypeIndicator } from 'react-native-indicators';
import {
    Icon
} from 'native-base';

import { BookingCard } from '../../../../components/BookingCard';
import { LoggedOutProfileView } from '../../../../components/LoggedOutProfileView';
import { OfflineNotice } from '../../../../components/OfflineNotice';
import { colors } from '../../../../utils/Colors';
import { strings } from '../../../../utils/Strings';
import * as actions from '../../../../redux/actions';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

class BokkingScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            isLoggedIn: true
        };
        this.isConnected = true;
        NetInfo.isConnected.fetch().then(isConnected => {
            this.isConnected = isConnected;
        });
    }

    componentDidMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
        this.interaction = InteractionManager.runAfterInteractions(() => {
            this.checkLoginStatus();
        });
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

    checkLoginStatus() {
        AsyncStorage.getItem('accessToken').then(accessToken => {
            const status = accessToken !== null;
            this.setState({ isLoggedIn: status });
            if (status) {
                this.fetchData();
            }
        });
    }

    fetchData() {
        AsyncStorage.getItem('accessToken').then(accessToken => {
            this.props.fetchBookingList(this.props.id, accessToken);
        });
        if (this.state.isFetching) {
            this.setState({ isFetching: false });
        }
    }

    onRefresh() {
        this.setState({ isFetching: true }, function () { this.fetchData(); });
    }

    renderItem(item) {
        return (
            <BookingCard
                date={item.item.date}
                time={item.item.time}
                discount={item.item.discount}
                guestCount={item.item.guest_number}
            />
        );
    }

    renderList() {
        if (this.isConnected) {
            if (this.props.bookingListLoading) {
                return (
                    <SkypeIndicator color={colors.green_light} size={EStyleSheet.value('40rem')} />
                );
            } else if (this.props.bookingListError) {
                return (
                    <View style={styles.errorContainer}>
                        <TouchableOpacity onPress={() => this.fetchData()}>
                            <Text style={styles.errorText}>{strings.errors.serverError} {'\n'}{strings.errors.retry}</Text>
                        </TouchableOpacity>
                    </View>
                );
            } else {
                return (
                    <FlatList
                        data={this.props.bookingList}
                        renderItem={this.renderItem.bind(this)}
                        keyExtractor={item => item.toString()}
                        onRefresh={() => this.onRefresh()}
                        refreshing={this.state.isFetching}
                        initialNumToRender={5}
                        removeClippedSubviews
                        windowSize={11}
                    />
                );
            }
        } else if (!this.isConnected) {
            return (
                <View style={styles.errorContainer}>
                    <TouchableOpacity onPress={() => this.fetchData()}>
                        <Text style={styles.errorText}>{strings.errors.noInternet} {'\n'}{strings.errors.retry}</Text>
                    </TouchableOpacity>
                </View>
            );
        }
    }

    loggedOutUserView() {
        return (
            <LoggedOutProfileView onPress={() => this.props.navigation.navigate('Auth')} />
        );
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <OfflineNotice />
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Bookings</Text>
                </View>
                {
                    this.state.isLoggedIn ?
                        this.renderList()
                        :
                        this.loggedOutUserView()
                }
            </View>
        );
    }
}

const styles = EStyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
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
    reservationCard: {
        height: '220rem',
        width: entireScreenWidth * 0.9,
        alignSelf: 'center',
        marginTop: '15rem',
        borderRadius: '2rem',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        backgroundColor: colors.white
    },
    topContainer: {
        flex: 0.8,
        justifyContent: 'center',
        paddingHorizontal: '15rem'
    },
    bottomContainer: {
        flex: 1.6,
        marginHorizontal: '15rem',
        borderTopWidth: '1rem',
        borderColor: colors.ash_light,
        justifyContent: 'center'
    },
    ferNoContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    topLeft: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
    },
    topRight: {
        flex: 0.2,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    restaurantName: {
        fontSize: '18rem',
        fontWeight: '600',
        color: colors.black,
        alignSelf: 'flex-start'
    },
    textNormal: {
        fontSize: '16rem',
        color: colors.ash_dark,
        paddingRight: '15rem'
    },
    arrowIcon: {
        fontSize: '30rem',
        color: colors.black
    },
    itemRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: '15rem'
    },
    collapseButtonContainer: {
        flex: 0.6,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    textAsh: {
        fontSize: '13rem',
        color: colors.ash_dark,
        alignSelf: 'center',
        flexDirection: 'row',
    },
    textBlack: {
        fontSize: '13rem',
        color: colors.black,
        fontWeight: '500',
        alignSelf: 'center',
        flexDirection: 'row',
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
        id: state.profile.id,
        bookingList: state.booking.bookingList,
        bookingListError: state.booking.bookingListError,
        bookingListLoading: state.booking.bookingListLoading,
    };
};

export default connect(mapStateToProps, actions)(BokkingScreen);