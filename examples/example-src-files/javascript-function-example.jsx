import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

/**
 *
 * @param props
 */
export default function JavascriptFunctionExample(props) {
  const [open, setOpen] = useState(false);
  const [multiValue, setMultiValue] = useState(null);
  const [singleValue, setSingleValue] = useState(null);
  const [items, setItems] = useState([
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
          Choose a fruit (javascript function,{' '}
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
            onPress={() => {
              if (multiple) setMultiValue(null);
              else setSingleValue(null);
            }}
          />
        </View>
      </View>
    </View>
  );
}
