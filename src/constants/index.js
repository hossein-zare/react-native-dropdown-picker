import {I18nManager} from 'react-native';

import TRANSLATIONS from '../translations';
import Colors from './colors';

export {TRANSLATIONS};

export const SCHEMA = {
    label: 'label',
    value: 'value',
    icon: 'icon',
    parent: 'parent',
    selectable: 'selectable',
    disabled: 'disabled',
    testID: 'testID',
    containerStyle: 'containerStyle',
    labelStyle: 'labelStyle'
}

export const MODE = {
    DEFAULT: 'SIMPLE',
    SIMPLE: 'SIMPLE',
    BADGE: 'BADGE'
}

export const LIST_MODE = {
    DEFAULT: 'FLATLIST',
    FLATLIST: 'FLATLIST',
    SCROLLVIEW: 'SCROLLVIEW',
    MODAL: 'MODAL'
}

export const DROPDOWN_DIRECTION = {
    DEFAULT: 'AUTO',
    TOP: 'TOP',
    BOTTOM: 'BOTTOM',
    AUTO: 'AUTO'
}

export const LANGUAGE = {
    DEFAULT: 'EN',
    FALLBACK: 'EN',

    ENGLISH: 'EN',
    ARABIC: 'AR',
    FARSI: 'FA',
    TURKISH: 'TR',
    RUSSIAN: 'RU',
    SPANISH: 'ES',
    INDONESIAN: 'ID',
    ITALIAN: 'IT'
}

export const GET_DROPDOWN_DIRECTION = (direction) => {
    switch (direction) {
        case DROPDOWN_DIRECTION.AUTO:
            return 'top';
        case DROPDOWN_DIRECTION.TOP:
            return 'bottom';
        case DROPDOWN_DIRECTION.BOTTOM:
            return 'top';
        default:
            return 'top';
    }
}

const STYLE_DIRECTION_KEYS = {
    marginStart: 'marginRight',
    marginEnd: 'marginLeft',
    paddingStart: 'paddingRight',
    paddingEnd: 'paddingLeft',
    marginLeft: 'marginRight',
    marginRight: 'marginLeft',
    paddingLeft: 'paddingRight',
    paddingRight: 'paddingLeft',
};

export const RTL_DIRECTION = (rtl, style) => {
    const newStyle = {...style};

    if (rtl && ! I18nManager.isRTL) {
        if (newStyle.hasOwnProperty('flexDirection')) {
            newStyle['flexDirection'] = newStyle['flexDirection'] === 'row' ? 'row-reverse' : 'row';
        } else {
            newStyle['flexDirection'] = 'row-reverse';
        }
    }

    return newStyle;
}

export const RTL_STYLE = (rtl, style) => {
    const newStyle = {...style};

    if (rtl && ! I18nManager.isRTL) {
        Object.keys(style).map((key) => {
            if (STYLE_DIRECTION_KEYS.hasOwnProperty(key)) {
                newStyle[STYLE_DIRECTION_KEYS[key]] = newStyle[key];
                delete newStyle[key];
            } else {
                newStyle[key] = newStyle[key];
            }
        });
    }

    return newStyle;
}

export const GET_TRANSLATION = (key, language = LANGUAGE.DEFAULT, customTranslation = {}) => {
    try {
        const data = {...TRANSLATIONS[language], ...customTranslation}[key];

        if (typeof data === 'undefined')
            throw Error();

        return data;
    } catch (e) {
        return {...TRANSLATIONS[LANGUAGE.FALLBACK], ...customTranslation}[key];
    }
}

export const BADGE_COLORS = [Colors.ALTO];

export const BADGE_DOT_COLORS = [Colors.GREY];

export const ASCII_CODE = (str) => {
    let chr = 0;

    if (str.length === 0)
        return chr;

    for (let i = 0; i < str.length; i++)
        chr+= str.charCodeAt(i);

    return chr;
}
