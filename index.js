import {MODE, LIST_MODE, LANGUAGE, TRANSLATIONS, HELPERS} from './src/constants';
import Picker from './src/Picker';

Picker.MODE = MODE;
Picker.setMode = (mode) => {
    Picker.MODE.DEFAULT = mode;
}

Picker.LIST_MODE = LIST_MODE;
Picker.setListMode = (mode) => {
    Picker.LIST_MODE.DEFAULT = mode;
}

Picker.LANGUAGE = LANGUAGE;
Picker.setLanguage = (language) => {
    LANGUAGE.DEFAULT = language;
}

Picker.addTranslation = (language, translation) => {
    TRANSLATIONS[language] = translation;
}

Picker.HELPERS = HELPERS;

export default Picker;