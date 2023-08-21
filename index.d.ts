declare module 'react-native-dropdown-picker' {
  import React, { PropsWithoutRef, ReactElement } from 'react';
  import {
    FlatListProps,
    LayoutChangeEvent,
    ModalProps,
    ScrollViewProps,
    StyleProp,
    TextInputProps,
    TextProps,
    TextStyle,
    TouchableOpacityProps,
    ViewProps,
    ViewStyle,
  } from 'react-native';

  export type ValueType = string | number | boolean;

  export type ItemType<T extends ValueType> = {
    label?: string;
    value?: T;
    icon?: () => React.JSX.Element;
    parent?: T;
    selectable?: boolean;
    disabled?: boolean;
    testID?: string;
    containerStyle?: StyleProp<ViewStyle>;
    labelStyle?: StyleProp<TextStyle>;
  };

  export type ModeType = 'DEFAULT' | 'SIMPLE' | 'BADGE';

  export interface ModeInterface {
    DEFAULT: string;
    SIMPLE: string;
    BADGE: string;
  }

  export type ListModeType = 'DEFAULT' | 'FLATLIST' | 'SCROLLVIEW' | 'MODAL';

  export interface ListModeInterface {
    DEFAULT: string;
    FLATLIST: string;
    SCROLLVIEW: string;
    MODAL: string;
  }

  export interface SchemaInterface {
    label: string;
    value: string;
    icon: string;
    parent: string;
    selectable: string;
    disabled: string;
    testID: string;
    containerStyle: string;
    labelStyle: string;
  }

  export type LanguageType =
    | 'DEFAULT'
    | 'FALLBACK'
    | 'EN'
    | 'AR'
    | 'FA'
    | 'TR'
    | 'RU'
    | 'ES'
    | 'ID'
    | 'IT'
    | 'PT'
    | 'FR';

  export interface TranslationInterface {
    PLACEHOLDER: string;
    SEARCH_PLACEHOLDER: string;
    SELECTED_ITEMS_COUNT_TEXT:
      | string
      | {
          [key in number | 'n']: string;
        };
    NOTHING_TO_SHOW: string;
  }

  export type DropDownDirectionType = 'DEFAULT' | 'TOP' | 'BOTTOM' | 'AUTO';
  export type ThemeNameType = 'DEFAULT' | 'LIGHT' | 'DARK';
  export type ThemeType = object;

  export interface RenderBadgeItemPropsInterface<T extends ValueType> {
    label: string;
    value: T;
    props: TouchableOpacityProps;
    IconComponent: () => React.JSX.Element;
    textStyle: StyleProp<TextStyle>;
    badgeStyle: StyleProp<ViewStyle>;
    badgeTextStyle: StyleProp<TextStyle>;
    badgeDotStyle: StyleProp<ViewStyle>;
    getBadgeColor: (value: string) => string;
    getBadgeDotColor: (value: string) => string;
    showBadgeDot: boolean;
    onPress: (value: T) => void;
    rtl: boolean;
    THEME: ThemeType;
  }

  export interface RenderListItemPropsInterface<T extends ValueType> {
    rtl: boolean;
    item: ItemType<T>;
    label: string;
    value: T;
    parent: T;
    selectable: boolean;
    disabled: boolean;
    props: ViewProps;
    custom: boolean;
    isSelected: boolean;
    IconComponent: () => React.JSX.Element;
    TickIconComponent: () => React.JSX.Element;
    listItemContainerStyle: StyleProp<ViewStyle>;
    listItemLabelStyle: StyleProp<TextStyle>;
    listChildContainerStyle: StyleProp<ViewStyle>;
    listParentContainerStyle: StyleProp<ViewStyle>;
    listChildLabelStyle: StyleProp<TextStyle>;
    listParentLabelStyle: StyleProp<TextStyle>;
    customItemContainerStyle: StyleProp<ViewStyle>;
    customItemLabelStyle: StyleProp<TextStyle>;
    selectedItemContainerStyle: StyleProp<ViewStyle>;
    selectedItemLabelStyle: StyleProp<TextStyle>;
    disabledItemContainerStyle: StyleProp<ViewStyle>;
    disabledItemLabelStyle: StyleProp<TextStyle>;
    containerStyle: StyleProp<ViewStyle>;
    labelStyle: StyleProp<TextStyle>;
    categorySelectable: boolean;
    onPress: (value: T) => void;
    setPosition: (value: T, y: number) => void;
    theme: ThemeNameType;
    THEME: ThemeType;
  }

  export interface ActivityIndicatorComponentPropsInterface {
    size: number;
    color: string;
  }

  export interface ListEmptyComponentPropsInterface {
    listMessageContainer: StyleProp<ViewStyle>;
    listMessageTextStyle: StyleProp<TextStyle>;
    ActivityIndicatorComponent: (
      props: ActivityIndicatorComponentPropsInterface,
    ) => React.JSX.Element;
    loading: boolean;
    message: string;
  }

  export interface DropDownPickerBaseProps<T extends ValueType> {
    items: Array<ItemType<T>>;
    open: boolean;
    placeholder?: string;
    closeAfterSelecting?: boolean;
    labelProps?: TextProps;
    disabled?: boolean;
    disabledStyle?: StyleProp<ViewStyle>;
    placeholderStyle?: StyleProp<TextStyle>;
    containerStyle?: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    labelStyle?: StyleProp<TextStyle>;
    arrowIconStyle?: StyleProp<ViewStyle>;
    tickIconStyle?: StyleProp<ViewStyle>;
    closeIconStyle?: StyleProp<ViewStyle>;
    badgeStyle?: StyleProp<ViewStyle>;
    badgeTextStyle?: StyleProp<TextStyle>;
    badgeDotStyle?: StyleProp<ViewStyle>;
    iconContainerStyle?: StyleProp<ViewStyle>;
    searchContainerStyle?: StyleProp<ViewStyle>;
    searchTextInputStyle?: StyleProp<TextStyle>;
    searchPlaceholderTextColor?: string;
    searchWithRegionalAccents?: boolean;
    dropDownContainerStyle?: StyleProp<ViewStyle>;
    modalContentContainerStyle?: StyleProp<ViewStyle>;
    modalAnimationType?: 'none' | 'slide' | 'fade';
    arrowIconContainerStyle?: StyleProp<ViewStyle>;
    closeIconContainerStyle?: StyleProp<ViewStyle>;
    tickIconContainerStyle?: StyleProp<ViewStyle>;
    listItemContainerStyle?: StyleProp<ViewStyle>;
    listItemLabelStyle?: StyleProp<TextStyle>;
    listChildContainerStyle?: StyleProp<ViewStyle>;
    listChildLabelStyle?: StyleProp<TextStyle>;
    listParentContainerStyle?: StyleProp<ViewStyle>;
    listParentLabelStyle?: StyleProp<TextStyle>;
    selectedItemContainerStyle?: StyleProp<ViewStyle>;
    selectedItemLabelStyle?: StyleProp<TextStyle>;
    disabledItemContainerStyle?: StyleProp<ViewStyle>;
    disabledItemLabelStyle?: StyleProp<TextStyle>;
    customItemContainerStyle?: StyleProp<ViewStyle>;
    customItemLabelStyle?: StyleProp<TextStyle>;
    listMessageContainerStyle?: StyleProp<ViewStyle>;
    listMessageTextStyle?: StyleProp<TextStyle>;
    itemSeparatorStyle?: StyleProp<ViewStyle>;
    badgeSeparatorStyle?: StyleProp<ViewStyle>;
    listMode?: ListModeType;
    categorySelectable?: boolean;
    searchable?: boolean;
    searchPlaceholder?: string;
    schema?: Partial<SchemaInterface>;
    language?: LanguageType;
    translation?: Partial<TranslationInterface>;
    multipleText?: string;
    mode?: ModeType;
    itemKey?: string;
    maxHeight?: number;
    renderBadgeItem?: (
      props: RenderBadgeItemPropsInterface<T>,
    ) => React.JSX.Element;
    renderListItem?: (
      props: RenderListItemPropsInterface<T>,
    ) => React.JSX.Element;
    itemSeparator?: boolean;
    bottomOffset?: number;
    badgeColors?: Array<string> | string;
    badgeDotColors?: Array<string> | string;
    showArrowIcon?: boolean;
    showBadgeDot?: boolean;
    showTickIcon?: boolean;
    stickyHeader?: boolean;
    autoScroll?: boolean;
    ArrowUpIconComponent?: (props: {
      style: StyleProp<ViewStyle>;
    }) => React.JSX.Element;
    ArrowDownIconComponent?: (props: {
      style: StyleProp<ViewStyle>;
    }) => React.JSX.Element;
    TickIconComponent?: (props: {
      style: StyleProp<ViewStyle>;
    }) => React.JSX.Element;
    CloseIconComponent?: (props: {
      style: StyleProp<ViewStyle>;
    }) => React.JSX.Element;
    ListEmptyComponent?: (
      props: ListEmptyComponentPropsInterface,
    ) => React.JSX.Element;
    ActivityIndicatorComponent?: (
      props: ActivityIndicatorComponentPropsInterface,
    ) => React.JSX.Element;
    activityIndicatorSize?: number;
    activityIndicatorColor?: string;
    props?: TouchableOpacityProps;
    itemProps?: TouchableOpacityProps;
    badgeProps?: TouchableOpacityProps;
    modalProps?: ModalProps;
    flatListProps?: Partial<FlatListProps<ItemType<T>>>;
    scrollViewProps?: ScrollViewProps;
    searchTextInputProps?: TextInputProps;
    modalTitle?: string;
    modalTitleStyle?: StyleProp<TextStyle>;
    loading?: boolean;
    min?: number;
    max?: number;
    addCustomItem?: boolean;
    /**
     * Leave the types of setOpen, setItems, and setValue how they are.
     * This lets both class components and functional components use this library.
     * See this issue: https://github.com/hossein-zare/react-native-dropdown-picker/issues/641
     * Class components can't use types like "Dispatch<SetStateValue<type>>"
     * Both functional and class components can use types like "(newValue: type) => void"
     */
    setOpen: (open: boolean) => void;
    setItems?: (items: Array<ItemType<T>>) => void;
    disableBorderRadius?: boolean;
    containerProps?: ViewProps;
    onLayout?: (e: LayoutChangeEvent) => void;
    onPress?: (open: boolean) => void;
    onOpen?: () => void;
    onClose?: () => void;
    onChangeSearchText?: (text: string) => void;
    onDirectionChanged?: (direction: DropDownDirectionType) => void;
    zIndex?: number;
    zIndexInverse?: number;
    disableLocalSearch?: boolean;
    dropDownDirection?: DropDownDirectionType;
    theme?: ThemeNameType;
    rtl?: boolean;
    testID?: string;
    closeOnBackPressed?: boolean;
    hideSelectedItemIcon?: boolean;
    extendableBadgeContainer?: boolean;
  }

  interface DropDownPickerSingleProps<T extends ValueType> {
    multiple?: false;
    onChangeValue?: (value: T | null) => void;
    onSelectItem?: (item: ItemType<T>) => void;
    setValue: (value: ItemType<T> | null) => void;
    value: T | null;
  }

  interface DropDownPickerMultipleProps<T extends ValueType> {
    multiple: true;
    onChangeValue?: (value: Array<T> | null) => void;
    onSelectItem?: (items: Array<ItemType<T>>) => void;
    setValue: (value: Array<ItemType<T>> | null) => void;
    value: Array<T> | null;
  }

  interface DropDownPickerInterface {
    MODE: ModeInterface;
    LIST_MODE: ListModeInterface;
    DROPDOWN_DIRECTION: DropDownDirectionType;
    SCHEMA: SchemaInterface;
    LANGUAGE: LanguageType;
    THEMES: ThemeNameType;
    setMode: (mode: string) => void;
    setListMode: (mode: string) => void;
    setDropDownDirection: (direction: DropDownDirectionType) => void;
    setTheme: (name: string) => void;
    addTheme: (name: string, theme: ThemeNameType) => void;
    setLanguage: (language: string) => void;
    addTranslation: (
      language: string,
      translation: TranslationInterface,
    ) => void;
    modifyTranslation: (
      language: string,
      translation: TranslationInterface,
    ) => void;
  }

  export type DropDownPickerProps<T extends ValueType> = (
    | DropDownPickerSingleProps<T>
    | DropDownPickerMultipleProps<T>
  ) &
    DropDownPickerBaseProps<T>;

  const DropDownPicker: (<T extends ValueType>(
    props: PropsWithoutRef<DropDownPickerProps<T>>,
  ) => ReactElement) &
    DropDownPickerInterface;

  export default DropDownPicker;
}
