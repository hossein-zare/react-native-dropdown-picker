import TRANSLATIONS from '../translations';
import Colors from '../assets/styles/colors';

export {TRANSLATIONS};

export const SCHEMA = {
    label: 'label',
    value: 'value',
    icon: 'icon',
    parent: 'parent',
    selectable: 'selectable',
    disabled: 'disabled',
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

export const LANGUAGE = {
    DEFAULT: 'EN',
    FALLBACK: 'EN',

    ENGLISH: 'EN',
    ARABIC: 'AR',
    FARSI: 'FA',
    TURKISH: 'TR'
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

export const ASSETS = {
    ARROW_DOWN: require('../assets/images/arrow-down.png'),
    ARROW_UP: require('../assets/images/arrow-up.png'),
    TICK: require('../assets/images/tick.png'),
    CLOSE: require('../assets/images/close.png')
}

export const HASH = (str) => {
    let hash = 0;
    let chr;

    if (str.length === 0)
        return hash;

    for (let i = 0; i < str.length; i++) {
        chr   = str.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0;
    }

    return hash;
}

export const HELPERS = {
    GET_SELECTED_ITEM: (items, value, key = "value") => {
        return items.find(item => item[key] === value);
    },
    GET_SELECTED_ITEMS: (items, values, key = "value") => {
        if (values === null)
            return [];

        return items.filter(item => values.includes(item[key]));
    }
}