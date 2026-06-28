import {
    StyleSheet
} from 'react-native';

import Colors from '../../constants/colors';

export const ICONS = {
    ARROW_DOWN: require('./icons/arrow-down.png'),
    ARROW_UP: require('./icons/arrow-up.png'),
    TICK: require('./icons/tick.png'),
    CLOSE: require('./icons/close.png')
};

export default StyleSheet.create({
    container: {
        width: '100%',
    },
    style: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        minHeight: 50,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.BLACK,
        paddingHorizontal: 10,
        paddingVertical: 3,
        backgroundColor: Colors.WHITE
    },
    label: {
        flex: 1,
        color: Colors.BLACK
    },
    labelContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    arrowIcon: {
        width: 20,
        height: 20
    },
    tickIcon: {
        width: 20,
        height: 20
    },
    closeIcon: {
        width: 30,
        height: 30
    },
    badgeStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: Colors.ALTO,
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    badgeDotStyle: {
        width: 10,
        height: 10,
        borderRadius: 10 / 2,
        marginRight: 8,
        backgroundColor: Colors.GREY
    },
    badgeSeparator: {
        width: 5,
    },
    listBody: {
        height: '100%',
    },
    listBodyContainer: {
        flexGrow: 1,
        alignItems: 'center',
    },
    dropDownContainer: {
        position: 'absolute',
        backgroundColor: Colors.WHITE,
        borderRadius: 8,
        borderColor: Colors.BLACK,
        borderWidth: 1,
        width: '100%',
        overflow: 'hidden',
        zIndex: 1000
    },
    modalContentContainer: {
        flexGrow: 1,
    },
    listItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        height: 40
    },
    listItemLabel: {
        flex: 1,
        color: Colors.BLACK
    },
    iconContainer: {
        marginRight: 10
    },
    arrowIconContainer: {
        marginLeft: 10
    },
    tickIconContainer: {
        marginLeft: 10
    },
    closeIconContainer: {
        marginLeft: 10
    },
    listParentLabel: {

    },
    listChildLabel: {

    },
    listParentContainer: {

    },
    listChildContainer: {
        paddingLeft: 40,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomColor: Colors.BLACK,
        borderBottomWidth: 1
    },
    searchTextInput: {
        flexGrow: 1,
        flexShrink: 1,
        margin: 0,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 8,
        borderColor: Colors.BLACK,
        borderWidth: 1,
        color: Colors.BLACK
    },
    itemSeparator: {
        height: 1,
        backgroundColor: Colors.BLACK,
    },
    flatListContentContainer: {
        flexGrow: 1
    },
    customItemContainer: {

    },
    customItemLabel: {
        fontStyle: 'italic'
    },
    listMessageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    listMessageText: {

    },
    selectedItemContainer: {

    },
    selectedItemLabel: {

    },
    modalTitle: {
        fontSize: 18,
        color: Colors.BLACK
    },
    extendableBadgeContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1
    },
    extendableBadgeItemContainer: {
        marginVertical: 3,
        marginEnd: 7
    }
});