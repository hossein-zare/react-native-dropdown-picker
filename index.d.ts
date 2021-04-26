declare module "react-native-dropdown-picker" {
    import React, { ComponentType } from "react";
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
  
    export type ValueType = string | number;

    export type ItemType = {
      label?: any;
      value?: ValueType;
      icon?: () => void;
      parent?: any;
      selectable?: boolean;
      disabled?: boolean;
    };

    export type ModeType  = "SIMPLE" | "BADGE";

    export interface ModeInterface {
      DEFAULT: string;
      SIMPLE: string;
      BADGE: string;
    };

    export type ListModeType = "FLATLIST" | "SCROLLVIEW" | "MODAL";

    export interface ListModeInterface {
      DEFAULT: string;
      FLATLIST: string;
      SCROLLVIEW: string;
      MODAL: string;
    };

    export interface SchemaInterface {
      label: string;
      value: string;
      icon: string;
      parent: string;
      selectable: string;
      disabled: string;
    };

    export type LanguageType = "EN" | "AR" | "FA" | "TR";
    
    export interface TranslationInterface {
      PLACEHOLDER: string;
      SEARCH_PLACEHOLDER: string;
      SELECTED_ITEMS_COUNT_TEXT: string;
      NOTHING_TO_SHOW: string;
    };

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
    };

    export interface ActivityIndicatorComponentPropsInterface {
      size: number;
      color: string;
    };

    export interface ListEmptyComponentPropsInterface {
      listMessageContainer: StyleProp<ViewStyle>;
      listMessageTextStyle: StyleProp<TextStyle>;
      ActivityIndicatorComponent: (props: ActivityIndicatorComponentPropsInterface) => JSX
      loading: boolean;
      message: string;
    };
  
    export type DropDownPickerProps = {
      items: ItemType[];
      value?: string | number;
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
      closeIconContainerStyle?: StyleProp<ViewStyle>;
      tickIconContainerStyle?: StyleProp<ViewStyle>;
      listItemContainerStyle?: StyleProp<ViewStyle>;
      listItemLabelStyle?: StyleProp<TextStyle>;
      listChildContainerStyle?: StyleProp<ViewStyle>;
      listChildLabelStyle?: StyleProp<TextStyle>;
      listParentContainerStyle?: StyleProp<ViewStyle>;
      listParentLabelStyle?: StyleProp<TextStyle>;
      selectedItemContainerStyle?: StyleProp<ViewStyle>;
      listItemContainerStyle?: StyleProp<ViewStyle>;
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
      renderBadgeItem?: (props: RenderBadgeItemPropsInterface) => JSX,
      renderListItem?: (props: object) => JSX,
      itemSeparator?: boolean;
      bottomOffset?: number;
      badgeColors?: string[] | string;
      badgeDotColors?: string[] | string;
      showArrowIcons?: boolean;
      showBadgeDot?: boolean;
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
      setOpen: () => void;
      setItems: () => void;
      disableBorderRadius?: boolean;
      containerProps?: ViewProps;
      onLayout?: (e: LayoutChangeEvent) => void;
      onPressStart?: (open: boolean) => void;
      onPressEnd?: (open: boolean) => void;
      onOpen?: () => void;
      onClose?: () => void;
      onChangeValue: (item: ValueType | ValueType[]) => void;
      onChangeSearchText?: (text: string) => void;
      zIndex?: number;
    };

    type GetSelectedItemOutputType = ItemType | undefined | null;
    type GetSelectedItemsOutputType = ItemType[] | undefined;

    interface DropDownPickerInterface {
      MODE: ModeInterface,
      LIST_MODE: ListModeInterface,
      SCHEMA: SchemaInterface,
      LANGUAGE: LanguageInterface,
      HELPER: {
        GET_SELECTED_ITEM: (items: ItemType[], value: string | number | null, key?: string) => GetSelectedItemOutputType;
        GET_SELECTED_ITEMS: (items: ItemType[], values: string[] | number[] | null, key?: string) => GetSelectedItemsOutputType;
      },
      setMode: (mode: string) => void;
      setListMode: (mode: string) => void;
      setLanguage: (language: string) => void;
      addTranslation: (language: string, translation: TranslationInterface) => void;
    }

    const DropDownPicker: ComponentType<DropDownPickerProps> & DropDownPickerInterface;
    export default DropDownPicker;
  }