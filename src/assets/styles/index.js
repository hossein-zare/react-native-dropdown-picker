import {
    StyleSheet
} from 'react-native';

import Colors from './colors';

export default StyleSheet.create({
    container: {
        width: '100%',
    },
    style: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: 50,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: Colors.BLACK,
        paddingHorizontal: 10,
        backgroundColor: Colors.WHITE,
    },
    label: {
        flex: 1
    },
    arrowIcon: {
        width: 20,
        height: 20,
        marginLeft: 10
    },
    tickIcon: {
        width: 20,
        height: 20,
    },
    closeIcon: {
        width: 30,
        height: 30,
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
        width: 5
    },
    bodyContainer: {
        flexGrow: 1
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
        flex: 1,
    },
    listItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        height: 40
    },
    listItemLabel: {
        flex: 1
    },
    iconContainer: {
        marginRight: 10
    },
    tickIconContainer: {
        marginLeft: 10
    },
    listParentLabel: {

    },
    listChildLabel: {

    },
    listParentContainer: {

    },
    listChildContainer: {
        paddingLeft: 40
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
    },
    itemSeparator: {
        height: 1,
        backgroundColor: Colors.BLACK,
    },
    closeIconContainer: {
        marginLeft: 10
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

    }
});