declare module "react-native-dropdown-picker" {
    import {ComponentType} from "react";
    import {
      StyleProp,
      TextProps,
      TextStyle,
      ViewStyle,
      ScrollViewProps,
      ModalProps,
      FlatListProps,
      ViewProps,
      TextInputProps,
      LayoutChangeEvent
    } from "react-native";
  
    export type ValueType = string | number | boolean;

    export type ItemType = {
      label?: string;
      value?: ValueType;
      icon?: () => void;
      parent?: any;
      selectable?: boolean;
      disabled?: boolean;
    };

    export type ModeType  = "DEFAULT" | "SIMPLE" | "BADGE";

    export interface ModeInterface {
      DEFAULT: string;
      SIMPLE: string;
      BADGE: string;
    }

    export type ListModeType = "DEFAULT" | "FLATLIST" | "SCROLLVIEW" | "MODAL";

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
    }

    export type LanguageType = "DEFAULT" | "FALLBACK" | "EN" | "AR" | "FA" | "TR";
    
    export interface TranslationInterface {
      PLACEHOLDER: string;
      SEARCH_PLACEHOLDER: string;
      SELECTED_ITEMS_COUNT_TEXT: string;
      NOTHING_TO_SHOW: string;
    }

    export interface RenderBadgeItemPropsInterface {
      label: string;
      value: ValueType;
      IconComponent: () => JSX;
      textStyle: StyleProp<TextStyle>;
      badgeStyle: StyleProp<ViewStyle>;
      badgeTextStyle: StyleProp<TextStyle>;
      badgeDotStyle: StyleProp<ViewStyle>;
      getBadgeColor: (value: string) => string;
      getBadgeDotColor: (value: string) => string;
      showBadgeDot: boolean;
      onPress: (value: ValueType) => void;
      rtl: boolean;
      thene: string;
      THEME: object;
    }

    export interface RenderListItemPropsInterface {
      rtl: boolean;
      item: ItemType;
      label: string;
      value: ValueType;
      parent: ValueType;
      selectable: boolean;
      disabled: boolean;
      custom: boolean;
      isSelected: boolean;
      IconComponent: () => JSX;
      TickIconComponent: () => JSX;
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
      categorySelectable: boolean;
      onPress: () => void;
      THEME: object;
    }

    export interface ActivityIndicatorComponentPropsInterface {
      size: number;
      color: string;
    }

    export interface ListEmptyComponentPropsInterface {
      listMessageContainer: StyleProp<ViewStyle>;
      listMessageTextStyle: StyleProp<TextStyle>;
      ActivityIndicatorComponent: (props: ActivityIndicatorComponentPropsInterface) => JSX
      loading: boolean;
      message: string;
    }

    export type DropDownDirectionType = "DEFAULT" | "TOP" | "BOTTOM" | "AUTO";
    export type ThemeType = "DEFAULT" | "LIGHT" | "DARK";
  
    export type DropDownPickerProps = {
      items: ItemType[];
      value: ValueType | ValueType[] | null;
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
      schema?: SchemaInterface;
      language?: LanguageType;
      translation?: TranslationInterface;
      multiple?: boolean;
      mode?: ModeType;
      key?: string;
      maxHeight?: number;
      renderBadgeItem?: (props: RenderBadgeItemPropsInterface) => JSX;
      renderListItem?: (props: RenderListItemPropsInterface) => JSX;
      itemSeparator?: boolean;
      bottomOffset?: number;
      badgeColors?: string[] | string;
      badgeDotColors?: string[] | string;
      showArrowIcon?: boolean;
      showBadgeDot?: boolean;
      showTickIcon?: boolean;
      ArrowUpComponent?: (props: {style: StyleProp<ViewStyle>}) => JSX;
      ArrowDownComponent?: (props: {style: StyleProp<ViewStyle>}) => JSX;
      TickIconComponent?: (props: {style: StyleProp<ViewStyle>}) => JSX;
      CloseIconComponent?: (props: {style: StyleProp<ViewStyle>}) => JSX;
      ListEmptyComponent?: (props: ListEmptyComponentPropsInterface) => JSX;
      ActivityIndicatorComponent?: (props: ActivityIndicatorComponentPropsInterface) => JSX;
      activityIndicatorSize?: number;
      activityIndicatorColor?: string;
      props?: ViewProps;
      modalProps?: ModalProps;
      flatListProps?: FlatListProps;
      scrollViewProps?: ScrollViewProps;
      searchTextInputProps?: TextInputProps;
      loading?: boolean;
      min?: number;
      max?: number;
      addCustomItem?: boolean;
      setOpen: (open: boolean) => void;
      setItems: (items: ItemType[]) => void;
      setValue: (values: ValueType | ValueType[] | null) => void;
      disableBorderRadius?: boolean;
      containerProps?: ViewProps;
      onLayout?: (e: LayoutChangeEvent) => void;
      onPress?: (open: boolean) => void;
      onOpen?: () => void;
      onClose?: () => void;
      onChangeSearchText?: (text: string) => void;
      zIndex?: number;
      zIndexInverse?: number;
      disableLocalSearch?: boolean;
      dropDownDirection?: DropDownDirectionType;
      theme?: ThemeType;
      rtl?: boolean;
    };

    type GetSelectedItemOutputType = ItemType | undefined | null;
    type GetSelectedItemsOutputType = ItemType[] | undefined;

    interface DropDownPickerInterface {
      MODE: ModeInterface;
      LIST_MODE: ListModeInterface;
      DROPDOWN_DIRECTION: DropDownDirectionType;
      SCHEMA: SchemaInterface;
      LANGUAGE: LanguageInterface;
      THEMES: ThemeType;
      HELPER: {
        GET_SELECTED_ITEM: (items: ItemType[], value: string | number | null, key?: string) => GetSelectedItemOutputType;
        GET_SELECTED_ITEMS: (items: ItemType[], values: string[] | number[] | null, key?: string) => GetSelectedItemsOutputType;
      };
      setMode: (mode: string) => void;
      setListMode: (mode: string) => void;
      setDropDownDirection: (direction: DropDownDirectionType) => void;
      setTheme: (name: string) => void;
      addTheme: (name: string, theme: any) => void;
      setLanguage: (language: string) => void;
      addTranslation: (language: string, translation: TranslationInterface) => void;
      modifyTranslation: (language: string, translation: TranslationInterface) => void;
    }

    const DropDownPicker: ComponentType<DropDownPickerProps> & DropDownPickerInterface;
    export default DropDownPicker;
  }

  //TODO: remove uses of the ambiguous "any" and "object" types