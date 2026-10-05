import React, { useState } from 'react';
import DropDownPicker, {
  DropDownPickerBaseProps,
  ItemType,
} from 'react-native-dropdown-picker';

function directionValue(direction: 'top' | 'bottom') {
  return direction;
}

export function SinglePicker() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | null>(null);
  const [items, setItems] = useState<ItemType<string>[]>([
    { label: 'First', value: 'first' },
  ]);
  return (
    <DropDownPicker
      open={open}
      setOpen={setOpen}
      value={value}
      setValue={setValue}
      items={items}
      setItems={setItems}
      dropDownDirection="AUTO"
      itemLabelProps={{ numberOfLines: 2, accessibilityLabel: 'Item label' }}
      onDirectionChanged={(direction) => directionValue(direction)}
    />
  );
}

export function MultiplePicker() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<number[] | null>([]);
  return (
    <DropDownPicker<number>
      multiple
      open={open}
      setOpen={setOpen}
      value={value}
      setValue={setValue}
      items={[{ label: 'One', value: 1 }]}
      dropDownDirection="BOTTOM"
      itemLabelProps={{ ellipsizeMode: 'tail', selectable: true }}
      onDirectionChanged={directionValue}
    />
  );
}

export const validLabels: DropDownPickerBaseProps<string>['itemLabelProps'] = {
  numberOfLines: 2,
  onPress: (event) => event.nativeEvent.pageX,
};

export const invalidLabels: DropDownPickerBaseProps<string>['itemLabelProps'] =
  {
    // @ts-expect-error Text numberOfLines must be a number.
    numberOfLines: 'two',
  };

type InputDirection = DropDownPickerBaseProps<string>['dropDownDirection'];
type DirectionCallback = DropDownPickerBaseProps<string>['onDirectionChanged'];

// @ts-expect-error Input direction constants remain uppercase.
export const invalidDirection: InputDirection = 'bottom';

// @ts-expect-error Runtime callback values are lowercase and never AUTO.
export const invalidCallback: DirectionCallback = (
  _direction: InputDirection,
) => {};
