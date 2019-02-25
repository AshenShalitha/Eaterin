import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StackActions, NavigationActions } from 'react-navigation';
import EStyleSheet from 'react-native-extended-stylesheet';
import ImagePicker from 'react-native-image-picker';
import {
    Dimensions,
    View,
    ScrollView,
    Text,
    ImageBackground,
    TouchableOpacity
} from 'react-native';
import {
    Form,
    Item,
    Input,
    Label,
    Button,
    Icon,
    Thumbnail
} from 'native-base';

import coverImg from '../../utils/images/login_bg.jpg';
import { colors } from '../../utils/Colors';
import { strings } from '../../utils/Strings';
import * as actions from '../../redux/actions';

const entireScreenWidth = Dimensions.get('window').width;

const resetAction = StackActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({ routeName: 'LoginScreen' }),
    ],
});

const options = {
    title: 'Select Profile Picture',
    quality: 0.3

};
let fileName;
let fileType;
let uri;

EStyleSheet.build({ $rem: entireScreenWidth / 380 });

class SignupScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nameError: false,
            nameSuccess: false,
            contactNoError: false,
            contactNoSuccess: false,
            emailError: false,
            emailSuccess: false,
            passwordError: false,
            passwordSuccess: false,
            confirmPasswordError: false,
            confirmPasswordSuccess: false,
            passwordsNotMatch: false,
            passwordLengthError: false,
            invalidEmailError: false,
            invalidContactNoError: false,
            avatarSource: null
        };
    }

    onLoginPressed = () => { this.props.navigation.pop(); }

    validateEmail(email) {
        const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return reg.test(email);
    }

    onNameChanged(value) {
        this.props.signupNameChanged(value);
        if (value !== '') {
            this.setState({
                nameSuccess: true,
                nameError: false
            });
        } else {
            this.setState({
                nameSuccess: false,
                nameError: true
            });
        }
    }

    onContactChanged(value) {
        this.props.signupContactNumberChanged(value);
        if (value !== '' && value.length === 10) {
            this.setState({
                contactNoSuccess: true,
                contactNoError: false,
                invalidContactNoError: false
            });
        } else {
            this.setState({
                contactNoSuccess: false,
                contactNoError: true,
                invalidContactNoError: true
            });
        }
    }

    onEmailChanged(value) {
        this.props.signupEmailChanged(value);
        if (value !== '' && this.validateEmail(value)) {
            this.setState({
                emailSuccess: true,
                emailError: false,
                invalidEmailError: false
            });
        } else {
            this.setState({
                emailSuccess: false,
                emailError: true,
                invalidEmailError: true
            });
        }
    }

    onPasswordChanged(value) {
        this.props.signupPasswordChanged(value);
        if (value.length >= 6) {
            this.setState({
                passwordSuccess: true,
                passwordError: false,
                passwordLengthError: false,
            });
        } else {
            this.setState({
                passwordSuccess: false,
                passwordError: true,
                passwordLengthError: true
            });
        }
    }

    onConfirmPasswordChanged(value) {
        this.props.signupConfirmPasswordChanged(value);
        if (value.length >= 6 && value === this.props.password) {
            this.setState({
                confirmPasswordSuccess: true,
                confirmPasswordError: false,
                passwordsNotMatch: false
            });
        } else {
            this.setState({
                confirmPasswordSuccess: false,
                confirmPasswordError: true,
                passwordsNotMatch: true
            });
        }
    }

    onSignupPressed() {
        this.validate();
    }

    validate() {
        const { name, contactNumber, email, password, confirmPassword } = this.props;
        const { nameSuccess, contactNoSuccess, emailSuccess, passwordSuccess, confirmPasswordSuccess } = this.state;

        if (name === '' || contactNumber === '' || email === '' || password === '' || confirmPassword === '') {
            if (name === '') {
                this.setState({
                    nameError: true
                });
            }
            if (contactNumber === '') {
                this.setState({
                    contactNoError: true
                });
            }
            if (email === '') {
                this.setState({
                    emailError: true
                });
            }
            if (password === '') {
                this.setState({
                    passwordError: true
                });
            }
            if (confirmPassword === '') {
                this.setState({
                    confirmPasswordError: true
                });
            }
        } else if (nameSuccess && contactNoSuccess && emailSuccess && passwordSuccess && confirmPasswordSuccess) {
            this.props.navigation.dispatch(resetAction);
        }
    }

    onImagePickerPressed() {
        ImagePicker.showImagePicker(options, (response) => {

            if (!response.didCancel) {
                fileName = response.fileName;
                fileType = response.type;
                uri = response.uri;
                this.setState({
                    avatarSource: uri,
                });
            } else if (response.error) {
                console.log(response.error);
            }
        });
    }

    renderThumbnail() {
        if (this.state.avatarSource === null) {
            return (
                <TouchableOpacity onPress={this.onImagePickerPressed.bind(this)}>
                    <View style={styles.imagePickerContainer}>
                        <Icon name={'camera'} type={'SimpleLineIcons'} style={styles.cameraIcon} />
                    </View>
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity onPress={this.onImagePickerPressed.bind(this)}>
                    <Thumbnail source={{ uri }} style={styles.thumbnailStyle} />
                </TouchableOpacity>
            );
        }
    }

    render() {
        const { name, contactNumber, email, password, confirmPassword } = this.props;
        return (
            <ScrollView style={{ flex: 1, flexDirection: 'column' }}>
                <ImageBackground style={[styles.mainContainer]} source={coverImg}>
                    <View style={styles.imageContainer}>
                        {this.renderThumbnail()}
                    </View>
                    <View style={styles.formContainer}>
                        <Form style={styles.formStyle}>
                            {/* name input */}
                            <Item
                                floatingLabel
                                last
                                error={this.state.nameError}
                                success={this.state.nameSuccess}
                            >
                                <Icon name={'user'} type={'FontAwesome'} style={styles.iconStyle} />
                                <Label style={styles.textStyle}>{strings.signup.name}</Label>
                                <Input
                                    style={styles.textStyle}
                                    returnKeyType={'next'}
                                    onSubmitEditing={() => { this.ContactNo._root.focus(); }}
                                    blurOnSubmit={false}
                                    value={name}
                                    onChangeText={value => this.onNameChanged(value)}
                                />
                                {
                                    this.state.nameError ?
                                        <Icon name='close-circle' />
                                        :
                                        <View />
                                }
                                {
                                    this.state.nameSuccess ?
                                        <Icon name='checkmark-circle' />
                                        :
                                        <View />
                                }
                            </Item>
                            <View>
                                <Text></Text>
                            </View>
                            {/* contact number input */}
                            <Item
                                floatingLabel
                                last
                                error={this.state.contactNoError}
                                success={this.state.contactNoSuccess}
                            >
                                <Icon name={'phone-square'} type={'FontAwesome'} style={styles.iconStyle} />
                                <Label style={styles.textStyle}>{strings.signup.contactNo}</Label>
                                <Input
                                    style={styles.textStyle}
                                    keyboardType={'phone-pad'}
                                    returnKeyType={'next'}
                                    getRef={input => { this.ContactNo = input; }}
                                    onSubmitEditing={() => { this.Email._root.focus(); }}
                                    blurOnSubmit={false}
                                    value={contactNumber}
                                    onChangeText={value => this.onContactChanged(value)}
                                />
                                {
                                    this.state.contactNoError ?
                                        <Icon name='close-circle' />
                                        :
                                        <View />
                                }
                                {
                                    this.state.contactNoSuccess ?
                                        <Icon name='checkmark-circle' />
                                        :
                                        <View />
                                }
                            </Item>
                            {
                                this.state.invalidContactNoError ?
                                    <View style={styles.errorMessageContainer}>
                                        <Text style={styles.errorText}>{strings.signup.invalidContactNoError}</Text>
                                    </View>
                                    :
                                    <View>
                                        <Text></Text>
                                    </View>
                            }
                            {/* email input */}
                            <Item
                                floatingLabel
                                last
                                error={this.state.emailError}
                                success={this.state.emailSuccess}
                            >
                                <Icon name={'email'} type={'MaterialCommunityIcons'} style={styles.iconStyle} />
                                <Label style={styles.textStyle}>{strings.signup.username}</Label>
                                <Input
                                    style={styles.textStyle}
                                    keyboardType={'email-address'}
                                    returnKeyType={'next'}
                                    getRef={input => { this.Email = input; }}
                                    onSubmitEditing={() => { this.Password._root.focus(); }}
                                    blurOnSubmit={false}
                                    value={email}
                                    onChangeText={value => this.onEmailChanged(value)}
                                />
                                {
                                    this.state.emailError ?
                                        <Icon name='close-circle' />
                                        :
                                        <View />
                                }
                                {
                                    this.state.emailSuccess ?
                                        <Icon name='checkmark-circle' />
                                        :
                                        <View />
                                }
                            </Item>
                            {
                                this.state.invalidEmailError ?
                                    <View style={styles.errorMessageContainer}>
                                        <Text style={styles.errorText}>{strings.signup.invalidEmailError}</Text>
                                    </View>
                                    :
                                    <View>
                                        <Text></Text>
                                    </View>
                            }
                            {/* password input */}
                            <Item
                                floatingLabel
                                last
                                error={this.state.passwordError}
                                success={this.state.passwordSuccess}
                            >
                                <Icon name={'lock'} type={'FontAwesome5'} style={styles.iconStyle} />
                                <Label style={styles.textStyle}> {strings.signup.password}</Label>
                                <Input
                                    style={styles.textStyle}
                                    returnKeyType={'next'}
                                    secureTextEntry
                                    getRef={input => { this.Password = input; }}
                                    onSubmitEditing={() => { this.ConfirmPassword._root.focus(); }}
                                    blurOnSubmit={false}
                                    value={password}
                                    onChangeText={value => this.onPasswordChanged(value)}
                                />
                                {
                                    this.state.passwordError ?
                                        <Icon name='close-circle' />
                                        :
                                        <View />
                                }
                                {
                                    this.state.passwordSuccess ?
                                        <Icon name='checkmark-circle' />
                                        :
                                        <View />
                                }
                            </Item>
                            {
                                this.state.passwordLengthError ?
                                    <View style={styles.errorMessageContainer}>
                                        <Text style={styles.errorText}>{strings.signup.passwordLengthError}</Text>
                                    </View>
                                    :
                                    <View>
                                        <Text></Text>
                                    </View>
                            }
                            {/* confirm password input */}
                            <Item
                                floatingLabel
                                last
                                error={this.state.confirmPasswordError}
                                success={this.state.confirmPasswordSuccess}
                            >
                                <Icon name={'lock'} type={'FontAwesome5'} style={styles.iconStyle} />
                                <Label style={styles.textStyle}> {strings.signup.confirmPassword}</Label>
                                <Input
                                    style={styles.textStyle}
                                    secureTextEntry
                                    getRef={input => { this.ConfirmPassword = input; }}
                                    value={confirmPassword}
                                    onChangeText={value => this.onConfirmPasswordChanged(value)}
                                />
                                {
                                    this.state.confirmPasswordError ?
                                        <Icon name='close-circle' />
                                        :
                                        <View />
                                }
                                {
                                    this.state.confirmPasswordSuccess ?
                                        <Icon name='checkmark-circle' />
                                        :
                                        <View />
                                }
                            </Item>
                            {
                                this.state.passwordsNotMatch ?
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
                    <View style={styles.buttonContainer}>
                        <Button block style={styles.buttonStyle} onPress={this.onSignupPressed.bind(this)}>
                            <Text style={styles.buttonTextStyle}>{strings.signup.buttonText}</Text>
                        </Button>
                    </View>
                    <View style={styles.bottomContainer}>
                        <Text style={styles.plainTextStyle}>{strings.signup.text}</Text>
                        <TouchableOpacity onPress={this.onLoginPressed.bind(this)}>
                            <Text style={styles.signupTextStyle}>{strings.signup.login}</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground >
            </ScrollView>
        );
    }
}

