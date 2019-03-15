import React from 'react';
import { View, Image, Dimensions } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import EStyleSheet from 'react-native-extended-stylesheet';

import ProfileScreen from './ProfileScreen';
import { HeaderLeft, HeaderRight } from '../../../../components/Header';
import { colors } from '../../../../utils/Colors';
import logo from '../../../../utils/images/logoEaterin.png';

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

export const ProfileStack = createStackNavigator(
    {
        ProfileScreen: {
            screen: ProfileScreen,
            navigationOptions: {
                headerStyle: {
                    backgroundColor: colors.white,
                },
                headerRight: (<HeaderRight />),
                headerLeft: (<HeaderLeft />),
                headerTitle: (
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Image
                            source={logo}
                            style={{
                                height: EStyleSheet.value('28rem'),
                                width: EStyleSheet.value('110rem'),
                                alignSelf: 'center'
                            }}
                            resizeMode={'contain'}
                        />
                    </View>
                ),
            }
        }
    },
    {
        initialRouteName: 'ProfileScreen'
    }
);