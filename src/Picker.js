import React, {
    useCallback,
    useState,
    useRef,
    useEffect,
    useMemo,
    memo,
    Fragment,
} from 'react';

import {
    View,
    Text,
    TouchableOpacity,
    Image,
    LogBox,
    FlatList,
    TextInput,
    Dimensions,
    ScrollView,
    Modal,
    ActivityIndicator,
    Platform,
} from 'react-native';

const {height: WINDOW_HEIGHT} = Dimensions.get('window');

import Styles from './assets/styles';
import Colors from './assets/styles/colors';
import {
    SCHEMA,
    GET_TRANSLATION,
    ASSETS,
    BADGE_COLORS,
    BADGE_DOT_COLORS,
    HASH,
    TRANSLATIONS,
    MODE,
    LIST_MODE,
    LANGUAGE
} from './constants';
import RenderBadgeItem from './RenderBadgeItem';
import RenderListItem from './RenderListItem';

function Picker({
    value = null,
    items = [],
    open,
    placeholder = null,
    closeAfterSelecting = true,
    labelProps = {},
    disabled = false,
    disabledStyle = {},
    placeholderStyle = {},
    containerStyle = {},
    style = {},
    textStyle = {},
    labelStyle = {},
    arrowIconStyle = {},
    tickIconStyle = {},
    closeIconStyle = {},
    badgeStyle = {},
    badgeTextStyle = {},
    badgeDotStyle = {},
    iconContainerStyle = {},
    searchContainerStyle = {},
    searchTextInputStyle = {},
    searchPlaceholderTextColor = Colors.GREY,
    dropDownContainerStyle = {},
    modalContentContainerStyle = {},
    closeIconContainerStyle = {},
    tickIconContainerStyle = {},
    listItemContainerStyle = {},
    listItemLabelStyle = {},
    listChildContainerStyle = {},
    listChildLabelStyle = {},
    listParentContainerStyle = {},
    listParentLabelStyle = {},
    selectedItemContainerStyle = {},
    selectedItemLabelStyle = {},
    disabledItemContainerStyle = {},
    disabledItemLabelStyle = {},
    customItemContainerStyle = {},
    customItemLabelStyle = {},
    listMessageContainerStyle = {},
    listMessageTextStyle = {},
    itemSeparatorStyle = {},
    badgeSeparatorStyle = {},
    listMode = LIST_MODE.DEFAULT,
    categorySelectable = true,
    searchable = true,
    searchPlaceholder = null,
    schema = {},
    language = LANGUAGE.DEFAULT,
    translation = {},
    multiple = false,
    mode = MODE.DEFAULT,
    key = null,
    maxHeight = 200,
    renderBadgeItem = null,
    renderListItem = null,
    itemSeparator = false,
    bottomOffset = 0,
    badgeColors = BADGE_COLORS,
    badgeDotColors = BADGE_DOT_COLORS,
    showArrowIcons = true,
    showBadgeDot = true,
    ArrowUpComponent = null,
    ArrowDownComponent = null,
    TickIconComponent = null,
    CloseIconComponent = null,
    ListEmptyComponent = null,
    ActivityIndicatorComponent = null,
    activityIndicatorSize = 30,
    activityIndicatorColor = Colors.GREY,
    props = {},
    modalProps = {},
    flatListProps = {},
    scrollViewProps = {},
    searchTextInputProps = {},
    loading = false,
    min = null,
    max = null,
    addCustomItem = false,
    setOpen = () => {},
    setItems = () => {},
    disableBorderRadius = true,
    containerProps = {},
    onLayout = (e) => {},
    onPressStart = (open) => {},
    onPressEnd = (open) => {},
    onOpen = () => {},
    onClose = () => {},
    onChangeValue = (item) => {},
    onChangeSearchText = (text) => {},
    zIndex = 5000
}) {
    const [searchText, setSearchText] = useState('');
    const [pickerHeight, setPickerHeight] = useState(0);
    const [direction, setDirection] = useState('top');
    const badgeFlatListRef = useRef();
    const pickerRef = useRef(null);

    /**
     * componentDidMount.
     */
    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, []);

    /**
     * Mode property changed.
     */
    useEffect(() => {
        if (mode === MODE.SIMPLE)
            badgeFlatListRef.current = null;
    }, [mode]);

    /**
     * onPressClose.
     */
    const onPressClose = useCallback(() => {
        setOpen(false);
        setSearchText('');
        onClose();
    }, [setOpen, onClose]);

    /**
     * onPressClose.
     */
    const onPressOpen = useCallback(() => {
        setOpen(true);
        onOpen();
    }, [setOpen, onOpen]);

    /**
     * onPressToggle.
     */
    const onPressToggle = useCallback(() => {
        const isOpen = ! open;

        setOpen(isOpen);
        setSearchText('');

        if (isOpen)
            onOpen();
        else
            onClose();

        return isOpen;
    }, [open, setOpen, onOpen, onClose]);

    /**
     * The item schema.
     * @returns {object}
     */
    const _schema = useMemo(() => ({...SCHEMA, ...schema}), [schema]);

    /**
     * The sorted items.
     * @returns {object}
     */
    const sortedItems = useMemo(() => {
        const sortedItems = items.filter(item => item[_schema.parent] === undefined || item[_schema.parent] === null);
        const children = items.filter(item => item[_schema.parent] !== undefined && item[_schema.parent] !== null);

        children.forEach((child) => {
            const index = items.findIndex(item => item[_schema.parent] === child[_schema.parent] || item[_schema.value] === child[_schema.parent]);

            if (index > -1) {
                sortedItems.splice(index + 1, 0, child);
            }
        });

        return sortedItems;
    }, [items, _schema])

    /**
     * The items.
     * @returns {object}
     */
    const _items = useMemo(() => {
        if (searchText.length === 0) {
            return sortedItems;
        } else {
            const values = [];
            let results = sortedItems.filter(item => {
                if (item[_schema.label].toLowerCase().includes(searchText.toLowerCase())) {
                    values.push(item[_schema.value]);
                    return true;
                }

                return false;
            });

            results.forEach((item, index) => {
                if (item[_schema.parent] === undefined || item[_schema.parent] === null || values.includes(item[_schema.parent]))
                    return;

                const parent = sortedItems.find(x => x[_schema.value] === item[_schema.parent]);
                values.push(item[_schema.parent]);

                results.splice(index, 0, parent);
            });

            if (results.length === 0 && addCustomItem) {
                results.push({
                    [_schema.label]: searchText,
                    [_schema.value]: searchText.replace(' ', '-'),
                    custom: true
                });
            }

            return results;
        }
    }, [sortedItems, _schema, searchText, addCustomItem]);

    /**
     * The value.
     * @returns {string|object|null}}
     */
    const _value = useMemo(() => {
        if (multiple) {
            if (value === null)
                return [];

            return [...new Set(value)];
        }

        return value;
    }, [value, multiple]);

    /**
     * Selected items only for multiple items.
     * @returns {object}
     */
    const selectedItems = useMemo(() => {
        if (! multiple)
            return [];

        return sortedItems.filter(item => _value.includes(item[_schema.value]));
    }, [sortedItems, _value, _schema, multiple]);

    /**
     * The language.
     * @returns {string}
     */
    const _language = useMemo(() => {
        if (TRANSLATIONS.hasOwnProperty(language))
            return language;

        return LANGUAGE.FALLBACK;
    }, [language]);

    /**
     * Get translation.
     */
    const _ = useCallback((key) => {
        return GET_TRANSLATION(key, _language, translation);
    }, [_language, translation]);

    /**
     * The placeholder.
     * @returns {string}
     */
    const _placeholder = useMemo(() => placeholder ?? _('PLACEHOLDER'), [placeholder, _]);

    /**
     * The mode.
     * @returns {string}
     */
    const _mode = useMemo(() => {
        try {
            return mode;
        } catch (e) {
            return MODE.SIMPLE;
        }
    }, [mode]);

    /**
     * Indicates whether the value is null.
     * @returns {boolean}
     */
     const isNull = useMemo(() => _value === null || (Array.isArray(_value) && _value.length === 0), [_value]);

    /**
     * Get the selected item.
     * @returns {object}
     */
    const getSelectedItem = useCallback(() => {
        if (multiple)
            return _value;

        if (isNull)
            return null;

        try {
            return _items.find(item => item[_schema.value] === _value);
        } catch (e) {
            return null;
        }
    }, [_value, _items, isNull, multiple]);

    /**
     * Get the label of the selected item.
     * @param {string|null} fallback
     * @returns {string}
     */
    const getLabel = useCallback((fallback = null) => {
        const item = getSelectedItem();

        if (multiple)
            if (item.length > 0)
                return _('SELECTED_ITEMS_COUNT_TEXT').replace('\d', item.length);
            else
                return fallback;

        try {
            return item[_schema.label];
        } catch (e) {
            return fallback;
        }
    }, [getSelectedItem, multiple, _, _schema]);

    /**
     * The label of the selected item / placeholder.
     */
    const _selectedItemLabel = useMemo(() => getLabel(_placeholder), [getLabel, _placeholder]);

    /**
     * The icon of the selected item.
     */
    const _selectedItemIcon = useCallback(() => {
        if (multiple)
            return null;

        const item = getSelectedItem();

        try {
            return item[_schema.icon] ?? null;
        } catch (e) {
            return null;
        }
    }, [getSelectedItem, multiple, _schema]);


    /**
     * onPress.
     */
    const __onPress = useCallback(async () => {
        onPressStart(open);

        const isOpen = ! open;

        if (isOpen) {
            const [, y] = await new Promise((resolve) =>
                pickerRef.current.measureInWindow((...args) => resolve(args))
            );
            const size = y + maxHeight + pickerHeight + bottomOffset;

            setDirection(size < WINDOW_HEIGHT ? 'top' : 'bottom');
        }

        onPressToggle();

        onPressEnd(isOpen);
    }, [
        open,
        onPressToggle,
        onPressStart,
        onPressEnd,
        onOpen,
        onClose,
        pickerRef,
        maxHeight,
        pickerHeight,
        bottomOffset
    ]);

    /**
     * onLayout.
     */
    const __onLayout = useCallback((e) => {
        e.persist();

        onLayout(e);

        setPickerHeight(e.nativeEvent.layout.height);
    }, [onLayout]);

    /**
     * Disable borderRadius for the picker.
     * @returns {object}
     */
    const pickerNoBorderRadius = useMemo(() => {
        if (listMode === LIST_MODE.MODAL)
            return null;

        if (disableBorderRadius && open) {
            return direction === 'top' ? {
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
            } : {
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
            };
        }

        return {};
    }, [disableBorderRadius, open, direction, listMode]);

    /**
     * Disable borderRadius for the drop down.
     * @returns {object}
     */
     const dropDownNoBorderRadius = useMemo(() => {
        if (listMode === LIST_MODE.MODAL)
            return null;

        if (disableBorderRadius && open) {
            return direction === 'top' ? {
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
            } : {
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
            };
        }
     }, [disableBorderRadius, open, direction, listMode]);

    /**
     * The disabled style.
     * @returns {object}
     */
    const _disabledStyle = useMemo(() => disabled && disabledStyle, [disabled, disabledStyle]);

    /**
     * The style.
     * @returns {object}
     */
    const _style = useMemo(() => ([
        Styles.style, {
            zIndex
        },
        ...[style].flat(),
        pickerNoBorderRadius
    ]), [style, pickerNoBorderRadius, zIndex]);

    /**
     * The placeholder style.
     * @returns {object}
     */
    const _placeholderStyle = useMemo(() => {
        return isNull && placeholderStyle;
    }, [isNull, placeholderStyle]);

    /**
     * The style of the label.
     * @returns {object}
     */
    const _labelStyle = useMemo(() => ([
        Styles.label,
        ...[textStyle].flat(),
        ...[labelStyle].flat(),
        ...[_placeholderStyle].flat(),
    ]), [textStyle, _placeholderStyle, labelStyle]);

    /**
     * The arrow icon style.
     * @returns {object}
     */
    const _arrowIconStyle = useMemo(() => ([
        Styles.arrowIcon,
        ...[arrowIconStyle].flat()
    ]), [arrowIconStyle]);

    /**
     * The dropdown container style.
     * @returns {object}
     */
    const _dropDownContainerStyle = useMemo(() => ([
        Styles.dropDownContainer, {
            [direction]: pickerHeight - 1,
            maxHeight,
            zIndex
        },
        ...[dropDownContainerStyle].flat(),
        dropDownNoBorderRadius
    ]), [dropDownContainerStyle, pickerHeight, maxHeight, dropDownNoBorderRadius, direction, zIndex]);

    /**
     * The modal content container style.
     * @returns {object}
     */
     const _modalContentContainerStyle = useMemo(() => ([
        Styles.modalContentContainer,
        ...[modalContentContainerStyle].flat()
    ]), [modalContentContainerStyle]);

    /**
     * The zIndex.
     * @returns {object}
     */
    const _zIndex = useMemo(() => Platform.OS !== 'android' && {
        zIndex
    }, [zIndex]);

    /**
     * The container style.
     * @returns {object}
     */
    const _containerStyle = useMemo(() => ([
        Styles.container,
        _zIndex,
        ...[containerStyle].flat(),
        ...[_disabledStyle].flat()
    ]), [_zIndex, containerStyle, _disabledStyle]);

    /**
     * The arrow component.
     * @returns {JSX}
     */
    const _ArrowComponent = useMemo(() => {
        if (! showArrowIcons)
            return null;

        if (open && ArrowUpComponent !== null)
            return <ArrowUpComponent style={_arrowIconStyle} />;
        else if (! open && ArrowDownComponent !== null)
            return <ArrowDownComponent style={_arrowIconStyle} />;

        return <Image source={open ? ASSETS.ARROW_UP : ASSETS.ARROW_DOWN} style={_arrowIconStyle} />;
    }, [showArrowIcons, open, ArrowUpComponent, ArrowDownComponent, _arrowIconStyle]);

    /**
     * The icon container style.
     * @returns {object}
     */
     const _iconContainerStyle = useMemo(() => ([
        Styles.iconContainer,
        ...[iconContainerStyle].flat()
    ]), [iconContainerStyle]);

    /**
     * The selected item icon component.
     * @returns {JSX|null}
     */
     const SelectedItemIconComponent = useMemo(() => {
        const Component = _selectedItemIcon();

        return Component !== null && (
            <View style={_iconContainerStyle}>
                <Component />
            </View>
        );
     }, [_selectedItemIcon, _iconContainerStyle]);

    /**
     * The simple body component.
     * @returns {JSX}
     */
    const SimpleBodyComponent = useMemo(() => (
        <>
            {SelectedItemIconComponent}
            <Text style={_labelStyle} {...labelProps}>
                {_selectedItemLabel}
            </Text>
        </>
    ), [SelectedItemIconComponent, _labelStyle, labelProps, _selectedItemLabel]);

    /**
     * onPress badge.
     */
    const onPressBadge = useCallback((value) => {
        onChangeValue(state => {
            let _state = [...state];
            const index = _state.findIndex(item => item === value);
                _state.splice(index, 1);

            return _state;
        });
    }, [onChangeValue]);

    /**
     * The badge colors.
     * @returns {object}
     */
    const _badgeColors = useMemo(() => {
        if (typeof badgeColors === 'string')
            return [badgeColors];

        return badgeColors;
    }, [badgeColors]);

    /**
     * The badge dot colors.
     * @returns {object}
     */
    const _badgeDotColors = useMemo(() => {
        if (typeof badgeDotColors === 'string')
            return [badgeDotColors];

        return badgeDotColors;
    }, [badgeDotColors]);

    /**
     * Get badge color.
     * @param {string} str
     * @returns {string}
     */
     const getBadgeColor = useCallback((str) => {
        str = `${str}`;

        const index = HASH(str) % _badgeColors.length;
        return _badgeColors[index];
    }, [_badgeColors]);

    /**
     * Get badge dot color.
     * @param {string} str
     * @returns {string}
     */
     const getBadgeDotColor = useCallback((str) => {
        str = `${str}`;

        const index = HASH(str) % _badgeDotColors.length;
        return _badgeDotColors[index];
    }, [_badgeDotColors]);

    /**
     * The render badge component.
     * @returns {JSX}
     */
    const RenderBadgeComponent = useMemo(() => {
        return renderBadgeItem !== null ? renderBadgeItem : RenderBadgeItem;
    }, [renderBadgeItem]);

    /**
     * Render badge.
     * @returns {JSX}
     */
    const __renderBadge = useCallback(({item}) => (
        <RenderBadgeComponent
            label={item[_schema.label]}
            value={item[_schema.value]}
            IconComponent={item[_schema.icon] ?? null}
            textStyle={textStyle}
            badgeStyle={badgeStyle}
            badgeTextStyle={badgeTextStyle}
            badgeDotStyle={badgeDotStyle}
            getBadgeColor={getBadgeColor}
            getBadgeDotColor={getBadgeDotColor}
            showBadgeDot={showBadgeDot}
            onPress={onPressBadge} />
    ), [
        _schema,
        textStyle,
        badgeStyle,
        badgeTextStyle,
        badgeDotStyle,
        getBadgeColor,
        getBadgeDotColor,
        showBadgeDot,
        onPressBadge
    ]);

    /**
     * The badge key.
     * @returns {string}
     */
    const _key = useMemo(() => {
        if (key === null)
            return _schema.value;
        
        return key;
    }, [key, _schema]);

    /**
     * The key extractor.
     * @returns {string}
     */
    const keyExtractor = useCallback((item) => `${item[_key]}`, [_key]);

    /**
     * The badge separator style.
     * @returns {object}
     */
    const _badgeSeparatorStyle = useMemo(() => ([
        Styles.badgeSeparator,
        ...[badgeSeparatorStyle].flat()
    ]), [badgeSeparatorStyle]);

    /**
     * The badge separator component.
     * @returns {JSX}
     */
    const BadgeSeparatorComponent = useCallback(() => (
        <View style={_badgeSeparatorStyle} />
    ), [badgeSeparatorStyle]);

    /**
     * Badge list empty component.
     * @returns {JSX}
     */
    const BadgeListEmptyComponent = useCallback(() => (
        <Text style={_labelStyle} {...labelProps}>
            {_placeholder}
        </Text>
    ), [_labelStyle, labelProps, _placeholder]);

    /**
     * Set ref.
     */
    const setBadgeFlatListRef = useCallback((ref) => {
        badgeFlatListRef.current = ref;
    }, []);

    /**
     * The badge body component.
     * @returns {JSX}
     */
     const BadgeBodyComponent = useMemo(() => (
        <FlatList
            ref={setBadgeFlatListRef}
            data={selectedItems}
            renderItem={__renderBadge}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={keyExtractor}
            ItemSeparatorComponent={BadgeSeparatorComponent}
            ListEmptyComponent={BadgeListEmptyComponent}
            contentContainerStyle={Styles.bodyContainer}
        />
    ), [
        selectedItems,
        __renderBadge,
        keyExtractor,
        BadgeSeparatorComponent,
        BadgeListEmptyComponent
    ]);

    /**
     * The body component.
     */
    const _BodyComponent = useMemo(() => {
        switch (_mode) {
            case MODE.SIMPLE: return SimpleBodyComponent;
            case MODE.BADGE: return multiple ? BadgeBodyComponent : SimpleBodyComponent;
            default: //
        }
    }, [_mode, SimpleBodyComponent, BadgeBodyComponent, multiple]);

    /**
     * The list item container style.
     * @returns {object}
     */
    const _listItemContainerStyle = useMemo(() => ([
        Styles.listItemContainer,
        ...[listItemContainerStyle].flat()
    ]), [listItemContainerStyle]);

    /**
     * The tick icon container style.
     * @returns {object}
     */
    const _tickIconContainerStyle = useMemo(() => ([
        Styles.tickIconContainer,
        ...[tickIconContainerStyle].flat()
    ]), [tickIconContainerStyle]);

    /**
     * The list item label style.
     * @returns {object}
     */
    const _listItemLabelStyle = useMemo(() => ([
        Styles.listItemLabel,
        ...[textStyle].flat(),
        ...[listItemLabelStyle].flat()
    ]), [textStyle, listItemLabelStyle]);

    /**
     * The tick icon style.
     * @returns {object}
     */
    const _tickIconStyle = useMemo(() => ([
        Styles.tickIcon,
        ...[tickIconStyle].flat()
    ]), [tickIconStyle]);

    /**
     * The search container style.
     * @returns {object}
     */
    const _searchContainerStyle = useMemo(() => ([
        Styles.searchContainer,
        ...[searchContainerStyle].flat()
    ]), [searchContainerStyle]);

    /**
     * The search text input style.
     * @returns {object}
     */
    const _searchTextInputStyle = useMemo(() => ([
        Styles.searchTextInput,
        ...[searchTextInputStyle].flat()
    ]), [searchTextInputStyle]);

    /**
     * The close icon container style.
     * @returns {object}
     */
    const _closeIconContainerStyle = useMemo(() => ([
        Styles.closeIconContainer,
        ...[closeIconContainerStyle].flat()
    ]), [closeIconContainerStyle]);

    /**
     * The close icon style.
     * @returns {object}
     */
    const _closeIconStyle = useMemo(() => ([
        Styles.closeIcon,
        ...[closeIconStyle].flat()
    ]), [closeIconStyle]);

    /**
     * The list message container style.
     * @returns {objects}
     */
    const _listMessageContainerStyle = useMemo(() => ([
        Styles.listMessageContainer,
        ...[listMessageContainerStyle].flat()
    ]), [listMessageContainerStyle]);

    /**
     * The list message text style.
     * @returns {object}
     */
    const _listMessageTextStyle = useMemo(() => ([
        Styles.listMessageText,
        ...[listMessageTextStyle].flat()
    ]), [listMessageTextStyle]);
    

    /**
     * onPress item.
     */
    const onPressItem = useCallback((val, customItem = false) => {
        if (customItem !== false) {
            setItems(state => [...state, customItem]);
        }

        onChangeValue(state => {
            if (multiple) {
                let _state = state !== null ? [...state] : [];

                if (_state.includes(val)) {
                    if (Number.isInteger(min) && min >= _state.length) {
                        return state;
                    }

                    const index = _state.findIndex(item => item === val);
                    _state.splice(index, 1);
                } else {
                    if (Number.isInteger(max) && max <= _state.length) {
                        return state;
                    }

                    _state.push(val);
                }

                return _state;
            } else {
                return val;
            }
        });

        if (closeAfterSelecting && ! multiple)
            onPressClose();
    }, [
        onChangeValue,
        multiple,
        min,
        max,
        onPressClose,
        closeAfterSelecting,
        multiple,
        setItems,
        _schema
    ]);

    /**
     * The tick icon component.
     * @returns {JSX}
     */
    const _TickIconComponent = useCallback(() => {
        if (TickIconComponent !== null)
            return <TickIconComponent style={_tickIconStyle} />;

        return <Image source={ASSETS.TICK} style={_tickIconStyle} />;
    }, [TickIconComponent, _tickIconStyle]);

    /**
     * The renderItem component.
     * @returns {JSX}
     */
    const RenderItemComponent = useMemo(() => {
        return renderListItem !== null ? renderListItem : RenderListItem;
    }, [renderListItem]);

    /**
     * Render list item.
     * @returns {JSX}
     */
    const __renderListItem = useCallback(({item}) => (
        <RenderItemComponent
            label={item[_schema.label]}
            value={item[_schema.value]}
            parent={item[_schema.parent] ?? null}
            selectable={item[_schema.selectable] ?? null}
            disabled={item[_schema.disabled] ?? false}
            custom={item.custom ?? false}
            isSelected={_value !== null ? _value.includes(item[_schema.value]) : false}
            IconComponent={item[_schema.icon] ?? null}
            TickIconComponent={_TickIconComponent}
            iconContainerStyle={_iconContainerStyle}
            tickIconContainerStyle={_tickIconContainerStyle}
            listItemContainerStyle={_listItemContainerStyle}
            listItemLabelStyle={_listItemLabelStyle}
            listChildContainerStyle={listChildContainerStyle}
            listChildLabelStyle={listChildLabelStyle}
            listParentContainerStyle={listParentContainerStyle}
            listParentLabelStyle={listParentLabelStyle}
            customItemContainerStyle={customItemContainerStyle}
            customItemLabelStyle={customItemLabelStyle}
            selectedItemContainerStyle={selectedItemContainerStyle}
            selectedItemLabelStyle={selectedItemLabelStyle}
            disabledItemContainerStyle={disabledItemContainerStyle}
            disabledItemLabelStyle={disabledItemLabelStyle}
            categorySelectable={categorySelectable}
            onPress={onPressItem}
        />
    ), [
        RenderItemComponent,
        _listItemLabelStyle,
        _iconContainerStyle,
        listChildContainerStyle,
        listChildLabelStyle,
        listParentContainerStyle,
        listParentLabelStyle,
        _listItemContainerStyle,
        _tickIconContainerStyle,
        _listItemLabelStyle,
        customItemContainerStyle,
        customItemLabelStyle,
        selectedItemContainerStyle,
        selectedItemLabelStyle,
        disabledItemContainerStyle,
        disabledItemLabelStyle,
        _TickIconComponent,
        _schema,
        _value,
        categorySelectable,
        onPressItem
    ]);

    /**
     * The item separator.
     * @returns {JSX|null}
     */
    const ItemSeparatorComponent = useCallback(() => {
        if (! itemSeparator)
            return null;

        return (
            <View style={[
                Styles.itemSeparator,
                ...[itemSeparatorStyle].flat()
            ]} />
        );
    }, [itemSeparator, itemSeparatorStyle]);

    /**
     * The search placeholder.
     * @returns {string}
     */
     const _searchPlaceholder = useMemo(() => {
        if (searchPlaceholder !== null)
            return searchPlaceholder;

        return _('SEARCH_PLACEHOLDER');
    }, [searchPlaceholder, _]);

    /**
     * onChangeSearchText.
     * @param {string} text
     */
    const _onChangeSearchText = useCallback((text) => {
        setSearchText(text);
        onChangeSearchText(text);
    }, [onChangeSearchText]);

    /**
     * The close icon component.
     * @returns {JSX}
     */
    const _CloseIconComponent = useMemo(() => {
        if (listMode !== LIST_MODE.MODAL)
            return null;

        let Component;

        if (CloseIconComponent !== null)
            Component = <CloseIconComponent style={_closeIconStyle} />;
        else
            Component = <Image source={ASSETS.CLOSE} style={_closeIconStyle} />;

        return (
            <TouchableOpacity style={_closeIconContainerStyle} onPress={onPressClose}>
                {Component}
            </TouchableOpacity>
        );
    }, [listMode, CloseIconComponent, _closeIconStyle, _closeIconContainerStyle, onPressClose]);

    /**
     * The search component.
     * @returns {JSX}
     */
    const SearchComponent = useMemo(() => searchable && (
        <View style={_searchContainerStyle}>
            <TextInput
                value={searchText}
                onChangeText={_onChangeSearchText}
                style={_searchTextInputStyle}
                placeholder={_searchPlaceholder}
                placeholderTextColor={searchPlaceholderTextColor}
                {...searchTextInputProps}
            />
            {_CloseIconComponent}
        </View>
    ), [
        searchable,
        _onChangeSearchText,
        _searchContainerStyle,
        _searchTextInputStyle,
        _searchPlaceholder,
        searchPlaceholderTextColor,
        searchText,
        searchTextInputProps
    ]);

    /**
     * The dropdown component wrapper.
     * @returns {JSX}
     */
    const DropDownComponentWrapper = useCallback((Component) => (
        <View style={_dropDownContainerStyle}>
            {SearchComponent}
            {Component}
        </View>
    ), [_dropDownContainerStyle, SearchComponent]);

    /**
     * The ActivityIndicatorComponent.
     * @returns {JSX}
     */
    const _ActivityIndicatorComponent = useCallback(() => {
        let Component;

        if (ActivityIndicatorComponent)
            Component = ActivityIndicatorComponent;
        else
            Component = ActivityIndicator

        return <Component size={activityIndicatorSize} color={activityIndicatorColor} />
    }, [ActivityIndicatorComponent, activityIndicatorSize, activityIndicatorColor]);

    /**
     * The ListEmptyComponent.
     * @returns {JSX}
     */
    const _ListEmptyComponent = useCallback(() => {
        const message = _('NOTHING_TO_SHOW');

        if (ListEmptyComponent)
            return (
                <ListEmptyComponent
                    listMessageContainer={_listMessageContainerStyle}
                    listMessageTextStyle={_listMessageTextStyle}
                    ActivityIndicatorComponent={_ActivityIndicatorComponent}
                    loading={loading}
                    message={message} />
            );

        return (
            <View style={_listMessageContainerStyle}>
                {loading ? (
                    <_ActivityIndicatorComponent />
                ) : (
                    <Text style={_listMessageTextStyle}>
                        {message}
                    </Text>
                )}
            </View>
        );
    }, [
        _,
        _listMessageContainerStyle,
        _listMessageTextStyle,
        ListEmptyComponent,
        _ActivityIndicatorComponent,
        loading
    ]);
    
    /**
     * The dropdown flatlist component.
     * @returns {JSX}
     */
    const DropDownFlatListComponent = useMemo(() => (
        <FlatList
            contentContainerStyle={Styles.flatListContentContainer}
            ListEmptyComponent={_ListEmptyComponent}
            data={_items}
            renderItem={__renderListItem}
            keyExtractor={keyExtractor}
            extraData={_value}
            ItemSeparatorComponent={ItemSeparatorComponent}
            {...flatListProps}
        />
    ), [
        _items,
        _value,
        __renderListItem,
        keyExtractor,
        ItemSeparatorComponent,
        flatListProps,
        _ListEmptyComponent
    ]);

    /**
     * The dropdown scrollview component.
     * @returns {JSX}
     */
    const DropDownScrollViewComponent = useMemo(() => {
        return (
            <ScrollView nestedScrollEnabled={true} {...scrollViewProps}>
                {_items.map((item, index) => { 
                    return (
                        <Fragment key={item[_key]}>
                            {index > 0 && ItemSeparatorComponent()}
                            {__renderListItem({item})}
                        </Fragment>
                    );
                })}
                {_items.length === 0 && _ListEmptyComponent()}
            </ScrollView>
        );
    }, [renderListItem, __renderListItem, _key, scrollViewProps, _ListEmptyComponent]);

    /**
     * The dropdown modal component.
     * @returns {JSX}
     */
    const DropDownModalComponent = useMemo(() => (
        <Modal visible={open} presentationStyle="fullScreen" {...modalProps}>
                <View style={_modalContentContainerStyle}>
                    {SearchComponent}
                    {DropDownFlatListComponent}
                </View>
        </Modal>
    ), [open, SearchComponent, DropDownComponentWrapper, _modalContentContainerStyle, modalProps]);

    /**
     * The dropdown component.
     * @returns {JSX}
     */
    const DropDownComponent = useMemo(() => {
        switch (listMode) {
            case LIST_MODE.FLATLIST: return DropDownComponentWrapper(DropDownFlatListComponent);
            case LIST_MODE.SCROLLVIEW: return DropDownComponentWrapper(DropDownScrollViewComponent);
            case LIST_MODE.MODAL: return DropDownModalComponent;
            default: //
        }
    }, [
        listMode,
        DropDownFlatListComponent,
        DropDownScrollViewComponent,
        DropDownModalComponent,
        DropDownComponentWrapper
    ]);

    /**
     * The body of the dropdown component.
     * @returns {JSX}
     */
    const DropDownBodyComponent = useMemo(() => {
        if (open || listMode == LIST_MODE.MODAL)
            return DropDownComponent;
        return null;
    }, [open, listMode, DropDownComponent]);

    /**
     * onRef.
     */
    const onRef = useCallback((ref) => {
        pickerRef.current = ref
    }, []);

    /**
     * Pointer events.
     * @returns {string}
     */
    const pointerEvents = useMemo(() => disabled ? "none" : "auto", [disabled]);

    return (
        <View style={_containerStyle} {...containerProps} pointerEvents={pointerEvents}>
            <TouchableOpacity style={_style} onPress={__onPress} onLayout={__onLayout} {...props} ref={onRef}>
                {_BodyComponent}
                {_ArrowComponent}
            </TouchableOpacity>
            {DropDownBodyComponent}
        </View>
    );
}

export default memo(Picker);