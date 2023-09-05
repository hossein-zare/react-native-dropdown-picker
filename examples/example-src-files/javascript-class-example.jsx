import React, { Component } from 'react';
import { Button, Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

export default class JavascriptClassExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [
        { label: 'Bert', value: 'Bert' },
        { label: 'Darius', value: 'Darius' },
        { label: 'Maggie', value: 'Maggie' },
        { label: 'Rebecca', value: 'Rebecca' },
        { label: 'Ruby', value: 'Ruby' },
        { label: 'Trent', value: 'Trent' },
      ],
      multiValue: null,
      open: false,
      singleValue: null,
    };

    this.setOpen = this.setOpen.bind(this);
    this.setSingleValue = this.setSingleValue.bind(this);
    this.setMultiValue = this.setMultiValue.bind(this);
    this.setItems = this.setItems.bind(this);
  }

  setOpen(open) {
    this.setState({
      open,
    });
  }

  setSingleValue(callback) {
    this.setState((state) => ({
      singleValue: callback(state.singleValue),
    }));
  }

  setMultiValue(callback) {
    this.setState((state) => ({
      multiValue: callback(state.multiValue),
    }));
  }

  setItems(callback) {
    this.setState((state) => ({
      items: callback(state.items),
    }));
  }

  render() {
    const { multiple } = this.props;
    const { open, singleValue, multiValue, items } = this.state;

    return (
      <View style={{ flex: 3 }}>
        <View style={{ flex: 1 }}>
          <Text>
            Choose a name (javascript class,{' '}
            {multiple ? 'multiple-item' : 'single-item'}):
          </Text>
        </View>

        <View style={{ flex: 1 }}>
          {multiple ? (
            <DropDownPicker
              open={open}
              value={multiValue}
              items={items}
              setOpen={this.setOpen}
              setValue={this.setMultiValue}
              setItems={this.setItems}
              placeholder='Choose a name'
              multiple
              multipleText='You have chosen {count} names.'
            />
          ) : (
            <DropDownPicker
              open={open}
              value={singleValue}
              items={items}
              setOpen={this.setOpen}
              setValue={this.setSingleValue}
              setItems={this.setItems}
              placeholder='Choose a name'
              multiple={false}
            />
          )}
        </View>

        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <Text>
              {multiple ? 'Names currently are: ' : 'Name currently is: '}
              {multiple
                ? JSON.stringify(multiValue)
                : JSON.stringify(singleValue)}
            </Text>
          </View>

          <View style={{ flex: 1 }}>
            <Button
              title={multiple ? 'Clear names' : 'Clear name'}
              onPress={() => {
                if (multiple) this.setState({ multiValue: null });
                else this.setState({ singleValue: null });
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}