const styles = EStyleSheet.create({
    mainContainer: {
        flex: 1,
        // backgroundColor: colors.black,
    },
    imageContainer: {
        flex: 2,
        alignItems: 'center',
        paddingTop: '50rem',
        paddingBottom: '15rem'
    },
    formContainer: {
        flex: 4
    },
    buttonContainer: {
        flex: 1,
        paddingBottom: '20rem',
        paddingTop: '40rem',
        paddingHorizontal: '15rem'
    },
    bottomContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: '15rem',
        paddingTop: '10rem',
        paddingBottom: '20rem',
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imagePickerContainer: {
        width: '180rem',
        height: '180rem',
        borderRadius: '90rem',
        backgroundColor: colors.ash_transparent,
        justifyContent: 'center',
        alignItems: 'center'
    },
    thumbnailStyle: {
        width: '180rem',
        height: '180rem',
        borderRadius: '90rem',
    },
    cameraIcon: {
        color: colors.ash_light,
        fontSize: '50rem'
    },
    formStyle: {
        paddingHorizontal: '15rem'
    },
    textStyle: {
        color: colors.white,
    },
    iconStyle: {
        color: colors.ash_light,
        fontSize: EStyleSheet.value('18rem')
    },
    buttonStyle: {
        backgroundColor: colors.green_light,
        height: '45rem',
    },
    buttonTextStyle: {
        color: colors.white,
        fontWeight: '300',
        fontSize: '18rem',
        alignSelf: 'center'
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
    errorText: {
        color: colors.dangerRed,
        fontSize: '14rem'
    },
    errorMessageContainer: {
        flex: 1,
        alignItems: 'flex-end'
    }
});

const mapStateToProps = state => {
    return {
        name: state.signup.name,
        contactNumber: state.signup.contactNumber,
        email: state.signup.email,
        password: state.signup.password,
        confirmPassword: state.signup.confirmPassword,
    };
};

export default connect(mapStateToProps, actions)(SignupScreen);