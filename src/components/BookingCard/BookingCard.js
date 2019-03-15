import React, { Component } from 'react';
import {
    Dimensions,
    View,
    Text,
    TouchableOpacity,
    Animated
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
    Icon
} from 'native-base';

import { colors } from '../../utils/Colors';
import { strings } from '../../utils/Strings';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

class BookingCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            maxHeight: EStyleSheet.value('210rem'),
            minHeight: EStyleSheet.value('70rem'),
        };
    }

    componentWillMount() {
        this.animation = new Animated.Value(EStyleSheet.value('70rem'));
    }

    toggleExpand() {
        const initialValue = this.state.expanded ? this.state.maxHeight : this.state.minHeight;
        const finalValue = this.state.expanded ? this.state.minHeight : this.state.maxHeight;

        this.setState({
            expanded: !this.state.expanded
        });

        this.animation.setValue(initialValue);
        Animated.spring(
            this.animation,
            {
                toValue: finalValue
            }
        ).start();
    }

    render() {
        return (
            <Animated.View style={[styles.reservationCard, { height: this.animation }]}>
                <View style={styles.topContainer}>
                    <View style={styles.rowItem}>
                        <Text style={styles.restaurantName}>Rare at Residence</Text>
                    </View>
                    <View style={[styles.refNoContainer]}>
                        <View style={styles.topLeft}>
                            <Text style={styles.textNormal}>{strings.finishBooking.refNo}</Text>
                            <Text style={[styles.textNormal, { color: colors.black, fontWeight: '500' }]}>3197187</Text>
                        </View>
                        <View style={styles.topRight}>
                            <TouchableOpacity style={styles.button} onPress={() => this.toggleExpand()}>
                                {
                                    !this.state.expanded ?
                                        <Icon name={'md-arrow-dropdown'} type={'Ionicons'} style={styles.arrowIcon} />
                                        :
                                        <Icon name={'md-arrow-dropup'} type={'Ionicons'} style={styles.arrowIcon} />
                                }

                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {
                    this.state.expanded ?
                        <View style={styles.bottomContainer}>
                            <View style={styles.itemRow}>
                                <Text style={styles.textAsh}>{strings.confirmBooking.date}</Text>
                                <Text style={styles.textBlack}>{this.props.date}</Text>
                            </View>
                            <View style={styles.itemRow}>
                                <Text style={styles.textAsh}>{strings.confirmBooking.time}</Text>
                                <Text style={styles.textBlack}>{this.props.time}</Text>
                            </View>
                            <View style={styles.itemRow}>
                                <Text style={styles.textAsh}>{strings.confirmBooking.paxCount}</Text>
                                <Text style={styles.textBlack}>{this.props.guestCount}</Text>
                            </View>
                            <View style={styles.itemRow}>
                                <Text style={styles.textAsh}>{strings.confirmBooking.discount}</Text>
                                <Text style={styles.textGreen}>{this.props.discount}%</Text>
                            </View>
                        </View>
                        :
                        null
                }
            </Animated.View>
        );
    }
}

const styles = EStyleSheet.create({
    reservationCard: {
        width: entireScreenWidth * 0.9,
        alignSelf: 'center',
        marginTop: '15rem',
        marginHorizontal: '5rem',
        borderRadius: '2rem',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        backgroundColor: colors.white
    },
    topContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: '15rem',
    },
    bottomContainer: {
        flex: 2,
        marginHorizontal: '15rem',
        borderTopWidth: '1rem',
        borderColor: colors.ash_light,
        justifyContent: 'center',
    },
    refNoContainer: {
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
        flex: 0.6,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    restaurantName: {
        fontSize: '18rem',
        fontWeight: '600',
        color: colors.black,
        alignSelf: 'flex-start',
    },
    textNormal: {
        fontSize: '16rem',
        color: colors.ash_dark,
        paddingRight: '15rem',
        alignSelf: 'center',
        flexDirection: 'row',
    },
    arrowIcon: {
        fontSize: '30rem',
        color: colors.ash_dark
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
    textGreen: {
        fontSize: '13rem',
        color: colors.green_light,
        fontWeight: '500',
        alignSelf: 'center',
        flexDirection: 'row',
    },
    button: {
        paddingHorizontal: '10rem',
    }
});

export { BookingCard };
