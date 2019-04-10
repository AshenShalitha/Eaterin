import React, { Component } from 'react';
import {
    Dimensions,
    View,
    ScrollView,
    Text,
    AsyncStorage,
    ImageBackground,
    TouchableOpacity
} from 'react-native';
import {
    Card,
    Thumbnail,
    Icon,
    Button
} from 'native-base';
import EStyleSheet from 'react-native-extended-stylesheet';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import { SkypeIndicator } from 'react-native-indicators';

import { LoggedOutProfileView } from '../../../../components/LoggedOutProfileView';
import { UserDetailCard } from '../../../../components/UserDetailCard';
import { ChangePasswordCard } from '../../../../components/ChangePasswordCard';
import { LogoutCard } from '../../../../components/LogoutCard';
import { OfflineNotice } from '../../../../components/OfflineNotice';
import profileBg from '../../../../utils/images/profile_bg.jpg';
import { AlertPopUp } from '../../../../components/AlertPopUp';
import { colors } from '../../../../utils/Colors';
import { strings } from '../../../../utils/Strings';
import * as actions from '../../../../redux/actions';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

let uri;

const options = {
    title: 'Select Profile Picture',
    quality: 0.3
};

class ProileScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            avatarSource: null,
            modalVisible: false,
            newPasswordError: false,
            confirmPasswordError: false,
            newPasswordSuccess: false,
            confirmPasswordSuccess: false,
            passwordLengthError: false,
            passwordsNotMatch: false,
        };
    }

    onImagePickerPressed() {
        if (this.props.isLoggedIn) {
            ImagePicker.launchImageLibrary(options, (response) => {
                if (!response.didCancel) {
                    this.updateProfilePicture(response.fileName, response.type, response.uri);
                    uri = response.uri;
                    this.setState({
                        avatarSource: uri,
                    });
                } else if (response.error) {
                    console.log(response.error);
                }
            });
        }
    }

    updateProfilePicture(fileName, fileType, fileUri) {
        const { accessToken, id } = this.props;
        this.props.updateProfilePicture(fileName, fileType, fileUri, id, accessToken);
    }

    renderProfilePicSpinner() {
        if (this.props.profilePicUpdateLoading) {
            return <SkypeIndicator color={colors.green_light} size={EStyleSheet.value('20rem')} style={{ paddingTop: 5 }} />;
        } else {
            return null;
        }
    }

    renderThumbnail() {
        if (this.props.profilePic === null) {
            return (
                <TouchableOpacity style={{ alignSelf: 'center' }} onPress={this.onImagePickerPressed.bind(this)}>
                    <View style={styles.imagePickerContainer}>
                        <Icon name={'add-a-photo'} type={'MaterialIcons'} style={styles.cameraIcon} />
                    </View>
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity style={styles.profilePic} onPress={this.onImagePickerPressed.bind(this)}>
                    <Thumbnail source={this.setAvatar()} style={styles.thumbnailStyle} />
                </TouchableOpacity>
            );
        }
    }

    setAvatar() {
        if (this.state.avatarSource !== null) {
            return { uri: `${this.state.avatarSource}` };
        } else {
            return { uri: this.props.profilePic };
        }
    }

    onLogoutPressed() {
        AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    }

    nameChanged(value) {
        this.props.nameChanged(value);
        this.props.enableNameButton();
    }

    conatactNumberChanged(value) {
        this.props.contactNoChanged(value);
        if (value !== '' && (value.length >= 9 && value.length <= 15)) {
            this.props.enableContactButton();
        } else {
            this.props.disableContactButton();
        }
    }

    onOldPasswordChanged(value) {
        this.props.oldPasswordChanged(value);
    }

    onNewPasswordChanged(value) {
        this.props.newPasswordChanged(value);
        if (value.length >= 6) {
            this.setState({
                newPasswordSuccess: true,
                newPasswordError: false,
                passwordLengthError: false,
            });
        } else {
            this.setState({
                newPasswordSuccess: false,
                newPasswordError: true,
                passwordLengthError: true
            });
        }
    }

    onConfirmPasswordChanged(value) {
        this.props.confirmPasswordChanged(value);
        if (value.length >= 6 && value === this.props.newPassword) {
            this.setState({
                confirmPasswordSuccess: true,
                confirmPasswordError: false,
                passwordsNotMatch: false
            });
            this.props.enablePasswordChangeButton();
        } else {
            this.setState({
                confirmPasswordSuccess: false,
                confirmPasswordError: true,
                passwordsNotMatch: true
            });
            this.props.disablePasswordChangeButton();
        }
    }

    onPasswordChanged() {
        const { id, oldPassword, newPassword, confirmPassword, accessToken } = this.props;
        this.props.changePassword(id, oldPassword, newPassword, confirmPassword, accessToken);
    }

    onUserDetailsSavePressed() {
        const { name, contactNo } = this.props;
        const keys = ['id', 'accessToken'];
        AsyncStorage.multiGet(keys).then((result) => {
            const id = result[0][1];
            const accessToken = result[1][1];
            this.props.updateProfile(name, contactNo, id, accessToken);
        });
    }

    loggedInUserProfile() {
        return (
            <View style={styles.bottomContainer}>
                <UserDetailCard
                    iconName={'user-alt'}
                    iconType={'FontAwesome5'}
                    label={'Name'}
                    textValue={this.props.name}
                    inputValue={this.props.name}
                    onChangeText={(value) => this.nameChanged(value)}
                    buttonDisabled={this.props.disabledName}
                    buttonColor={this.props.colorName}
                    onPress={() => this.onUserDetailsSavePressed()}
                    loading={this.props.profileUpdateLoading}
                />
                <UserDetailCard
                    iconName={'phone'}
                    iconType={'FontAwesome5'}
                    label={'Contact Number'}
                    textValue={this.props.contactNo}
                    inputValue={this.props.contactNo}
                    onChangeText={(value) => this.conatactNumberChanged(value)}
                    keyboardType={'phone-pad'}
                    buttonDisabled={this.props.disabledContact}
                    buttonColor={this.props.colorContact}
                    onPress={() => this.onUserDetailsSavePressed()}
                    loading={this.props.profileUpdateLoading}
                />
                <ChangePasswordCard
                    newPassword={this.props.newPassword}
                    onNewPasswordChanged={(value) => this.onNewPasswordChanged(value)}
                    oldPassword={this.props.oldPassword}
                    onOldPasswordChanged={(value) => this.onOldPasswordChanged(value)}
                    confirmPassword={this.props.confirmPassword}
                    onConfirmPasswordChanged={(value) => this.onConfirmPasswordChanged(value)}
                    newPwError={this.state.newPasswordError}
                    newPwSuccess={this.state.newPasswordSuccess}
                    confirmPwError={this.state.confirmPasswordError}
                    confirmPwSuccess={this.state.confirmPasswordSuccess}
                    passwordLengthError={this.state.passwordLengthError}
                    passwordsNotMatch={this.state.passwordsNotMatch}
                    disabled={this.props.disabledPasswordChange}
                    buttonColor={this.props.colorPasswordChange}
                    onPress={() => this.onPasswordChanged()}
                    loading={this.props.passwordChangeLoading}
                />
                <LogoutCard
                    onLogoutPress={() => this.setState({ modalVisible: true })}
                />
            </View>
        );
    }

    loggedOutUserProfile() {
        return (
            <LoggedOutProfileView onPress={() => this.props.navigation.navigate('Auth')} />
        );
    }

    onErrorPopupCancelled() {
        this.props.resetPaswordChangeError();
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.scrollStyle}>
                <View style={styles.mainContainer}>
                    <OfflineNotice />
                    <ImageBackground
                        style={styles.imageBackground}
                        source={profileBg}
                    >
                        {this.renderThumbnail()}
                        {this.renderProfilePicSpinner()}
                    </ImageBackground>
                    {
                        this.props.isLoggedIn ?
                            this.loggedInUserProfile()
                            :
                            this.loggedOutUserProfile()
                    }
                </View>
                <AlertPopUp
                    isVisible={this.state.modalVisible}
                    onBackdropPress={() => this.setState({ modalVisible: false })}
                    onBackButtonPress={() => this.setState({ modalVisible: false })}
                    title={'Logout'}
                    text={'Are you sure?'}
                    positiveButtonText={'Yes'}
                    negativeButtonText={'No'}
                    buttonCount={2}
                    iconName={'alert-circle'}
                    iconType={'Feather'}
                    onPositivePress={() => this.onLogoutPressed()}
                    onNegativePress={() => this.setState({ modalVisible: false })}
                />
                <AlertPopUp
                    isVisible={this.props.passwordChangeError}
                    onBackdropPress={() => this.onErrorPopupCancelled()}
                    onBackButtonPress={() => this.onErrorPopupCancelled()}
                    title={'Update Failed'}
                    text={this.props.passwordChangeErrorMessage}
                    buttonText={'Ok'}
                    buttonCount={1}
                    onPress={() => this.onErrorPopupCancelled()}
                    iconName={'alert-circle'}
                    iconType={'Feather'}
                />
            </ScrollView>
        );
    }
}

