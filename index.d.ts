import { ComponentType } from 'react';

declare module 'react-native-dropdown-picker' {
  type DropDownPicker = {
    items: Array<any>;
    defaultValue?: any;
    placeholder?: string;
    dropDownMaxHeight?: number;
    style?: any;
    dropDownStyle?: any;
    containerStyle?: any;
    itemStyle?: any;
    labelStyle?: any;
    placeholderStyle?: any;
    activeItemStyle?: any;
    activeLabelStyle?: any;
    arrowStyle?: any;
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
    searchableStyle?: any;
    searchableError?: string;
    onOpen?: () => void;
    onClose?: () => void;
    onChangeItem: (item: any, index: number) => void;
  };
  const DropDownPicker: ComponentType<DropDownPicker>;
  export default DropDownPicker;
}
