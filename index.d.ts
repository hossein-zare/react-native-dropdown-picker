declare module 'react-native-dropdown-picker' {
  import { ComponentType } from 'react';

 
  type DropDownPicker = {
    items: {label: any, value: any, icon?: () => JSX.Element, disabled?: boolean, selected?: boolean}[];
    defaultValue?: any;
    placeholder?: string;
    dropDownMaxHeight?: number;
    style?: Object;
    dropDownStyle?: Object;
    containerStyle?: Object;
    itemStyle?: Object;
    labelStyle?: Object;
    selectedLabelStyle?: Object;
    placeholderStyle?: Object;
    activeItemStyle?: Object;
    activeLabelStyle?: Object;
    arrowStyle?: Object;
    arrowColor?: string;
    arrowSize?: number;
    showArrow?: boolean;
    customArrowUp?: (size: number, color: string) => JSX.Element;
    customArrowDown?: (size: number, color: string) => JSX.Element;
    customTickIcon?: () => JSX.Element;
    zIndex?: number;
    disabled?: boolean;
    isVisible?: boolean;
    multiple?: boolean;
    multipleText?: string;
    min?: number;
    max?: number;
    searchable?: boolean;
    searchablePlaceholder?: string;
    searchablePlaceholderTextColor?: string;
    searchableStyle?: Object;
    searchableError?: () => JSX.Element;
    onOpen?: () => void;
    onClose?: () => void;
    onChangeItem?: (item: any, index: number) => void;
  };
  const DropDownPicker: ComponentType<DropDownPicker>;
  export default DropDownPicker;
}
