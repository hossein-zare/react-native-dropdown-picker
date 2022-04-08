declare module 'react-native-dropdown-picker' {
  import type { Dispatch, PropsWithoutRef } from 'react';
  import type {
    FlatListProps,
    LayoutChangeEvent,
    ModalProps,
    ScrollViewProps,
    StyleProp,
    TextInputProps,
    TextProps,
    TextStyle,
    ViewProps,
    TouchableOpacityProps,
    ViewStyle,
  } from 'react-native';

  type SetStateCallback<S> = ((prevState: S) => S);
  type SetStateValue<S> = ((prevState: S) => S);

  export type ValueType = string | number | boolean;

  export type ItemType<T> = {
    label?: string;
    value?: T;
    icon?: () => void;
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
    | 'IT';

  export interface TranslationInterface {
    PLACEHOLDER: string;
    SEARCH_PLACEHOLDER: string;
    SELECTED_ITEMS_COUNT_TEXT: string | {
      [key in (number | "n")]: string;
    };
    NOTHING_TO_SHOW: string;
  }

  export interface RenderBadgeItemPropsInterface<T> {
    label: string;
    value: T;
    props: TouchableOpacityProps;
    IconComponent: () => JSX.Element;
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

  export interface RenderListItemPropsInterface<T> {
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
    IconComponent: () => JSX.Element;
    TickIconComponent: () => JSX.Element;
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
    ) => JSX.Element;
    loading: boolean;
    message: string;
  }

  export type DropDownDirectionType = 'DEFAULT' | 'TOP' | 'BOTTOM' | 'AUTO';
  export type ThemeNameType = 'DEFAULT' | 'LIGHT' | 'DARK';
  export type ThemeType = object;

  interface DropDownPickerBaseProps<T> {
    items: ItemType<T>[];
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
    dropDownContainerStyle?: StyleProp<ViewStyle>;
    modalContentContainerStyle?: StyleProp<ViewStyle>;
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
    renderBadgeItem?: (props: RenderBadgeItemPropsInterface<T>) => JSX.Element;
    renderListItem?: (props: RenderListItemPropsInterface<T>) => JSX.Element;
    itemSeparator?: boolean;
    bottomOffset?: number;
    badgeColors?: string[] | string;
    badgeDotColors?: string[] | string;
    showArrowIcon?: boolean;
    showBadgeDot?: boolean;
    showTickIcon?: boolean;
    stickyHeader?: boolean;
    autoScroll?: boolean;
    ArrowUpIconComponent?: (props: {
      style: StyleProp<ViewStyle>;
    }) => JSX.Element;
    ArrowDownIconComponent?: (props: {
      style: StyleProp<ViewStyle>;
    }) => JSX.Element;
    TickIconComponent?: (props: { style: StyleProp<ViewStyle> }) => JSX.Element;
    CloseIconComponent?: (props: {
      style: StyleProp<ViewStyle>;
    }) => JSX.Element;
    ListEmptyComponent?: (
      props: ListEmptyComponentPropsInterface,
    ) => JSX.Element;
    ActivityIndicatorComponent?: (
      props: ActivityIndicatorComponentPropsInterface,
    ) => JSX.Element;
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
    setOpen: Dispatch<SetStateValue<boolean>>;
    setItems?: Dispatch<SetStateCallback<any[]>>;
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

  interface DropDownPickerSingleProps<T> {
    multiple?: false;
    onChangeValue?: (value: T | null) => void;
    onSelectItem?: (item: ItemType<T>) => void;
    setValue: Dispatch<SetStateCallback<T | null | any>>;
    value: T | null;
  }

  interface DropDownPickerMultipleProps<T> {
    multiple: true;
    onChangeValue?: (value: T[] | null) => void;
    onSelectItem?: (items: ItemType<T>[]) => void;
    setValue: Dispatch<SetStateCallback<T[] | null | any>>;
    value: T[] | null;
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

  export type DropDownPickerProps<T> = (
    | DropDownPickerSingleProps<T>
    | DropDownPickerMultipleProps<T>
  ) &
    DropDownPickerBaseProps<T>;

  const DropDownPicker: (<T extends ValueType>(
    props: PropsWithoutRef<DropDownPickerProps<T>>,
  ) => React.ReactElement) &
    DropDownPickerInterface;

  export default DropDownPicker;
}
