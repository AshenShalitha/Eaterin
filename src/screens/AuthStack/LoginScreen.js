import React, { Component } from 'react';
import {
    Dimensions,
    View,
    Text,
    Animated,
    ImageBackground,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
    Form,
    Item,
    Input,
    Label,
    Button,
    Icon
} from 'native-base';

import NavigationService from '../../services/NavigationService';
import coverImg from '../../utils/images/login_bg.jpg';
import { colors } from '../../utils/Colors';
import { strings } from '../../utils/Strings';
import * as actions from '../../redux/actions';

const entireScreenWidth = Dimensions.get('window').width;
const entireScreenHeight = Dimensions.get('window').height;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

class LoginScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            parentViewX: new Animated.Value(entireScreenHeight),
            emailError: false,
            pwError: false,
        };
    }
    componentDidMount() { this.slideInParentView(); }

    slideInParentView() {
        Animated.timing(this.state.parentViewX,
            {
                toValue: 0,
                useNativeDriver: true,
            }
        ).start();
    }

    onEmailChanged(value) {
        this.props.loginEmailChanged(value);
        if (this.validateEmail(value) && value !== '') {
            this.setState({
                emailError: false,
            });
        } else {
            this.setState({
                emailError: true,
            });
        }
    }

    onPasswordChanged(value) {
        this.props.loginPasswordChanged(value);
        if (value !== '') {
            this.setState({
                pwError: false
            });
        } else {
            this.setState({
                pwError: true,
            });
        }
    }

    onSignupPressed = () => { this.props.navigation.navigate('SignupScreen'); }

    onLoginPressed = () => {
        const { email, password } = this.props;
        this.validate(email, password);
    }

    validate(email, password) {
        if (email === '' || password === '') {
            this.setState({
                emailError: true,
                pwError: true
            });
        } else if (!this.validateEmail(email)) {
            this.setState({
                emailError: true,
            });
            NavigationService.navigate('App');
        }
    }

    validateEmail(email) {
        const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return reg.test(email);
    }

    render() {
        return (
            <Animated.View style={[styles.mainContainer, { transform: [{ translateY: this.state.parentViewX }] }]}>
                <ImageBackground style={{ flex: 1 }} source={coverImg}>
                    <View style={styles.logoContainer}>
                        <Text style={styles.logoStyle}>eaterin</Text>
                    </View>
                    <View style={styles.formContainer}>
                        <Form style={styles.formStyle}>
                            <Item
                                floatingLabel
                                last
                                error={this.state.emailError}
                            >
                                <Icon name={'email'} type={'MaterialCommunityIcons'} style={styles.iconStyle} />
                                <Label style={styles.textStyle}>{strings.login.username}</Label>
                                <Input
                                    style={styles.textStyle}
                                    keyboardType="email-address"
                                    returnKeyType={'next'}
                                    onSubmitEditing={() => { this.Password._root.focus(); }}
                                    blurOnSubmit={false}
                                    value={this.props.email}
                                    onChangeText={(value) => this.onEmailChanged(value)}
                                />
                                {
                                    this.state.emailError ?
                                        <Icon name='close-circle' />
                                        :
                                        <View />
                                }
                            </Item>
                            <Item
                                floatingLabel
                                last
                                error={this.state.pwError}
                            >
                                <Icon name={'lock'} type={'MaterialCommunityIcons'} style={styles.iconStyle} />
                                <Label style={styles.textStyle}> {strings.login.password}</Label>
                                <Input
                                    password style={styles.textStyle}
                                    secureTextEntry
                                    getRef={input => {
                                        this.Password = input;
                                    }}
                                    value={this.props.password}
                                    onChangeText={(value) => this.onPasswordChanged(value)}
                                />
                                {
                                    this.state.pwError ?
                                        <Icon name='close-circle' />
                                        :
                                        <View />
                                }
                            </Item>
                        </Form>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button block style={styles.buttonStyle} onPress={this.onLoginPressed.bind(this)}>
                            <Text style={styles.buttonTextStyle}>{strings.login.buttonText}</Text>
                        </Button>
                    </View>
                    <View style={styles.bottomContainer}>
                        <Text style={styles.plainTextStyle}>{strings.login.text}</Text>
                        <TouchableOpacity onPress={this.onSignupPressed.bind(this)}>
                            <Text style={styles.signupTextStyle}>{strings.login.signup}</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </Animated.View>
        );
    }
}

const styles = EStyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.green_light,
    },
    logoContainer: {
        flex: 4,
        justifyContent: 'center',
        alignSelf: 'stretch',
    },
    formContainer: {
        flex: 3,
        justifyContent: 'center',
        alignSelf: 'stretch',
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'stretch',
        paddingHorizontal: '15rem'
    },
    bottomContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: '15rem',
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoStyle: {
        color: colors.ash_light,
        fontSize: '75rem',
        fontWeight: '400',
        alignSelf: 'center'
    },
    formStyle: {
        paddingHorizontal: '15rem'
    },
    textStyle: {
        color: colors.white,
    },
    buttonStyle: {
        backgroundColor: colors.green_light,
        height: '45rem',
    },
    signupBtnStyle: {
        alignSelf: 'center',
    },
    signupTextStyle: {
        color: colors.white,
        fontSize: '14rem',
        fontWeight: '500',
    },
    plainTextStyle: {
        color: colors.ash_light,
        fontSize: '14rem',
        fontWeight: '400',
    },
    buttonTextStyle: {
        color: colors.white,
        fontWeight: '300',
        fontSize: '18rem',
        alignSelf: 'center'
    },
    iconStyle: {
        color: colors.ash_light,
        fontSize: EStyleSheet.value('18rem')
    }
});

const mapStateToProps = state => {
    return {
        email: state.login.email,
        password: state.login.password,
    }
}

export default connect(mapStateToProps, actions)(LoginScreen);
