import React from 'react';
import {
    setCustomTextInput,
    setCustomText,
} from 'react-native-global-props';
import { Fonts } from './src/utils/Fonts';
import App from './src/App';

const customTextInputProps = {
    style: {
        fontFamily: Fonts.HelveticaNeueLight
    }
};

const customTextProps = {
    style: {
        fontFamily: Fonts.HelveticaNeueLight
    }
};

setCustomTextInput(customTextInputProps);
setCustomText(customTextProps);

const Main = () => {
    return (
        <App />
    );
};

export default Main;