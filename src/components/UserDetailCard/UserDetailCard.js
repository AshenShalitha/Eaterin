import React, { Component } from 'react';
import {
    Dimensions,
    View,
    Text,
    TouchableOpacity,
    Animated,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import {
    Card,
    Icon,
    Input,
    Item
} from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet';
import { SkypeIndicator } from 'react-native-indicators';

import { colors } from '../../utils/Colors';
import { strings } from '../../utils/Strings';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

class UserDetailCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            maxHeight: EStyleSheet.value('150rem'),
            minHeight: EStyleSheet.value('100rem'),
        };
    }

    componentWillMount() {
        this.animation = new Animated.Value(EStyleSheet.value('100rem'));
    }

    onEditPressed() {
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
            <KeyboardAvoidingView 
                    style={{flex: 1}}
                    behavior={Platform.OS === "ios" ? "padding" : null}
            >
            <Animated.View style={[styles.expandableCard, { height: this.animation }]}>
                <View style={styles.lableContainer}>
                    <View style={styles.left}>
                        <Icon name={this.props.iconName} type={this.props.iconType} style={styles.iconStyle} />
                        <Text style={styles.labelText}>{this.props.label}</Text>
                    </View>
                    <View style={styles.right}>
                        <TouchableOpacity onPress={() => this.onEditPressed()}>
                            <Icon name={'edit'} type={'MaterialIcons'} style={styles.iconStyle} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.valueContainer}>
                    {
                        !this.state.expanded ?
                            <Text style={styles.valueText} >
                                {this.props.textValue}
                            </Text>
                            :
                            <Input
                                style={styles.inputStyle}
                                value={this.props.inputValue}
                                onChangeText={this.props.onChangeText}
                                keyboardType={this.props.keyboardType}
                            />
                    }
                </View>
                {
                    this.state.expanded ?
                        <View style={styles.buttonContainer}>
                            {
                                this.props.loading ?
                                    <SkypeIndicator color={colors.green_light} size={EStyleSheet.value('20rem')} style={{ alignSelf: 'flex-end' }} />
                                    :
                                    <TouchableOpacity style={styles.saveButton} disabled={this.props.buttonDisabled} onPress={this.props.onPress}>
                                        <Text style={[styles.loginBtnText, { color: this.props.buttonColor }]}>
                                            {strings.profile.userDetailCard.btn}
                                        </Text>
                                    </TouchableOpacity>
                            }
                        </View>
                        :
                        null
                }
            </Animated.View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = EStyleSheet.create({
    expandableCard: {
        width: entireScreenWidth * 0.9,
        alignSelf: 'center',
        marginTop: '15rem',
        borderRadius: '2rem',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 3, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        backgroundColor: colors.white
    },
    lableContainer: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: '15rem',
        justifyContent: 'space-between',
        borderBottomWidth: '1rem',
        borderColor: colors.ash_light
    },
    valueContainer: {
        flex: 1,
        paddingHorizontal: '15rem',
        justifyContent: 'center',
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: '15rem',
    },
    left: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    right: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    iconStyle: {
        fontSize: '20rem',
        color: colors.ash_dark
    },
    labelText: {
        fontSize: '14rem',
        color: colors.ash_dark,
        paddingHorizontal: '10rem'
    },
    valueText: {
        fontSize: '15rem',
        color: colors.ash_dark
    },
    saveButton: {
        alignSelf: 'flex-end',
        paddingHorizontal: '25rem',
        paddingVertical: '10rem',
    },
    loginBtnText: {
        fontSize: '13rem',
        fontWeight: '500',
        color: colors.green_light,
    },
    inputStyle: {
        fontSize: '15rem',
        color: colors.black
    }
});


export { UserDetailCard };