const styles = EStyleSheet.create({
    scrollStyle: {
        paddingBottom: '15rem'
    },
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageBackground: {
        alignSelf: 'stretch',
        justifyContent: 'center',
        paddingVertical: '20rem',
        height: '180rem'
    },
    cameraIcon: {
        color: colors.ash_light,
        fontSize: '50rem'
    },
    bottomContainer: {
        flex: 3,
        backgroundColor: colors.white,
        alignSelf: 'stretch',
        justifyContent: 'flex-start',
        paddingHorizontal: '20rem'
        // elevation: 3,  
    },
    imagePickerContainer: {
        width: '120rem',
        height: '120rem',
        borderRadius: '60rem',
        backgroundColor: colors.ash_transparent,
        justifyContent: 'center',
        alignItems: 'center'
    },
    thumbnailStyle: {
        width: '120rem',
        height: '120rem',
        borderRadius: '60rem',
    },
    profilePic: {
        alignSelf: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    }
});

const mapStateToProps = state => {
    return {
        profilePicUpdateLoading: state.profile.profilePicUpdateLoading,
        isLoggedIn: state.login.isLoggedIn,
        name: state.profile.name,
        contactNo: state.profile.contactNo,
        oldPassword: state.profile.oldPassword,
        newPassword: state.profile.newPassword,
        confirmPassword: state.profile.confirmPassword,
        disabledName: state.profile.disabledName,
        colorName: state.profile.colorName,
        disabledContact: state.profile.disabledContact,
        colorContact: state.profile.colorContact,
        profileUpdateLoading: state.profile.profileUpdateLoading,
        profilePic: state.profile.profilePic,
        accessToken: state.profile.accessToken,
        id: state.profile.id,
        disabledPasswordChange: state.profile.disabledPasswordChange,
        colorPasswordChange: state.profile.colorPasswordChange,
        passwordChangeError: state.profile.passwordChangeError,
        passwordChangeErrorMessage: state.profile.passwordChangeErrorMessage,
        passwordChangeLoading: state.profile.passwordChangeLoading,
    };
};

export default connect(mapStateToProps, actions)(ProileScreen);
