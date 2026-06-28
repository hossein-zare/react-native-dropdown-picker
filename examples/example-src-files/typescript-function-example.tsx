import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import DropDownPicker, { ItemType } from 'react-native-dropdown-picker';

/**
 *
 * @param props
 * @param props.multiple
 */
export default function TypescriptFunctionExample(props: {
  multiple: boolean;
}): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  const [singleValue, setSingleValue] = useState<string | null>(null);
  const [multiValue, setMultiValue] = useState<Array<string> | null>(null);
  const [items, setItems] = useState<Array<ItemType<string>>>([
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Nectarines', value: 'nectarines' },
    { label: 'Kiwis', value: 'kiwis' },
    { label: 'Raspberries', value: 'raspberries' },
    { label: 'Pears', value: 'pears' },
  ]);
  const { multiple } = props;

  return (
    <View style={{ flex: 3 }}>
      <View style={{ flex: 1 }}>
        <Text>
          Choose a fruit (typescript function,{' '}
          {multiple ? 'multiple-item' : 'single-item'}):
        </Text>
      </View>

      <View style={{ flex: 1 }}>
        {multiple ? (
          <DropDownPicker
            open={open}
            value={multiValue}
            items={items}
            setOpen={setOpen}
            setValue={setMultiValue}
            setItems={setItems}
            placeholder='Choose a fruit'
            multiple
            multipleText='You have chosen {count} fruits.'
          />
        ) : (
          <DropDownPicker
            open={open}
            value={singleValue}
            items={items}
            setOpen={setOpen}
            setValue={setSingleValue}
            setItems={setItems}
            placeholder='Choose a fruit'
            multiple={false}
          />
        )}
      </View>

      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Text>
            {multiple ? 'Fruits currently are: ' : 'Fruit currently is: '}
            {multiple
              ? JSON.stringify(multiValue)
              : JSON.stringify(singleValue)}
          </Text>
        </View>

        <View style={{ flex: 1 }}>
          <Button
            title={multiple ? 'Clear fruits' : 'Clear fruit'}
            onPress={(): void => {
              if (multiple) setMultiValue(null);
              else setSingleValue(null);
            }}
          />
        </View>
      </View>
    </View>
  );
}
