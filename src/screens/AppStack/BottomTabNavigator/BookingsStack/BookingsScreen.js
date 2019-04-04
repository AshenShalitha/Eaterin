import React, { Component } from 'react';
import {
    Dimensions,
    View,
    Text,
    AsyncStorage,
    TouchableOpacity,
    SectionList,
    NetInfo,
    InteractionManager
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';
import moment from 'moment';
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

const title1 = 'Upcoming';
const title2 = 'History';

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

    generateSectionData() {
        const sectionArray = [];
        const historyDataArray = [];
        const upcomingDataArray = [];
        const historyObject = {};
        const upcomingObject = {};
        const now = moment().format('YYYY-MM-DD HH:mm');
        if (this.props.bookingList.length > 0) {
            this.props.bookingList.forEach(element => {
                if (moment(now).isBefore(`${element.date} ${element.time}`)) {
                    upcomingDataArray.push(element);
                } else {
                    historyDataArray.push(element);
                }
            });
            historyObject.title = title1;
            historyObject.data = upcomingDataArray;
            upcomingObject.title = title2;
            upcomingObject.data = historyDataArray;
            sectionArray.push(historyObject);
            sectionArray.push(upcomingObject);
            return sectionArray;
        }
    }

    renderHeader(title) {
        return (
            <View style={styles.headerContainer}>
                <Text style={styles.headerTextStyle}>{title}</Text>
            </View>
        )
    }

    renderItem(item, section) {
        return (
            <BookingCard
                onPress={() => this.onItemPressed(item)}
                image={item.image_url}
                timeSlot={item.time}
                date={item.date}
                restaurantName={item.name}
                address={item.address}
                sectionTitle={section.title}
            // ratings
            />
        );
    }

    onItemPressed(item) {
        this.props.onBookingSelected(item);
        this.props.navigation.navigate('CancelBookingScreen');
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
                if (this.props.bookingList.length > 0) {
                    return (
                        <SectionList
                            renderItem={({ item, section }) => (
                                this.renderItem(item, section)
                            )}
                            renderSectionHeader={({ section: { title } }) => (
                                this.renderHeader(title)
                            )}
                            sections={this.generateSectionData()}
                            keyExtractor={(item) => item.reservation_id.toString()}
                            onRefresh={() => this.onRefresh()}
                            refreshing={this.state.isFetching}
                        />
                    );
                } else {
                    return (
                        <View style={styles.emptyListMainContainer}>
                            <Icon name={'restaurant-menu'} type={'MaterialIcons'} style={styles.iconStyle} />
                            <Text style={styles.errorText}>Booking list is empty</Text>
                        </View>
                    )
                }
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
    emptyListMainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    errorText: {
        textAlign: 'center',
        paddingVertical: '5rem',
    },
    headerContainer: {
        flex: 1,
        alignItems: 'flex-start',
        paddingLeft: '10rem',
        paddingVertical: '10rem'
    },
    headerTextStyle: {
        fontSize: '13rem',
        color: colors.ash_dark
    },
    iconStyle: {
        fontSize: '42rem',
        alignSelf: 'center',
        color: colors.green_light
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