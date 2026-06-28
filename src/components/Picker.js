import React, {
  Fragment,
  JSX,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  ActivityIndicator,
  BackHandler,
  Dimensions,
  Image,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import { FlatList, ScrollView } from 'react-native-gesture-handler';
import {
  ASCII_CODE,
  BADGE_COLORS,
  BADGE_DOT_COLORS,
  DROPDOWN_DIRECTION,
  GET_DROPDOWN_DIRECTION,
  GET_TRANSLATION,
  LANGUAGE,
  LIST_MODE,
  MODE,
  RTL_DIRECTION,
  RTL_STYLE,
  SCHEMA,
  TRANSLATIONS,
} from '../constants';

import Colors from '../constants/colors';
import THEMES from '../themes';
import ListEmpty from './ListEmpty';
import RenderBadgeItem from './RenderBadgeItem';
import RenderListItem from './RenderListItem';

const { height: WINDOW_HEIGHT } = Dimensions.get('window');

function Picker({
  items = [],
  setItems = () => {},
  open,
  setOpen = () => {},
  value = null,
  setValue = (callback) => {},
  activityIndicatorColor = Colors.GREY,
  ActivityIndicatorComponent = null,
  activityIndicatorSize = 30,
  addCustomItem = false,
  ArrowDownIconComponent = null,
  arrowIconContainerStyle = {},
  arrowIconStyle = {},
  ArrowUpIconComponent = null,
  autoScroll = false,
  badgeColors = BADGE_COLORS,
  badgeDotColors = BADGE_DOT_COLORS,
  badgeDotStyle = {},
  badgeProps = {},
  badgeSeparatorStyle = {},
  badgeStyle = {},
  badgeTextStyle = {},
  bottomOffset = 0,
  categorySelectable = true,
  closeAfterSelecting = true,
  CloseIconComponent = null,
  closeIconContainerStyle = {},
  closeIconStyle = {},
  closeOnBackPressed = false,
  containerProps = {},
  containerStyle = {},
  customItemContainerStyle = {},
  customItemLabelStyle = {},
  disableBorderRadius = true,
  disabled = false,
  disabledItemContainerStyle = {},
  disabledItemLabelStyle = {},
  disabledStyle = {},
  disableLocalSearch = false,
  dropDownContainerStyle = {},
  dropDownDirection = DROPDOWN_DIRECTION.DEFAULT,
  extendableBadgeContainer = false,
  flatListProps = {},
  hideSelectedItemIcon = false,
  iconContainerStyle = {},
  itemKey = null,
  itemLabelProps = {},
  itemProps = {},
  itemSeparator = false,
  itemSeparatorStyle = {},
  labelProps = {},
  labelStyle = {},
  language = LANGUAGE.DEFAULT,
  listChildContainerStyle = {},
  listChildLabelStyle = {},
  ListEmptyComponent = null,
  listItemContainerStyle = {},
  listItemLabelStyle = {},
  listMessageContainerStyle = {},
  listMessageTextStyle = {},
  listMode = LIST_MODE.DEFAULT,
  listParentContainerStyle = {},
  listParentLabelStyle = {},
  loading = false,
  max = null,
  maxHeight = 200,
  min = null,
  modalAnimationType = 'none',
  modalContentContainerStyle = {},
  modalProps = {},
  modalTitle,
  modalTitleStyle = {},
  mode = MODE.DEFAULT,
  multiple = false,
  multipleText = null,
  onChangeSearchText = (text) => {},
  onChangeValue = (value) => {},
  onClose = () => {},
  onDirectionChanged = (direction) => {},
  onLayout = (e) => {},
  onOpen = () => {},
  onPress = (open) => {},
  onSelectItem = (item) => {},
  placeholder = null,
  placeholderStyle = {},
  props = {},
  renderBadgeItem = null,
  renderListItem = null,
  rtl = false,
  schema = {},
  scrollViewProps = {},
  searchable = false,
  searchContainerStyle = {},
  searchPlaceholder = null,
  searchPlaceholderTextColor = Colors.GREY,
  searchTextInputProps = {},
  searchTextInputStyle = {},
  searchWithRegionalAccents = false,
  selectedItemContainerStyle = {},
  selectedItemLabelStyle = {},
  showArrowIcon = true,
  showBadgeDot = true,
  showTickIcon = true,
  stickyHeader = false,
  style = {},
  testID,
  textStyle = {},
  theme = THEMES.DEFAULT,
  TickIconComponent = null,
  tickIconContainerStyle = {},
  tickIconStyle = {},
  translation = {},
  zIndex = 5000,
  zIndexInverse = 6000,
}) {
  const [necessaryItems, setNecessaryItems] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [pickerHeight, setPickerHeight] = useState(0);
  const [direction, setDirection] = useState(
    GET_DROPDOWN_DIRECTION(dropDownDirection),
  );

  const badgeFlatListRef = useRef();
  const pickerRef = useRef(null);
  const initializationRef = useRef(false);
  const itemPositionsRef = useRef({});
  const flatListRef = useRef();
  const scrollViewRef = useRef();
  const memoryRef = useRef({
    items: [],
    value: null,
  });

  const THEME = useMemo(() => THEMES[theme].default, [theme]);
  const ICON = useMemo(() => THEMES[theme].ICONS, [theme]);

  /**
   * The item schema.
   * @returns {object}
   */
  const ITEM_SCHEMA = useMemo(() => ({ ...SCHEMA, ...schema }), [schema]);

  /**
   * componentDidMount.
   */
  useEffect(() => {
    if (multiple) {
      memoryRef.current.value = Array.isArray(value) ? value : [];
    } else memoryRef.current.value = value;

    // Get initial selected items
    let initialSelectedItems = [];
    const valueNotNull =
      value !== null && Array.isArray(value) && value.length !== 0;

    if (valueNotNull) {
      if (multiple) {
        initialSelectedItems = items.filter((item) =>
          value.includes(item[ITEM_SCHEMA.value]),
        );
      } else {
        initialSelectedItems = items.find(
          (item) => item[ITEM_SCHEMA.value] === value,
        );
      }
    }

    setNecessaryItems(initialSelectedItems);
  }, []);

  useEffect(() => {
    if (closeOnBackPressed && open) {
      const backAction = () => {
        setOpen(false);

        return true;
      };
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove();
    }
  }, [open]);

  /**
   * Update necessary items.
   */
  useEffect(() => {
    setNecessaryItems((state) =>
      [...state].map((item) => {
        const _item = items.find(
          (x) => x[ITEM_SCHEMA.value] === item[ITEM_SCHEMA.value],
        );

        if (_item) {
          return { ...item, ..._item };
        }

        return item;
      }),
    );
  }, [items]);

  /**
   * Sync necessary items.
   */
  useEffect(() => {
    if (multiple) {
      setNecessaryItems((state) => {
        if (value === null || (Array.isArray(value) && value.length === 0))
          return [];

        const newState = [...state].filter((item) =>
          value.includes(item[ITEM_SCHEMA.value]),
        );

        const newItems = value.reduce((accumulator, currentValue) => {
          const itemIndex = newState.findIndex(
            (item) => item[ITEM_SCHEMA.value] === currentValue,
          );

          if (itemIndex === -1) {
            const item = items.find(
              (item) => item[ITEM_SCHEMA.value] === currentValue,
            );

            if (item) {
              return [...accumulator, item];
            }

            return accumulator;
          }

          return accumulator;
        }, []);

        return [...newState, ...newItems];
      });
    } else {
      const state = [];

      if (value !== null) {
        const item = items.find((item) => item[ITEM_SCHEMA.value] === value);

        if (item) {
          state.push(item);
        }
      }

      setNecessaryItems(state);
    }

    if (initializationRef.current) {
      onChangeValue(value);
    } else {
      initializationRef.current = true;
    }
  }, [value, items]);

  /**
   * Update value in the memory.
   */
  useEffect(() => {
    memoryRef.current.value = value;
  }, [value]);

  /**
   * Update items in the memory.
   */
  useEffect(() => {
    memoryRef.current.items = necessaryItems;
  }, [necessaryItems]);

  /**
   * Automatically scroll to the first selected item.
   */
  useEffect(() => {
    if (open && autoScroll) {
      scroll();
    }
  }, [open]);

  /**
   * dropDownDirection changed.
   */
  useEffect(() => {
    setDirection(GET_DROPDOWN_DIRECTION(dropDownDirection));
  }, [dropDownDirection]);

  /**
   * mode changed.
   */
  useEffect(() => {
    if (mode === MODE.SIMPLE) badgeFlatListRef.current = null;
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
    const isOpen = !open;

    setOpen(isOpen);
    setSearchText('');

    if (isOpen) onOpen();
    else onClose();

    return isOpen;
  }, [open, setOpen, onOpen, onClose]);

  /**
   * The sorted items.
   * @returns {object}
   */
  const sortedItems = useMemo(() => {
    const sortedItems = items.filter(
      (item) =>
        item[ITEM_SCHEMA.parent] === undefined ||
        item[ITEM_SCHEMA.parent] === null,
    );
    const children = items.filter(
      (item) =>
        item[ITEM_SCHEMA.parent] !== undefined &&
        item[ITEM_SCHEMA.parent] !== null,
    );

    children.forEach((child) => {
      const index = sortedItems.findIndex(
        (item) =>
          item[ITEM_SCHEMA.parent] === child[ITEM_SCHEMA.parent] ||
          item[ITEM_SCHEMA.value] === child[ITEM_SCHEMA.parent],
      );

      if (index > -1) {
        sortedItems.splice(index + 1, 0, child);
      }
    });

    return sortedItems;
  }, [items, ITEM_SCHEMA]);

  /**
   * Scroll to the first selected item.
   */
  const scroll = useCallback(() => {
    setTimeout(() => {
      if (scrollViewRef.current || flatListRef.current) {
        const isArray = Array.isArray(memoryRef.current.value);

        if (
          memoryRef.current.value === null ||
          (isArray && memoryRef.current.value.length === 0)
        )
          return;

        const value = isArray
          ? memoryRef.current.value[0]
          : memoryRef.current.value;

        if (
          scrollViewRef.current &&
          itemPositionsRef.current.hasOwnProperty(value)
        ) {
          scrollViewRef.current?.scrollTo?.({
            x: 0,
            y: itemPositionsRef.current[value],
            animated: true,
          });
        } else {
          const index = sortedItems.findIndex(
            (item) => item[ITEM_SCHEMA.value] === value,
          );

          if (index > -1)
            flatListRef.current?.scrollToIndex?.({
              index,
              animated: true,
            });
        }
      }
    }, 200);
  }, [sortedItems]);

  /**
   * onScrollToIndexFailed.
   */
  const onScrollToIndexFailed = useCallback(({ averageItemLength, index }) => {
    flatListRef.current.scrollToOffset?.({
      offset: averageItemLength * index,
      animated: true,
    });
  }, []);

  /**
   * The indices of all parent items.
   * @returns {object}
   */
  const stickyHeaderIndices = useMemo(() => {
    const stickyHeaderIndices = [];
    if (stickyHeader) {
      const parents = sortedItems.filter(
        (item) =>
          item[ITEM_SCHEMA.parent] === undefined ||
          item[ITEM_SCHEMA.parent] === null,
      );
      parents.forEach((parent) => {
        const index = sortedItems.findIndex(
          (item) => item[ITEM_SCHEMA.value] === parent[ITEM_SCHEMA.value],
        );
        if (index > -1) stickyHeaderIndices.push(index);
      });
    }
    return stickyHeaderIndices;
  }, [stickyHeader, sortedItems]);

  /**
   * The items.
   * @returns {object}
   */
  const _items = useMemo(() => {
    if (searchText.length === 0) {
      return sortedItems;
    }
    if (disableLocalSearch) return sortedItems;

    const values = [];
    const normalizeText = (text) =>
      text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    const results = sortedItems.filter((item) => {
      const label = String(item[ITEM_SCHEMA.label]).toLowerCase();

      if (
        label.includes(searchText.toLowerCase()) ||
        (searchWithRegionalAccents &&
          normalizeText(label).includes(searchText.toLowerCase()))
      ) {
        values.push(item[ITEM_SCHEMA.value]);
        return true;
      }

      return false;
    });

    results.forEach((item, index) => {
      if (
        item[ITEM_SCHEMA.parent] === undefined ||
        item[ITEM_SCHEMA.parent] === null ||
        values.includes(item[ITEM_SCHEMA.parent])
      )
        return;

      const parent = sortedItems.find(
        (x) => x[ITEM_SCHEMA.value] === item[ITEM_SCHEMA.parent],
      );
      values.push(item[ITEM_SCHEMA.parent]);

      results.splice(index, 0, parent);
    });

    if (
      (results.length === 0 ||
        results.findIndex(
          (item) =>
            String(item[ITEM_SCHEMA.label]).toLowerCase() ===
            searchText.toLowerCase(),
        ) === -1) &&
      addCustomItem
    ) {
      results.push({
        [ITEM_SCHEMA.label]: searchText,
        [ITEM_SCHEMA.value]: searchText.replace(' ', '-'),
        custom: true,
      });
    }

    return results;
  }, [sortedItems, ITEM_SCHEMA, searchText, addCustomItem]);

  /**
   * The value.
   * @returns {string|object|null}}
   */
  const _value = useMemo(() => {
    if (multiple) {
      return value === null ? [] : [...new Set(value)];
    }

    return value;
  }, [value, multiple]);

  /**
   * Selected items only for multiple items.
   * @returns {object}
   */
  const selectedItems = useMemo(() => {
    if (!multiple) return [];

    return necessaryItems.filter((item) =>
      _value.includes(item[ITEM_SCHEMA.value]),
    );
  }, [necessaryItems, _value, ITEM_SCHEMA, multiple]);

  /**
   * The language.
   * @returns {string}
   */
  const _language = useMemo(() => {
    if (TRANSLATIONS.hasOwnProperty(language)) return language;

    return LANGUAGE.FALLBACK;
  }, [language]);

  /**
   * Get translation.
   */
  const _ = useCallback(
    (key) => GET_TRANSLATION(key, _language, translation),
    [_language, translation],
  );

  /**
   * The placeholder.
   * @returns {string}
   */
  const _placeholder = useMemo(
    () => placeholder ?? _('PLACEHOLDER'),
    [placeholder, _],
  );

  /**
   * The multiple text.
   * @returns {string}
   */
  const _multipleText = useMemo(
    () => multipleText ?? _('SELECTED_ITEMS_COUNT_TEXT'),
    [multipleText, _],
  );

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
  const isNull = useMemo(() => {
    if (_value === null || (Array.isArray(_value) && _value.length === 0))
      return true;

    return necessaryItems.length === 0;
  }, [necessaryItems, _value]);

  /**
   * Get the selected item.
   * @returns {object}
   */
  const getSelectedItem = useCallback(() => {
    if (multiple) return _value;

    if (isNull) return null;

    try {
      return necessaryItems.find((item) => item[ITEM_SCHEMA.value] === _value);
    } catch (e) {
      return null;
    }
  }, [_value, necessaryItems, isNull, multiple]);

  /**
   * Get the label of the selected item.
   * @param {string|null} fallback
   * @returns {string}
   */
  const getLabel = useCallback(
    (fallback = null) => {
      const item = getSelectedItem();

      if (multiple)
        if (item.length > 0) {
          let mtext = _multipleText;

          if (typeof mtext !== 'string') {
            mtext = mtext[item.length] ?? mtext.n;
          }

          return mtext.replace('{count}', item.length);
        } else return fallback;

      try {
        return item[ITEM_SCHEMA.label];
      } catch (e) {
        return fallback;
      }
    },
    [getSelectedItem, multiple, _multipleText, ITEM_SCHEMA],
  );

  /**
   * The label of the selected item / placeholder.
   */
  const _selectedItemLabel = useMemo(
    () => getLabel(_placeholder),
    [getLabel, _placeholder],
  );

  /**
   * The icon of the selected item.
   */
  const _selectedItemIcon = useCallback(() => {
    if (multiple) return null;

    const item = getSelectedItem();

    try {
      return item[ITEM_SCHEMA.icon] ?? null;
    } catch (e) {
      return null;
    }
  }, [getSelectedItem, multiple, ITEM_SCHEMA]);

  /**
   * onPress.
   */
  const __onPress = useCallback(async () => {
    const isOpen = !open;

    onPress(isOpen);

    if (isOpen && dropDownDirection === DROPDOWN_DIRECTION.AUTO) {
      const [, y] = await new Promise((resolve) =>
        pickerRef.current.measureInWindow((...args) => resolve(args)),
      );
      const size = y + maxHeight + pickerHeight + bottomOffset;

      const direction = size < WINDOW_HEIGHT ? 'top' : 'bottom';

      onDirectionChanged(direction);
      setDirection(direction);
    }

    onPressToggle();
  }, [
    open,
    onPressToggle,
    onPress,
    onDirectionChanged,
    maxHeight,
    pickerHeight,
    bottomOffset,
    dropDownDirection,
  ]);

  /**
   * onLayout.
   */
  const __onLayout = useCallback(
    (e) => {
      if (Platform.OS !== 'web') e.persist();

      onLayout(e);

      setPickerHeight(e.nativeEvent.layout.height);
    },
    [onLayout],
  );

  /**
   * Disable borderRadius for the picker.
   * @returns {object}
   */
  const pickerNoBorderRadius = useMemo(() => {
    if (listMode === LIST_MODE.MODAL) return null;

    if (disableBorderRadius && open) {
      return direction === 'top'
        ? {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          }
        : {
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
    if (listMode === LIST_MODE.MODAL) return null;

    if (disableBorderRadius && open) {
      return direction === 'top'
        ? {
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
          }
        : {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          };
    }
  }, [disableBorderRadius, open, direction, listMode]);

  /**
   * The disabled style.
   * @returns {object}
   */
  const _disabledStyle = useMemo(
    () => disabled && disabledStyle,
    [disabled, disabledStyle],
  );

  /**
   * The zIndex.
   * @returns {number}
   */
  const _zIndex = useMemo(() => {
    if (open) {
      return direction === 'top' ? zIndex : zIndexInverse;
    }

    return zIndex;
  }, [zIndex, zIndexInverse, direction, open]);

  /**
   * The style.
   * @returns {object}
   */
  const _style = useMemo(
    () => [
      RTL_DIRECTION(rtl, THEME.style),
      {
        zIndex: _zIndex,
      },
      ...[style].flat(),
      ...[_disabledStyle].flat(),
      pickerNoBorderRadius,
    ],
    [rtl, style, _disabledStyle, pickerNoBorderRadius, _zIndex, THEME],
  );

  /**
   * The placeholder style.
   * @returns {object}
   */
  const _placeholderStyle = useMemo(
    () => isNull && placeholderStyle,
    [isNull, placeholderStyle],
  );

  /**
   * The style of the label.
   * @returns {object}
   */
  const _labelStyle = useMemo(
    () => [
      THEME.label,
      ...[textStyle].flat(),
      ...[!isNull && labelStyle].flat(),
      ...[_placeholderStyle].flat(),
    ],
    [textStyle, _placeholderStyle, labelStyle, isNull, THEME],
  );

  /**
   * The arrow icon style.
   * @returns {object}
   */
  const _arrowIconStyle = useMemo(
    () => [THEME.arrowIcon, ...[arrowIconStyle].flat()],
    [arrowIconStyle, THEME],
  );

  /**
   * The dropdown container style.
   * @returns {object}
   */
  const _dropDownContainerStyle = useMemo(
    () => [
      THEME.dropDownContainer,
      {
        [direction]: pickerHeight - 1,
        maxHeight,
        zIndex: _zIndex,
      },
      ...[dropDownContainerStyle].flat(),
      dropDownNoBorderRadius,
    ],
    [
      direction,
      dropDownContainerStyle,
      dropDownNoBorderRadius,
      maxHeight,
      pickerHeight,
      THEME,
      _zIndex,
    ],
  );

  /**
   * The modal content container style.
   * @returns {object}
   */
  const _modalContentContainerStyle = useMemo(
    () => [THEME.modalContentContainer, ...[modalContentContainerStyle].flat()],
    [modalContentContainerStyle, THEME],
  );

  /**
   * The zIndex of the container.
   * @returns {object}
   */
  const zIndexContainer = useMemo(
    () =>
      Platform.OS !== 'android' && {
        zIndex: _zIndex,
      },
    [_zIndex],
  );

  /**
   * The container style.
   * @returns {object}
   */
  const _containerStyle = useMemo(
    () => [THEME.container, zIndexContainer, ...[containerStyle].flat()],
    [zIndexContainer, containerStyle, THEME],
  );

  /**
   * The arrow icon container style.
   * @returns {object}
   */
  const _arrowIconContainerStyle = useMemo(
    () => [
      RTL_STYLE(rtl, THEME.arrowIconContainer),
      ...[arrowIconContainerStyle].flat(),
    ],
    [rtl, arrowIconContainerStyle, THEME],
  );

  /**
   * The arrow component.
   * @returns {JSX.Element}
   */
  const _ArrowComponent = useMemo(() => {
    if (!showArrowIcon) return null;

    let Component;
    if (open && ArrowUpIconComponent !== null)
      Component = <ArrowUpIconComponent style={_arrowIconStyle} />;
    else if (!open && ArrowDownIconComponent !== null)
      Component = <ArrowDownIconComponent style={_arrowIconStyle} />;
    else
      Component = (
        <Image
          source={open ? ICON.ARROW_UP : ICON.ARROW_DOWN}
          style={_arrowIconStyle}
        />
      );

    return <View style={_arrowIconContainerStyle}>{Component}</View>;
  }, [
    showArrowIcon,
    open,
    ArrowUpIconComponent,
    ArrowDownIconComponent,
    _arrowIconStyle,
    _arrowIconContainerStyle,
    ICON,
  ]);

  /**
   * The icon container style.
   * @returns {object}
   */
  const _iconContainerStyle = useMemo(
    () => [RTL_STYLE(rtl, THEME.iconContainer), ...[iconContainerStyle].flat()],
    [rtl, iconContainerStyle, THEME],
  );

  /**
   * The selected item icon component.
   * @returns {JSX.Element|null}
   */
  const SelectedItemIconComponent = useMemo(() => {
    const Component = _selectedItemIcon();

    if (hideSelectedItemIcon) return null;

    return (
      Component !== null && (
        <View style={_iconContainerStyle}>
          <Component />
        </View>
      )
    );
  }, [_selectedItemIcon, hideSelectedItemIcon, _iconContainerStyle]);

  /**
   * The simple body component.
   * @returns {JSX.Element}
   */
  const SimpleBodyComponent = useMemo(
    () => (
      <>
        {SelectedItemIconComponent}
        <Text style={_labelStyle} {...labelProps}>
          {_selectedItemLabel}
        </Text>
      </>
    ),
    [SelectedItemIconComponent, _labelStyle, labelProps, _selectedItemLabel],
  );

  /**
   * onPress badge.
   */
  const onPressBadge = useCallback(
    (badgeValue) => {
      setValue((state) => {
        const newState = [...state];
        newState.filter((nsItem) => nsItem !== badgeValue);
        return newState;
      });
    },
    [setValue],
  );

  /**
   * The badge colors.
   * @returns {object}
   */
  const _badgeColors = useMemo(() => {
    if (typeof badgeColors === 'string') return [badgeColors];

    return badgeColors;
  }, [badgeColors]);

  /**
   * The badge dot colors.
   * @returns {object}
   */
  const _badgeDotColors = useMemo(() => {
    if (typeof badgeDotColors === 'string') return [badgeDotColors];

    return badgeDotColors;
  }, [badgeDotColors]);

  /**
   * Get badge color.
   * @param {string} str
   * @returns {string}
   */
  const getBadgeColor = useCallback(
    (str) => {
      str = `${str}`;

      const index = Math.abs(ASCII_CODE(str)) % _badgeColors.length;
      return _badgeColors[index];
    },
    [_badgeColors],
  );

  /**
   * Get badge dot color.
   * @param {string} str
   * @returns {string}
   */
  const getBadgeDotColor = useCallback(
    (str) => {
      str = `${str}`;

      const index = Math.abs(ASCII_CODE(str)) % _badgeDotColors.length;
      return _badgeDotColors[index];
    },
    [_badgeDotColors],
  );

  /**
   * The render badge component.
   * @returns {JSX.Element}
   */
  const RenderBadgeComponent = useMemo(
    () => (renderBadgeItem !== null ? renderBadgeItem : RenderBadgeItem),
    [renderBadgeItem],
  );

  /**
   * Render badge.
   * @returns {JSX.Element}
   */
  const __renderBadge = useCallback(
    ({ item }) => (
      <RenderBadgeComponent
        props={badgeProps}
        rtl={rtl}
        label={item[ITEM_SCHEMA.label]}
        value={item[ITEM_SCHEMA.value]}
        IconComponent={item[ITEM_SCHEMA.icon] ?? null}
        textStyle={textStyle}
        badgeStyle={badgeStyle}
        badgeTextStyle={badgeTextStyle}
        badgeDotStyle={badgeDotStyle}
        getBadgeColor={getBadgeColor}
        getBadgeDotColor={getBadgeDotColor}
        showBadgeDot={showBadgeDot}
        onPress={onPressBadge}
        theme={theme}
        THEME={THEME}
      />
    ),
    [
      badgeDotStyle,
      badgeStyle,
      badgeTextStyle,
      getBadgeColor,
      getBadgeDotColor,
      ITEM_SCHEMA,
      onPressBadge,
      rtl,
      showBadgeDot,
      textStyle,
      THEME,
      theme,
    ],
  );

  /**
   * The badge key.
   * @returns {string}
   */
  const _itemKey = useMemo(() => {
    if (itemKey === null) return ITEM_SCHEMA.value;

    return itemKey;
  }, [itemKey, ITEM_SCHEMA]);

  /**
   * The key extractor.
   * @returns {string}
   */
  const keyExtractor = useCallback((item) => `${item[_itemKey]}`, [_itemKey]);

  /**
   * The badge separator style.
   * @returns {object}
   */
  const _badgeSeparatorStyle = useMemo(
    () => [THEME.badgeSeparator, ...[badgeSeparatorStyle].flat()],
    [badgeSeparatorStyle, THEME],
  );

  /**
   * The badge separator component.
   * @returns {JSX.Element}
   */
  const BadgeSeparatorComponent = useCallback(
    () => <View style={_badgeSeparatorStyle} />,
    [_badgeSeparatorStyle],
  );

  /**
   * The label container style.
   * @returns {object}
   */
  const labelContainerStyle = useMemo(
    () => [
      THEME.labelContainer,
      rtl && {
        transform: [{ scaleX: -1 }],
      },
    ],
    [rtl, THEME],
  );

  /**
   * Badge list empty component.
   * @returns {JSX.Element}
   */
  const BadgeListEmptyComponent = useCallback(
    () => (
      <View style={labelContainerStyle}>
        <Text style={_labelStyle} {...labelProps}>
          {_placeholder}
        </Text>
      </View>
    ),
    [_labelStyle, labelContainerStyle, labelProps, _placeholder],
  );

  /**
   * Set ref.
   */
  const setBadgeFlatListRef = useCallback((ref) => {
    badgeFlatListRef.current = ref;
  }, []);

  /**
   * The extendable badge container style.
   * @returns {object}
   */
  const extendableBadgeContainerStyle = useMemo(
    () => [RTL_DIRECTION(rtl, THEME.extendableBadgeContainer)],
    [rtl, THEME],
  );

  /**
   * The extendable badge item container style.
   * @returns {object}
   */
  const extendableBadgeItemContainerStyle = useMemo(
    () => [
      THEME.extendableBadgeItemContainer,
      rtl && {
        marginEnd: 0,
        marginStart: THEME.extendableBadgeItemContainer.marginEnd,
      },
    ],
    [rtl, THEME],
  );

  /**
   * Extendable badge container.
   * @returns {JSX.Element}
   */
  const ExtendableBadgeContainer = useCallback(
    ({ selectedItems }) => {
      if (selectedItems.length > 0) {
        return (
          <View style={extendableBadgeContainerStyle}>
            {selectedItems.map((item, index) => (
              <View key={index} style={extendableBadgeItemContainerStyle}>
                <__renderBadge item={item} />
              </View>
            ))}
          </View>
        );
      }

      return <BadgeListEmptyComponent />;
    },
    [
      __renderBadge,
      extendableBadgeContainerStyle,
      extendableBadgeItemContainerStyle,
    ],
  );

  /**
   * The badge body component.
   * @returns {JSX.Element}
   */
  const BadgeBodyComponent = useMemo(() => {
    if (extendableBadgeContainer) {
      return <ExtendableBadgeContainer selectedItems={selectedItems} />;
    }

    return (
      <FlatList
        ref={setBadgeFlatListRef}
        data={selectedItems}
        renderItem={__renderBadge}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={BadgeSeparatorComponent}
        ListEmptyComponent={BadgeListEmptyComponent}
        style={THEME.listBody}
        contentContainerStyle={THEME.listBodyContainer}
        inverted={rtl}
      />
    );
  }, [
    rtl,
    extendableBadgeContainer,
    ExtendableBadgeContainer,
    selectedItems,
    __renderBadge,
    keyExtractor,
    BadgeSeparatorComponent,
    BadgeListEmptyComponent,
    THEME,
  ]);

  /**
   * The body component.
   */
  const _BodyComponent = useMemo(() => {
    switch (_mode) {
      case MODE.SIMPLE:
        return SimpleBodyComponent;
      case MODE.BADGE:
        return multiple ? BadgeBodyComponent : SimpleBodyComponent;
      default: //
    }
  }, [_mode, SimpleBodyComponent, BadgeBodyComponent, multiple]);

  /**
   * The list item container style.
   * @returns {object}
   */
  const _listItemContainerStyle = useMemo(
    () => [
      RTL_DIRECTION(rtl, THEME.listItemContainer),
      ...[listItemContainerStyle].flat(),
      stickyHeader && { backgroundColor: THEME.style.backgroundColor },
    ],
    [rtl, listItemContainerStyle, THEME],
  );

  /**
   * The tick icon container style.
   * @returns {object}
   */
  const _tickIconContainerStyle = useMemo(
    () => [
      RTL_STYLE(rtl, THEME.tickIconContainer),
      ...[tickIconContainerStyle].flat(),
    ],
    [rtl, tickIconContainerStyle, THEME],
  );

  /**
   * The list item label style.
   * @returns {object}
   */
  const _listItemLabelStyle = useMemo(
    () => [
      THEME.listItemLabel,
      ...[textStyle].flat(),
      ...[listItemLabelStyle].flat(),
    ],
    [textStyle, listItemLabelStyle, THEME],
  );

  /**
   * The tick icon style.
   * @returns {object}
   */
  const _tickIconStyle = useMemo(
    () => [THEME.tickIcon, ...[tickIconStyle].flat()],
    [tickIconStyle, THEME],
  );

  /**
   * The search container style.
   * @returns {object}
   */
  const _searchContainerStyle = useMemo(
    () => [
      RTL_DIRECTION(rtl, THEME.searchContainer),
      ...[searchContainerStyle].flat(),
      !searchable &&
        !modalTitle &&
        listMode === LIST_MODE.MODAL && {
          flexDirection: 'row-reverse',
        },
    ],
    [rtl, listMode, searchable, modalTitle, searchContainerStyle, THEME],
  );

  /**
   * The search text input style.
   * @returns {object}
   */
  const _searchTextInputStyle = useMemo(
    () => [textStyle, THEME.searchTextInput, ...[searchTextInputStyle].flat()],
    [textStyle, searchTextInputStyle, THEME],
  );

  /**
   * The close icon container style.
   * @returns {object}
   */
  const _closeIconContainerStyle = useMemo(
    () => [
      RTL_STYLE(rtl, THEME.closeIconContainer),
      ...[closeIconContainerStyle].flat(),
    ],
    [rtl, closeIconContainerStyle, THEME],
  );

  /**
   * The close icon style.
   * @returns {object}
   */
  const _closeIconStyle = useMemo(
    () => [THEME.closeIcon, ...[closeIconStyle].flat()],
    [closeIconStyle, THEME],
  );

  /**
   * The list message container style.
   * @returns {objects}
   */
  const _listMessageContainerStyle = useMemo(
    () => [THEME.listMessageContainer, ...[listMessageContainerStyle].flat()],
    [listMessageContainerStyle, THEME],
  );

  /**
   * The list message text style.
   * @returns {object}
   */
  const _listMessageTextStyle = useMemo(
    () => [
      THEME.listMessageText,
      ...[textStyle].flat(),
      ...[listMessageTextStyle].flat(),
    ],
    [listMessageTextStyle, THEME],
  );

  /**
   * onPress item.
   */
  const onPressItem = useCallback(
    (item, customItem = false) => {
      // if pressed item was a custom item by the user, add it to the list of items (?)
      if (customItem !== false) {
        item.custom = false;
        setItems((state) => [...state, item]);
      }

      // call onSelectItem() callback for item/s now selected after item press.
      // Not a reliable method for external value changes.
      if (multiple) {
        if (memoryRef.current.value?.includes(item[ITEM_SCHEMA.value])) {
          const index = memoryRef.current.items.findIndex(
            (x) => x[ITEM_SCHEMA.value] === item[ITEM_SCHEMA.value],
          );

          if (index > -1) {
            memoryRef.current.items.splice(index, 1);
            onSelectItem(memoryRef.current.items.slice());
          }
        } else {
          onSelectItem([...memoryRef.current.items, item]);
        }
      } else {
        onSelectItem(item);
      }

      setValue((state) => {
        // call setValue() callback to change selected value/s after item press.
        if (multiple) {
          const newState =
            state === null || state === undefined ? [] : [...state];

          if (newState.includes(item[ITEM_SCHEMA.value])) {
            // if value already included, remove it if doing so wouldn't go under min number
            if (!Number.isInteger(min) || min < newState.length) {
              newState.splice(newState.indexOf(item[ITEM_SCHEMA.value]), 1);
            }
          } else if (!Number.isInteger(max) || max > newState.length) {
            // if value not already included, add it if doing so wouldn't go above max number
            newState.push(item[ITEM_SCHEMA.value]);
          }

          return newState;
        }

        return item[ITEM_SCHEMA.value]; // single-value picker
      });

      // adjust necessary items after item press.
      // if single-item picker, set necessary items with array whose only element is the item pressed.
      // if multi-item picker, if item in necessary items remove it or if not then add it, within min/max constraints
      setNecessaryItems((state) => {
        if (multiple) {
          const newState = [...state];

          const itemIndex = newState.findIndex(
            (x) => x[ITEM_SCHEMA.value] === item[ITEM_SCHEMA.value],
          );

          if (itemIndex > -1) {
            // If pressed item already in necessary items, remove it if doing so doesn't go below min number of items
            if (!Number.isInteger(min) || min < newState.length) {
              newState.splice(itemIndex, 1);
            }
          } else if (!Number.isInteger(max) || max > newState.length) {
            // If pressed item not already in necessary items, add it if doing so doesn't go above max number of items
            newState.push(item);
          }

          return newState;
        }
        // if a single-item picker, set pressed item as array of only necessary item
        return [item];
      });

      // if picker is a single-item picker and to close after an item gets selected, close it since press selected item.
      if (closeAfterSelecting && !multiple) onPressClose();
    },
    [
      closeAfterSelecting,
      ITEM_SCHEMA,
      max,
      min,
      multiple,
      onPressClose,
      onSelectItem,
      setItems,
      setValue,
    ],
  );

  /**
   * The tick icon component.
   * @returns {JSX.Element}
   */
  const _TickIconComponent = useCallback(() => {
    if (!showTickIcon) return null;

    let Component;
    if (TickIconComponent !== null)
      Component = <TickIconComponent style={_tickIconStyle} />;
    else Component = <Image source={ICON.TICK} style={_tickIconStyle} />;

    return <View style={_tickIconContainerStyle}>{Component}</View>;
  }, [
    TickIconComponent,
    _tickIconStyle,
    _tickIconContainerStyle,
    showTickIcon,
    ICON,
  ]);

  /**
   * The renderItem component.
   * @returns {JSX.Element}
   */
  const RenderItemComponent = useMemo(
    () => (renderListItem !== null ? renderListItem : RenderListItem),
    [renderListItem],
  );

  /**
   * The selected item container style.
   * @returns {object}
   */
  const _selectedItemContainerStyle = useMemo(
    () => [THEME.selectedItemContainer, selectedItemContainerStyle],
    [THEME, selectedItemContainerStyle],
  );

  /**
   * The selected item label style.
   * @returns {object}
   */
  const _selectedItemLabelStyle = useMemo(
    () => [THEME.selectedItemLabel, selectedItemLabelStyle],
    [THEME, selectedItemLabelStyle],
  );

  /**
   * The disabled item container style.
   * @returns {object}
   */
  const _disabledItemContainerStyle = useMemo(
    () => [THEME.disabledItemContainer, disabledItemContainerStyle],
    [THEME, disabledItemContainerStyle],
  );

  /**
   * The disabled item label style.
   * @returns {object}
   */
  const _disabledItemLabelStyle = useMemo(
    () => [THEME.disabledItemContainer, disabledItemLabelStyle],
    [THEME, disabledItemLabelStyle],
  );

  /**
   * Render list item.
   * @returns {JSX.Element}
   */
  const __renderListItem = useCallback(
    ({ item }) => {
      let IconComponent = item[ITEM_SCHEMA.icon] ?? null;

      if (IconComponent) {
        IconComponent = (
          <View style={_iconContainerStyle}>
            <IconComponent />
          </View>
        );
      }

      let isSelected;
      if (multiple) {
        isSelected = _value.includes(item[ITEM_SCHEMA.value]);
      } else {
        isSelected = _value === item[ITEM_SCHEMA.value];
      }

      return (
        <RenderItemComponent
          rtl={rtl}
          item={item}
          label={item[ITEM_SCHEMA.label]}
          value={item[ITEM_SCHEMA.value]}
          parent={item?.[ITEM_SCHEMA.parent] ?? null}
          selectable={item?.[ITEM_SCHEMA.selectable] ?? null}
          disabled={item?.[ITEM_SCHEMA.disabled] ?? false}
          custom={item.custom ?? false}
          props={itemProps}
          labelProps={itemLabelProps}
          isSelected={isSelected}
          IconComponent={IconComponent}
          TickIconComponent={_TickIconComponent}
          listItemContainerStyle={_listItemContainerStyle}
          listItemLabelStyle={_listItemLabelStyle}
          listChildContainerStyle={listChildContainerStyle}
          listChildLabelStyle={listChildLabelStyle}
          listParentContainerStyle={listParentContainerStyle}
          listParentLabelStyle={listParentLabelStyle}
          customItemContainerStyle={customItemContainerStyle}
          customItemLabelStyle={customItemLabelStyle}
          selectedItemContainerStyle={_selectedItemContainerStyle}
          selectedItemLabelStyle={_selectedItemLabelStyle}
          disabledItemContainerStyle={_disabledItemContainerStyle}
          disabledItemLabelStyle={_disabledItemLabelStyle}
          labelStyle={item?.[ITEM_SCHEMA.labelStyle] ?? {}}
          containerStyle={item?.[ITEM_SCHEMA.containerStyle] ?? {}}
          categorySelectable={categorySelectable}
          onPress={onPressItem}
          setPosition={setItemPosition}
          theme={theme}
          THEME={THEME}
        />
      );
    },
    [
      categorySelectable,
      customItemContainerStyle,
      customItemLabelStyle,
      itemLabelProps,
      itemProps,
      ITEM_SCHEMA,
      listChildContainerStyle,
      listChildLabelStyle,
      listParentContainerStyle,
      listParentLabelStyle,
      multiple,
      onPressItem,
      RenderItemComponent,
      rtl,
      theme,
      THEME,
      _disabledItemContainerStyle,
      _disabledItemLabelStyle,
      _iconContainerStyle,
      _listItemContainerStyle,
      _listItemLabelStyle,
      _selectedItemContainerStyle,
      _selectedItemLabelStyle,
      _TickIconComponent,
      _value,
    ],
  );

  /**
   * Set item position.
   * @param {string|number|boolean} value
   * @param {number} y
   */
  const setItemPosition = useCallback((value, y) => {
    if (autoScroll && listMode === LIST_MODE.SCROLLVIEW)
      itemPositionsRef.current[value] = y;
  }, []);

  /**
   * The item separator.
   * @returns {JSX.Element|null}
   */
  const ItemSeparatorComponent = useCallback(() => {
    if (!itemSeparator) return null;

    return (
      <View style={[THEME.itemSeparator, ...[itemSeparatorStyle].flat()]} />
    );
  }, [itemSeparator, itemSeparatorStyle, THEME]);

  /**
   * The search placeholder.
   * @returns {string}
   */
  const _searchPlaceholder = useMemo(() => {
    if (searchPlaceholder !== null) return searchPlaceholder;

    return _('SEARCH_PLACEHOLDER');
  }, [searchPlaceholder, _]);

  /**
   * onChangeSearchText.
   * @param {string} text
   */
  const _onChangeSearchText = useCallback(
    (text) => {
      setSearchText(text);
      onChangeSearchText(text);
    },
    [onChangeSearchText],
  );

  /**
   * The close icon component.
   * @returns {JSX.Element}
   */
  const _CloseIconComponent = useMemo(() => {
    if (listMode !== LIST_MODE.MODAL) return null;

    let Component;

    if (CloseIconComponent !== null)
      Component = <CloseIconComponent style={_closeIconStyle} />;
    else Component = <Image source={ICON.CLOSE} style={_closeIconStyle} />;

    return (
      <TouchableOpacity style={_closeIconContainerStyle} onPress={onPressClose}>
        {Component}
      </TouchableOpacity>
    );
  }, [
    listMode,
    CloseIconComponent,
    _closeIconStyle,
    _closeIconContainerStyle,
    onPressClose,
    ICON,
  ]);

  /**
   * Indicates if the search component is visible.
   * @returns {boolean}
   */
  const isSearchComponentVisible = useMemo(() => {
    if (listMode === LIST_MODE.MODAL) return true;

    return searchable;
  }, [listMode, searchable]);

  /**
   * modalTitleStyle.
   * @returns {object}
   */
  const _modalTitleStyle = useMemo(
    () => [
      THEME.modalTitle,
      ...[modalTitleStyle].flat(),
      ...[textStyle].flat(),
    ],
    [textStyle, modalTitleStyle, THEME],
  );

  /**
   * The search component.
   * @returns {JSX.Element}
   */
  const SearchComponent = useMemo(
    () =>
      isSearchComponentVisible && (
        <View style={_searchContainerStyle}>
          {searchable ? (
            <TextInput
              value={searchText}
              onChangeText={_onChangeSearchText}
              style={_searchTextInputStyle}
              placeholder={_searchPlaceholder}
              placeholderTextColor={searchPlaceholderTextColor}
              {...searchTextInputProps}
            />
          ) : (
            listMode === LIST_MODE.MODAL && (
              <View style={styles.flex}>
                <Text style={_modalTitleStyle}>{modalTitle}</Text>
              </View>
            )
          )}
          {_CloseIconComponent}
        </View>
      ),
    [
      isSearchComponentVisible,
      listMode,
      modalTitle,
      searchable,
      searchPlaceholderTextColor,
      searchText,
      searchTextInputProps,
      _modalTitleStyle,
      _onChangeSearchText,
      _searchContainerStyle,
      _searchPlaceholder,
      _searchTextInputStyle,
    ],
  );

  /**
   * The dropdown component wrapper.
   * @returns {JSX.Element}
   */
  const DropDownComponentWrapper = useCallback(
    (Component) => (
      <View style={_dropDownContainerStyle}>
        {SearchComponent}
        {Component}
      </View>
    ),
    [_dropDownContainerStyle, SearchComponent],
  );

  /**
   * The ActivityIndicatorComponent.
   * @returns {JSX.Element}
   */
  const _ActivityIndicatorComponent = useCallback(() => {
    let Component;

    if (ActivityIndicatorComponent !== null)
      Component = ActivityIndicatorComponent;
    else Component = ActivityIndicator;

    return (
      <Component size={activityIndicatorSize} color={activityIndicatorColor} />
    );
  }, [
    ActivityIndicatorComponent,
    activityIndicatorSize,
    activityIndicatorColor,
  ]);

  /**
   * The ListEmptyComponent.
   * @returns {JSX.Element}
   */
  const _ListEmptyComponent = useCallback(() => {
    let Component;
    const message = _('NOTHING_TO_SHOW');

    if (ListEmptyComponent !== null) Component = ListEmptyComponent;
    else Component = ListEmpty;

    return (
      <Component
        listMessageContainerStyle={_listMessageContainerStyle}
        listMessageTextStyle={_listMessageTextStyle}
        ActivityIndicatorComponent={_ActivityIndicatorComponent}
        loading={loading}
        message={message}
      />
    );
  }, [
    _,
    _listMessageContainerStyle,
    _listMessageTextStyle,
    ListEmptyComponent,
    _ActivityIndicatorComponent,
    loading,
  ]);

  /**
   * onRequestCloseModal.
   */
  const onRequestCloseModal = useCallback(() => {
    setOpen(false);
  }, []);

  /**
   * The dropdown flatlist component.
   * @returns {JSX.Element}
   */
  const DropDownFlatListComponent = useMemo(
    () => (
      <FlatList
        ref={flatListRef}
        style={styles.flex}
        contentContainerStyle={THEME.flatListContentContainer}
        ListEmptyComponent={_ListEmptyComponent}
        data={_items}
        renderItem={__renderListItem}
        keyExtractor={keyExtractor}
        extraData={_value}
        ItemSeparatorComponent={ItemSeparatorComponent}
        stickyHeaderIndices={stickyHeaderIndices}
        onScrollToIndexFailed={onScrollToIndexFailed}
        {...flatListProps}
      />
    ),
    [
      flatListProps,
      ItemSeparatorComponent,
      keyExtractor,
      THEME,
      _items,
      _ListEmptyComponent,
      _value,
      __renderListItem,
    ],
  );

  /**
   * The dropdown scrollview component.
   * @returns {JSX.Element}
   */
  const DropDownScrollViewComponent = useMemo(
    () => (
      <ScrollView
        ref={scrollViewRef}
        nestedScrollEnabled
        stickyHeaderIndices={stickyHeaderIndices}
        {...scrollViewProps}>
        {_items.map((item, index) => (
          <Fragment key={item[_itemKey]}>
            {index > 0 && ItemSeparatorComponent()}
            {__renderListItem({ item })}
          </Fragment>
        ))}
        {_items.length === 0 && _ListEmptyComponent()}
      </ScrollView>
    ),
    [__renderListItem, _itemKey, scrollViewProps, _ListEmptyComponent],
  );

  /**
   * The dropdown modal component.
   * @returns {JSX.Element}
   */
  const DropDownModalComponent = useMemo(
    () => (
      <Modal
        animationType={modalAnimationType}
        visible={open}
        presentationStyle='fullScreen'
        onRequestClose={onRequestCloseModal}
        {...modalProps}>
        <SafeAreaView style={_modalContentContainerStyle}>
          {SearchComponent}
          {DropDownFlatListComponent}
        </SafeAreaView>
      </Modal>
    ),
    [open, SearchComponent, _modalContentContainerStyle, modalProps],
  );

  /**
   * The dropdown component.
   * @returns {JSX.Element}
   */
  const DropDownComponent = useMemo(() => {
    switch (listMode) {
      case LIST_MODE.FLATLIST:
        return DropDownComponentWrapper(DropDownFlatListComponent);
      case LIST_MODE.SCROLLVIEW:
        return DropDownComponentWrapper(DropDownScrollViewComponent);
      case LIST_MODE.MODAL:
        return DropDownModalComponent;
      default: //
    }
  }, [
    listMode,
    DropDownFlatListComponent,
    DropDownScrollViewComponent,
    DropDownModalComponent,
    DropDownComponentWrapper,
  ]);

  /**
   * The body of the dropdown component.
   * @returns {JSX.Element}
   */
  const DropDownBodyComponent = useMemo(() => {
    if (open || listMode === LIST_MODE.MODAL) return DropDownComponent;
    return null;
  }, [open, listMode, DropDownComponent]);

  /**
   * onRef.
   */
  const onRef = useCallback((ref) => {
    pickerRef.current = ref;
  }, []);

  /**
   * Pointer events.
   * @returns {string}
   */
  const pointerEvents = useMemo(() => (disabled ? 'none' : 'auto'), [disabled]);

  return (
    <View style={_containerStyle} {...containerProps}>
      <TouchableOpacity
        style={_style}
        onPress={__onPress}
        onLayout={__onLayout}
        {...props}
        ref={onRef}
        pointerEvents={pointerEvents}
        disabled={disabled}
        testID={testID}>
        {_BodyComponent}
        {_ArrowComponent}
      </TouchableOpacity>

      {DropDownBodyComponent}
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});

export default memo(Picker);
