import {
    NUMBER_OF_GUESTS_INCREASED,
    NUMBER_OF_GUESTS_DECREASED
} from '../types';

export const guestsIncreased = (number) => {
    const x = number + 1;
    return {
        type: NUMBER_OF_GUESTS_INCREASED,
        payload: x
    };
};

export const guestsDecreased = (number) => {
    const y = number - 1;
    return {
        type: NUMBER_OF_GUESTS_DECREASED,
        payload: y
    };
};