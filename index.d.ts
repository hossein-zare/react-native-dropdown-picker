declare module 'react-native-picker-dropdown' {
  export interface Item {
      label: string;
      value: any;
      selected?: boolean
  }
  export interface PickerDropDownProps {
      onChangeItem?: (item: object, index: number) => void;
      items: Item[];
      placeholder?: string;
      disabled?: boolean;
      defaultIndex?: number,
      defaultValue?: any,
      defaultNull?: boolean,
      dropDownMaxHeight?: number,
      style?: object;
      itemStyle?: object;
      labelStyle?: object;
  }
  class PickerDropDown extends React.Component<PickerDropDownProps> {}
  export default PickerDropDown;
}