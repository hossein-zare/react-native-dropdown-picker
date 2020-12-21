declare module "react-native-dropdown-picker" {
  import React, { ComponentType } from "react";
  import {
    StyleProp,
    TextStyle,
    ViewStyle,
    ScrollViewProps,
    ViewProps,
    TextInputProps,
  } from "react-native";

  export type DropDownPickerProps = {
    items: {
      label: any;
      value: any;
      icon?: () => JSX.Element;
      hidden?: boolean;
      disabled?: boolean;
      selected?: boolean;
    }[];
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
    selectedLabelLength?: number;
    labelLength?: number;
    scrollViewProps?: ScrollViewProps;
    searchTextInputProps?: TextInputProps;
    containerProps?: ViewProps;
    controller?: (instance: object) => void;
    onOpen?: () => void;
    onClose?: () => void;
    onChangeItem?: (item: any, index: number) => void;
    onChangeList?: (items: any, callback: () => void) => void;
    renderSeperator?: () => JSX.Element;
  };
  const DropDownPicker: ComponentType<DropDownPickerProps>;
  export default DropDownPicker;
}
