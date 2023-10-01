declare module 'react-native-dropdown-picker' {
  import {
    Dispatch,
    JSX,
    PropsWithoutRef,
    ReactElement,
    SetStateAction,
  } from 'react';
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

  export interface ItemType<T extends ValueType> {
    containerStyle?: StyleProp<ViewStyle>;
    disabled?: boolean;
    icon?: () => JSX.Element;
    label?: string;
    labelStyle?: StyleProp<TextStyle>;
    parent?: T;
    selectable?: boolean;
    testID?: string;
    value?: T;
  }

  export type ModeType = 'DEFAULT' | 'SIMPLE' | 'BADGE';

  export interface ModeInterface {
    BADGE: string;
    DEFAULT: string;
    SIMPLE: string;
  }

  export type ListModeType = 'DEFAULT' | 'FLATLIST' | 'SCROLLVIEW' | 'MODAL';

  export interface ListModeInterface {
    DEFAULT: string;
    FLATLIST: string;
    MODAL: string;
    SCROLLVIEW: string;
  }

  export interface SchemaInterface {
    containerStyle: string;
    disabled: string;
    icon: string;
    label: string;
    labelStyle: string;
    parent: string;
    selectable: string;
    testID: string;
    value: string;
  }

  export type LanguageType =
    | 'DEFAULT'
    | 'FALLBACK'
    | 'AR'
    | 'EN'
    | 'ES'
    | 'FA'
    | 'FR'
    | 'ID'
    | 'IT'
    | 'KO'
    | 'PT'
    | 'RU'
    | 'TR';

  export interface TranslationInterface {
    NOTHING_TO_SHOW: string;
    PLACEHOLDER: string;
    SEARCH_PLACEHOLDER: string;
    SELECTED_ITEMS_COUNT_TEXT: string | { [key in number | 'n']: string };
  }

  export type ThemeNameType = 'DEFAULT' | 'LIGHT' | 'DARK';
  export type ThemeType = object; // TODO: specify ThemeType further: currently any object

  export interface RenderBadgeItemPropsInterface<T extends ValueType> {
    badgeDotStyle: StyleProp<ViewStyle>;
    badgeStyle: StyleProp<ViewStyle>;
    badgeTextStyle: StyleProp<TextStyle>;
    getBadgeColor: (value: string) => string;
    getBadgeDotColor: (value: string) => string;
    IconComponent: () => JSX.Element;
    label: string;
    onPress: (value: T) => void;
    props: TouchableOpacityProps;
    rtl: boolean;
    showBadgeDot: boolean;
    textStyle: StyleProp<TextStyle>;
    THEME: ThemeType;
    value: T;
  }

  export interface RenderListItemPropsInterface<T extends ValueType> {
    categorySelectable: boolean;
    containerStyle: StyleProp<ViewStyle>;
    custom: boolean;
    customItemContainerStyle: StyleProp<ViewStyle>;
    customItemLabelStyle: StyleProp<TextStyle>;
    disabled: boolean;
    disabledItemContainerStyle: StyleProp<ViewStyle>;
    disabledItemLabelStyle: StyleProp<TextStyle>;
    IconComponent: () => JSX.Element;
    isSelected: boolean;
    item: ItemType<T>;
    label: string;
    labelStyle: StyleProp<TextStyle>;
    listChildContainerStyle: StyleProp<ViewStyle>;
    listChildLabelStyle: StyleProp<TextStyle>;
    listItemContainerStyle: StyleProp<ViewStyle>;
    listItemLabelStyle: StyleProp<TextStyle>;
    listParentContainerStyle: StyleProp<ViewStyle>;
    listParentLabelStyle: StyleProp<TextStyle>;
    onPress: (value: T) => void;
    parent: T;
    props: ViewProps;
    rtl: boolean;
    selectable: boolean;
    selectedItemContainerStyle: StyleProp<ViewStyle>;
    selectedItemLabelStyle: StyleProp<TextStyle>;
    setPosition: (value: T, y: number) => void;
    theme: ThemeNameType;
    THEME: ThemeType;
    TickIconComponent: () => JSX.Element;
    value: T;
  }

  export interface ActivityIndicatorComponentPropsInterface {
    color: string;
    size: number;
  }

  export interface ListEmptyComponentPropsInterface {
    ActivityIndicatorComponent: (
      props: ActivityIndicatorComponentPropsInterface,
    ) => JSX.Element;
    listMessageContainer: StyleProp<ViewStyle>;
    listMessageTextStyle: StyleProp<TextStyle>;
    loading: boolean;
    message: string;
  }

  export type DropDownDirectionType = 'DEFAULT' | 'TOP' | 'BOTTOM' | 'AUTO';

  export interface DropDownPickerBaseProps<T extends ValueType> {
    items: Array<ItemType<T>>;
    setItems?: Dispatch<SetStateAction<Array<ItemType<T>>>>;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    activityIndicatorColor?: string;
    ActivityIndicatorComponent?: (
      props: ActivityIndicatorComponentPropsInterface,
    ) => JSX.Element;
    activityIndicatorSize?: number;
    addCustomItem?: boolean;
    ArrowDownIconComponent?: (props: {
      style: StyleProp<ViewStyle>;
    }) => JSX.Element;
    arrowIconContainerStyle?: StyleProp<ViewStyle>;
    arrowIconStyle?: StyleProp<ViewStyle>;
    ArrowUpIconComponent?: (props: {
      style: StyleProp<ViewStyle>;
    }) => JSX.Element;
    autoScroll?: boolean;
    badgeColors?: Array<string> | string;
    badgeDotColors?: Array<string> | string;
    badgeDotStyle?: StyleProp<ViewStyle>;
    badgeProps?: TouchableOpacityProps;
    badgeSeparatorStyle?: StyleProp<ViewStyle>;
    badgeStyle?: StyleProp<ViewStyle>;
    badgeTextStyle?: StyleProp<TextStyle>;
    bottomOffset?: number;
    categorySelectable?: boolean;
    closeAfterSelecting?: boolean;
    CloseIconComponent?: (props: {
      style: StyleProp<ViewStyle>;
    }) => JSX.Element;
    closeIconContainerStyle?: StyleProp<ViewStyle>;
    closeIconStyle?: StyleProp<ViewStyle>;
    closeOnBackPressed?: boolean;
    containerProps?: ViewProps;
    containerStyle?: StyleProp<ViewStyle>;
    customItemContainerStyle?: StyleProp<ViewStyle>;
    customItemLabelStyle?: StyleProp<TextStyle>;
    disableBorderRadius?: boolean;
    disabledItemContainerStyle?: StyleProp<ViewStyle>;
    disabledItemLabelStyle?: StyleProp<TextStyle>;
    disabled?: boolean;
    disabledStyle?: StyleProp<ViewStyle>;
    disableLocalSearch?: boolean;
    dropDownContainerStyle?: StyleProp<ViewStyle>;
    dropDownDirection?: DropDownDirectionType;
    extendableBadgeContainer?: boolean;
    flatListProps?: Partial<FlatListProps<ItemType<T>>>;
    hideSelectedItemIcon?: boolean;
    iconContainerStyle?: StyleProp<ViewStyle>;
    itemKey?: string;
    itemProps?: TouchableOpacityProps;
    itemSeparator?: boolean;
    itemSeparatorStyle?: StyleProp<ViewStyle>;
    labelProps?: TextProps;
    labelStyle?: StyleProp<TextStyle>;
    language?: LanguageType;
    listChildContainerStyle?: StyleProp<ViewStyle>;
    listChildLabelStyle?: StyleProp<TextStyle>;
    ListEmptyComponent?: (
      props: ListEmptyComponentPropsInterface,
    ) => JSX.Element;
    listItemContainerStyle?: StyleProp<ViewStyle>;
    listItemLabelStyle?: StyleProp<TextStyle>;
    listMessageContainerStyle?: StyleProp<ViewStyle>;
    listMessageTextStyle?: StyleProp<TextStyle>;
    listMode?: ListModeType;
    listParentContainerStyle?: StyleProp<ViewStyle>;
    listParentLabelStyle?: StyleProp<TextStyle>;
    loading?: boolean;
    maxHeight?: number;
    max?: number;
    min?: number;
    modalAnimationType?: 'none' | 'slide' | 'fade';
    modalContentContainerStyle?: StyleProp<ViewStyle>;
    modalProps?: ModalProps;
    modalTitle?: string;
    modalTitleStyle?: StyleProp<TextStyle>;
    mode?: ModeType;
    multipleText?: string;
    onChangeSearchText?: (text: string) => void;
    onClose?: () => void;
    onDirectionChanged?: (direction: DropDownDirectionType) => void;
    onLayout?: (e: LayoutChangeEvent) => void;
    onOpen?: () => void;
    onPress?: (open: boolean) => void;
    placeholder?: string;
    placeholderStyle?: StyleProp<TextStyle>;
    props?: TouchableOpacityProps;
    renderBadgeItem?: (props: RenderBadgeItemPropsInterface<T>) => JSX.Element;
    renderListItem?: (props: RenderListItemPropsInterface<T>) => JSX.Element;
    rtl?: boolean;
    schema?: Partial<SchemaInterface>;
    scrollViewProps?: ScrollViewProps;
    searchable?: boolean;
    searchContainerStyle?: StyleProp<ViewStyle>;
    searchPlaceholder?: string;
    searchPlaceholderTextColor?: string;
    searchTextInputProps?: TextInputProps;
    searchTextInputStyle?: StyleProp<TextStyle>;
    searchWithRegionalAccents?: boolean;
    selectedItemContainerStyle?: StyleProp<ViewStyle>;
    selectedItemLabelStyle?: StyleProp<TextStyle>;
    showArrowIcon?: boolean;
    showBadgeDot?: boolean;
    showTickIcon?: boolean;
    stickyHeader?: boolean;
    style?: StyleProp<ViewStyle>;
    testID?: string;
    textStyle?: StyleProp<TextStyle>;
    theme?: ThemeNameType;
    TickIconComponent?: (props: { style: StyleProp<ViewStyle> }) => JSX.Element;
    tickIconContainerStyle?: StyleProp<ViewStyle>;
    tickIconStyle?: StyleProp<ViewStyle>;
    translation?: Partial<TranslationInterface>;
    zIndexInverse?: number;
    zIndex?: number;
  }

  interface DropDownPickerSingleProps<T extends ValueType> {
    multiple?: false;
    onChangeValue?: (value: T | null) => void;
    onSelectItem?: (item: ItemType<T>) => void;
    value: T | null;
    setValue: Dispatch<SetStateAction<T | null>>;
  }

  interface DropDownPickerMultipleProps<T extends ValueType> {
    multiple: true;
    onChangeValue?: (value: Array<T> | null) => void;
    onSelectItem?: (items: Array<ItemType<T>>) => void;
    value: Array<T> | null;
    setValue: Dispatch<SetStateAction<Array<T> | null>>;
  }

  interface DropDownPickerInterface {
    addTheme: (name: string, theme: ThemeNameType) => void;
    addTranslation: (
      language: string,
      translation: TranslationInterface,
    ) => void;
    DROPDOWN_DIRECTION: DropDownDirectionType;
    LANGUAGE: LanguageType;
    LIST_MODE: ListModeInterface;
    MODE: ModeInterface;
    modifyTranslation: (
      language: string,
      translation: TranslationInterface,
    ) => void;
    SCHEMA: SchemaInterface;
    setDropDownDirection: (direction: DropDownDirectionType) => void;
    setLanguage: (language: string) => void;
    setListMode: (mode: string) => void;
    setMode: (mode: string) => void;
    setTheme: (name: string) => void;
    THEMES: ThemeNameType;
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
