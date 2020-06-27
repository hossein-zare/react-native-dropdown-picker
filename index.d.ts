import { ComponentType } from 'react';

declare module 'react-native-dropdown-picker' {
  type DropDownPicker = {
    items: Array<any>;
    defaultValue?: any;
    placeholder?: string;
    dropDownMaxHeight?: number;
    style?: Object;
    dropDownStyle?: Object;
    containerStyle?: Object;
    itemStyle?: Object;
    labelStyle?: Object;
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
    searchableStyle?: Object;
    searchableError?: string;
    onOpen?: () => void;
    onClose?: () => void;
    onChangeItem: (item: any, index: number) => void;
  };
  const DropDownPicker: ComponentType<DropDownPicker>;
  export default DropDownPicker;
}
