import React, { Component } from 'react';
import {
    Dimensions,
    View,
    Text,
    TouchableOpacity,
    Animated,
} from 'react-native';
import {
    Icon,
    Input,
    Form,
    Item,
    Label
} from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet';
import { SkypeIndicator } from 'react-native-indicators';

import { colors } from '../../utils/Colors';
import { strings } from '../../utils/Strings';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

class ChangePasswordCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            maxHeight: EStyleSheet.value('380rem'),
            minHeight: EStyleSheet.value('50rem'),
        };
    }

    componentWillMount() {
        this.animation = new Animated.Value(EStyleSheet.value('50rem'));
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
            <Animated.View style={[styles.expandableCard, { height: this.animation }]}>
                <TouchableOpacity style={styles.lableContainer} onPress={() => this.onEditPressed()}>
                    <View style={styles.left}>
                        <Icon name={'lock'} type={'FontAwesome5'} style={styles.iconStyle} />
                        <Text style={styles.labelText}>{strings.profile.changePasswordCard.title}</Text>
                    </View>
                    <View style={styles.right}>
                        <Icon name={'edit'} type={'MaterialIcons'} style={styles.iconStyle} />
                    </View>
                </TouchableOpacity>
                {
                    this.state.expanded ?
                        <View style={[styles.hiddenContainer]}>
                            <View style={styles.inputContainer}>
                                <Form>
                                    <Item floatingLabel>
                                        <Label>{strings.profile.changePasswordCard.lbl1}</Label>
                                        <Input
                                            style={styles.inputStyle}
                                            value={this.props.oldPassword}
                                            onChangeText={this.props.onOldPasswordChanged}
                                            secureTextEntry
                                            returnKeyType={'next'}
                                            onSubmitEditing={() => { this.NewPassword._root.focus(); }}
                                        />
                                    </Item>
                                    {/* new password */}
                                    <Item
                                        floatingLabel
                                        error={this.props.newPwError}
                                        success={this.props.newPwSuccess}
                                    >
                                        <Label>{strings.profile.changePasswordCard.lbl2}</Label>
                                        <Input
                                            style={styles.inputStyle}
                                            value={this.props.newPassword}
                                            onChangeText={this.props.onNewPasswordChanged}
                                            secureTextEntry
                                            getRef={input => { this.NewPassword = input; }}
                                            returnKeyType={'next'}
                                            onSubmitEditing={() => { this.ConfirmPassword._root.focus(); }}
                                        />
                                        {
                                            this.props.newPwError ?
                                                <Icon name='close-circle' />
                                                :
                                                <View />
                                        }
                                        {
                                            this.props.newPwSuccess ?
                                                <Icon name='checkmark-circle' />
                                                :
                                                <View />
                                        }
                                    </Item>
                                    {
                                        this.props.passwordLengthError ?
                                            <View style={styles.errorMessageContainer}>
                                                <Text style={styles.errorText}>{strings.signup.passwordLengthError}</Text>
                                            </View>
                                            :
                                            <View>
                                                <Text></Text>
                                            </View>
                                    }
                                    {/* confirm password */}
                                    <Item
                                        floatingLabel
                                        error={this.props.confirmPwError}
                                        success={this.props.confirmPwSuccess}
                                    >
                                        <Label>{strings.profile.changePasswordCard.lbl3}</Label>
                                        <Input
                                            style={styles.inputStyle}
                                            value={this.props.confirmPassword}
                                            onChangeText={this.props.onConfirmPasswordChanged}
                                            secureTextEntry
                                            returnKeyType={'next'}
                                            getRef={input => { this.ConfirmPassword = input; }}
                                        />
                                        {
                                            this.props.confirmPwError ?
                                                <Icon name='close-circle' />
                                                :
                                                <View />
                                        }
                                        {
                                            this.props.confirmPwSuccess ?
                                                <Icon name='checkmark-circle' />
                                                :
                                                <View />
                                        }
                                    </Item>
                                    {
                                        this.props.passwordsNotMatch ?
                                            <View style={styles.errorMessageContainer}>
                                                <Text style={styles.errorText}>{strings.signup.passwordMismatch}</Text>
                                            </View>
                                            :
                                            <View>
                                                <Text></Text>
                                            </View>
                                    }
                                </Form>
                            </View>
                            <View style={styles.buttonContainer} disabled={this.props.disabled}>
                                {
                                    this.props.loading ?
                                        <SkypeIndicator color={colors.green_light} size={EStyleSheet.value('20rem')} style={{ alignSelf: 'flex-end' }} />
                                        :
                                        <TouchableOpacity style={styles.saveButton} onPress={this.props.onPress}>
                                            <Text style={[styles.loginBtnText, { color: this.props.buttonColor }]}>{strings.profile.changePasswordCard.btn}</Text>
                                        </TouchableOpacity>
                                }
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
    },
    hiddenContainer: {
        flex: 3,
        paddingHorizontal: '15rem',
        justifyContent: 'center',
    },
    inputContainer: {
        flex: 4
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: '0rem',
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
        paddingHorizontal: '15rem',
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
    },
    errorText: {
        color: colors.dangerRed,
        fontSize: '12rem'
    },
    errorMessageContainer: {
        flex: 1,
        alignItems: 'flex-end'
    }
});


export { ChangePasswordCard };
