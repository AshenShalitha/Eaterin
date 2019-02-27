import React, { Component } from 'react';
import {
    Dimensions,
    View,

} from 'react-native';
import {
    Icon,
    Card
} from 'native-base';
import { connect } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';

import { colors } from '../../utils/Colors';
import { strings } from '../../utils/Strings';
import { CustomHeader } from '../../components/CustomHeader';
import { DatesGroup } from '../../components/DatesGroup';
import { GuestView } from '../../components/GuestView';
import * as actions from '../../redux/actions';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

class SelectBookingScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            incrementDisabled: false,
            decrementDisabled: false
        };
        this.max = 8;
    }

    incrementPressed() {
        this.setState({ decrementDisabled: false });
        if (this.props.numberOfGuests >= this.max) {
            this.setState({ incrementDisabled: true });
        } else {
            this.props.guestsIncreased(this.props.numberOfGuests);
        }
    }

    decrementPressed() {
        this.setState({ incrementDisabled: false });
        if (this.props.numberOfGuests < 2) {
            this.setState({ decrementDisabled: true });
        } else {
            this.props.guestsDecreased(this.props.numberOfGuests);
        }
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <CustomHeader
                    image={'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'}
                    restaurantName={'The Sizzle'}
                    ratings={'4.5'}
                    address={'Kollupitiya > 24, Deal Place, Kollupitiya'}
                    onBackPressed={() => this.props.navigation.pop()}
                />
                <View style={styles.dateContainer}>
                    <DatesGroup />
                </View>
                <View style={styles.guestsContainer}>
                    <GuestView
                        numberOfGuests={this.props.numberOfGuests}
                        onIncrementPressed={this.incrementPressed.bind(this)}
                        onDecrementPressed={this.decrementPressed.bind(this)}
                        decrementDisabled={this.state.decrementDisabled}
                        incrementDisabled={this.state.incrementDisabled}
                    />
                </View>
                <View style={styles.timeSlotContainer}>
                    <View>

                    </View>
                    <View>

                    </View>
                </View>
            </View>
        );
    }
}

const styles = EStyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    dateContainer: {
        flex: 1.1,
        justifyContent: 'flex-end',
    },
    guestsContainer: {
        flex: 1,
        backgroundColor: colors.ash_light
    },
    timeSlotContainer: {
        flex: 4,
        backgroundColor: colors.white
    }
});

const mapStateToProps = state => {
    return {
        numberOfGuests: state.booking.numberOfGuests
    };
};

export default connect(mapStateToProps, actions)(SelectBookingScreen);
