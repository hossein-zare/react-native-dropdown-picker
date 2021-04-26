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
      label?: any;
      value?: any;
      icon?: () => void;
      parent?: any;
      selectable?: boolean;
      disabled?: boolean;
    };
  
    export type DropDownPickerProps = {
      items: ItemType[];
      value?: string | number;
      placeholder?: string;
      maxHeight?: number;
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

    type GetSelectedItemOutputType = ItemType | undefined | null;
    type GetSelectedItemsOutputType = ItemType[] | undefined;

    export interface TranslationInterface {
      PLACEHOLDER: string,
      SEARCH_PLACEHOLDER: string,
      SELECTED_ITEMS_COUNT_TEXT: string,
      NOTHING_TO_SHOW: string
    }

    interface DropDownPickerInterface {
      MODE: {
        DEFAULT: string,
        SIMPLE: string,
        BADGE: string
      },
      LIST_MODE: {
        DEFAULT: string,
        FLATLIST: string,
        SCROLLVIEW: string,
        MODAL: string
      },
      SCHEMA: {
        label: string,
        value: string,
        icon: string,
        parent: string,
        selectable: string,
        disabled: string
      },
      LANGUAGE: {
        DEFAULT: string,
        FALLBACK: string,
        ENGLISH: string,
        ARABIC: string,
        FARSI: string,
        TURKISH: string
      },
      HELPER: {
        GET_SELECTED_ITEM: (items: ItemType[], value: string | number | null, key?: string) => GetSelectedItemOutputType,
        GET_SELECTED_ITEMS: (items: ItemType[], values: string[] | number[] | null, key?: string) => GetSelectedItemsOutputType,
      },
      setMode: (mode: string) => void,
      setListMode: (mode: string) => void,
      setLanguage: (language: string) => void,
      addTranslation: (language: string, translation: TranslationInterface) => void
    }

    const DropDownPicker: ComponentType<DropDownPickerProps> & DropDownPickerInterface;
    export default DropDownPicker;
  }