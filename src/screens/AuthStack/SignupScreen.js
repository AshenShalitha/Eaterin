import React, { Component } from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
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
    Icon
} from 'native-base';

import coverImg from '../../utils/images/login_bg.jpg';
import { colors } from '../../utils/Colors';
import { strings } from '../../utils/Strings';

const entireScreenWidth = Dimensions.get('window').width;
const entireScreenHeight = Dimensions.get('window').height;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

class SignupScreen extends Component {

    onLoginPressed = () => { this.props.navigation.pop(); }

    render() {
        return (
            <ScrollView style={{ flex: 1, flexDirection: 'column' }}>
                <ImageBackground style={[styles.mainContainer]} source={coverImg}>
                    <View style={styles.imageContainer}>
                        <TouchableOpacity>
                            <View style={styles.imagePickerContainer}>
                                <Icon name={'camera'} type={'SimpleLineIcons'} style={styles.cameraIcon} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.formContainer}>
                        <Form style={styles.formStyle}>
                            <Item floatingLabel last>
                                <Icon name={'email'} type={'MaterialCommunityIcons'} style={styles.iconStyle} />
                                <Label style={styles.textStyle}>{strings.signup.name}</Label>
                                <Input
                                    style={styles.textStyle}
                                    returnKeyType={'next'}
                                    onSubmitEditing={() => { this.ContactNo._root.focus(); }}
                                    blurOnSubmit={false}
                                />
                            </Item>
                            <Item floatingLabel last>
                                <Icon name={'email'} type={'MaterialCommunityIcons'} style={styles.iconStyle} />
                                <Label style={styles.textStyle}>{strings.signup.contactNo}</Label>
                                <Input
                                    style={styles.textStyle}
                                    keyboardType={'phone-pad'}
                                    returnKeyType={'next'}
                                    getRef={input => { this.ContactNo = input; }}
                                    onSubmitEditing={() => { this.Email._root.focus(); }}
                                    blurOnSubmit={false}
                                />
                            </Item>
                            <Item floatingLabel last>
                                <Icon name={'email'} type={'MaterialCommunityIcons'} style={styles.iconStyle} />
                                <Label style={styles.textStyle}>{strings.signup.username}</Label>
                                <Input
                                    style={styles.textStyle}
                                    keyboardType={'email-address'}
                                    returnKeyType={'next'}
                                    getRef={input => { this.Email = input; }}
                                    onSubmitEditing={() => { this.Password._root.focus(); }}
                                    blurOnSubmit={false}
                                />
                            </Item>
                            <Item floatingLabel last>
                                <Icon name={'lock'} type={'MaterialCommunityIcons'} style={styles.iconStyle} />
                                <Label style={styles.textStyle}> {strings.signup.password}</Label>
                                <Input
                                    style={styles.textStyle}
                                    returnKeyType={'next'}
                                    secureTextEntry
                                    getRef={input => { this.Password = input; }}
                                    onSubmitEditing={() => { this.ConfirmPassword._root.focus(); }}
                                    blurOnSubmit={false}
                                />
                            </Item>
                            <Item floatingLabel last>
                                <Icon name={'lock'} type={'MaterialCommunityIcons'} style={styles.iconStyle} />
                                <Label style={styles.textStyle}> {strings.signup.confirmPassword}</Label>
                                <Input
                                    style={styles.textStyle}
                                    secureTextEntry
                                    getRef={input => { this.ConfirmPassword = input; }}
                                />
                            </Item>
                        </Form>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button block style={styles.buttonStyle}>
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
        paddingVertical: '30rem',
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
        width: '160rem',
        height: '160rem',
        borderRadius: '80rem',
        backgroundColor: colors.ash_transparent,
        justifyContent: 'center',
        alignItems: 'center'
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
});

export default SignupScreen;