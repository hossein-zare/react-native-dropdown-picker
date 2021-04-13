declare module "react-native-dropdown-picker" {
  import React, { ComponentType } from "react";
  import {
    StyleProp,
    TextProps,
    TextStyle,
    ViewStyle,
    ScrollViewProps,
    ViewProps,
    TextInputProps,
  } from "react-native";

  export type ItemType = {
    label: any;
    value: any;
    icon?: () => JSX.Element;
    hidden?: boolean;
    untouchable?: boolean;
    parent?: any;
    disabled?: boolean;
    selected?: boolean;
    viewStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
  };

  export type DropDownPickerInstanceType = {
    open: () => void;
    close: () => void;
    toggle: () => void;
    reset: () => void;
    resetItems: (items: ItemType[], defaultValue: any) => void;
    selectItem: (value: any) => void;
    addItem: (item: ItemType) => void;
    addItems: (items: ItemType[]) => void;
    removeItem: (
      value: any,
      params: {
        changeDefaultValue?: boolean;
      }
    ) => void;
    isOpen: () => boolean;
  };

  export type DropDownPickerProps = {
    items: ItemType[];
    defaultValue?: any;
    placeholder?: string;
    dropDownMaxHeight?: number;
    style?: StyleProp<ViewStyle>;
    dropDownStyle?: StyleProp<ViewStyle>;
    containerStyle?: StyleProp<ViewStyle>;
    itemStyle?: StyleProp<ViewStyle>;
    labelStyle?: StyleProp<TextStyle>;
    selectedLabelStyle?: StyleProp<TextStyle>;
    placeholderStyle?: StyleProp<TextStyle>;
    activeItemStyle?: StyleProp<ViewStyle>;
    activeLabelStyle?: StyleProp<TextStyle>;
    arrowStyle?: StyleProp<ViewStyle>;
    arrowColor?: string;
    arrowSize?: number;
    showArrow?: boolean;
    customArrowUp?: (size: number, color: string) => JSX.Element;
    customArrowDown?: (size: number, color: string) => JSX.Element;
    customTickIcon?: () => JSX.Element;
    zIndex?: number;
    zIndexInverse?: number;
    disabled?: boolean;
    isVisible?: boolean;
    autoScrollToDefaultValue?: boolean;
    multiple?: boolean;
    multipleText?: string;
    min?: number;
    max?: number;
    searchable?: boolean;
    searchablePlaceholder?: string;
    searchablePlaceholderTextColor?: string;
    searchableStyle?: StyleProp<TextStyle>;
    searchableError?: () => JSX.Element;
    onSearch?: (text: string) => void;
    selectedLabelLength?: number;
    labelLength?: number;
    labelProps?: TextProps;
    scrollViewProps?: ScrollViewProps;
    searchTextInputProps?: TextInputProps;
    containerProps?: ViewProps;
    globalTextStyle?: StyleProp<TextStyle>;
    childrenContainerStyle?: StyleProp<ViewStyle>;
    noTopRadius?: Boolean;
    noBottomRadius?: Boolean;
    bottomOffset?: number;
    controller?: (instance: DropDownPickerInstanceType) => void;
    onOpen?: () => void;
    onClose?: () => void;
    onChangeItem?: (item: any, index: number) => void;
    onChangeItemMultiple?: (item: any) => void;
    onChangeList?: (items: any, callback: () => void) => void;
    renderSeperator?: () => JSX.Element;
  };
  const DropDownPicker: ComponentType<DropDownPickerProps>;
  export default DropDownPicker;
}
