import React, { JSX } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DropDownPicker, { ItemType } from 'react-native-dropdown-picker';
import JavascriptClassExample from './example-src-files/javascript-class-example';
import JavascriptFunctionExample from './example-src-files/javascript-function-example';
import TypescriptClassExample from './example-src-files/typescript-class-example';
import TypescriptFunctionExample from './example-src-files/typescript-function-example';

enum ExampleComponent {
  JavaScriptClassSingleValue,
  JavaScriptClassMultiValue,
  JavaScriptFunctionSingleValue,
  JavaScriptFunctionMultiValue,
  TypeScriptClassSingleValue,
  TypeScriptClassMultiValue,
  TypeScriptFunctionSingleValue,
  TypeScriptFunctionMultiValue,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
    flexDirection: 'column',
    margin: 3,
    marginTop: 20,
    padding: 3,
  },
});

const EXAMPLE_COMPONENT_ITEMS: Array<ItemType<ExampleComponent>> = [
  {
    label: 'JavaScript; class component; single-item',
    value: ExampleComponent.JavaScriptClassSingleValue,
  },
  {
    label: 'JavaScript; class component; multiple-item',
    value: ExampleComponent.JavaScriptClassMultiValue,
  },
  {
    label: 'JavaScript; function component; single-item',
    value: ExampleComponent.JavaScriptFunctionSingleValue,
  },
  {
    label: 'JavaScript; function component; multiple-item',
    value: ExampleComponent.JavaScriptFunctionMultiValue,
  },
  {
    label: 'TypeScript; class component; single-item',
    value: ExampleComponent.TypeScriptClassSingleValue,
  },
  {
    label: 'TypeScript; class component; multiple-item',
    value: ExampleComponent.TypeScriptClassMultiValue,
  },
  {
    label: 'TypeScript; function component; single-item',
    value: ExampleComponent.TypeScriptFunctionSingleValue,
  },
  {
    label: 'TypeScript; function component; multiple-item',
    value: ExampleComponent.TypeScriptFunctionMultiValue,
  },
];

type Props = Record<string, never>;

interface State {
  currentExample: ExampleComponent;
  examplePickerOpen: boolean;
  exampleComponents: Array<ItemType<ExampleComponent>>;
}

export default class App extends React.Component<Props, State> {
  constructor(props: Readonly<Props>) {
    super(props);
    this.state = {
      currentExample: ExampleComponent.JavaScriptClassSingleValue,
      exampleComponents: EXAMPLE_COMPONENT_ITEMS,
      examplePickerOpen: false,
    };

    this.setOpen = this.setOpen.bind(this);
    this.setCurrentExample = this.setCurrentExample.bind(this);
  }

  private static getExample(egComponent: ExampleComponent): JSX.Element {
    switch (egComponent) {
      case ExampleComponent.JavaScriptClassSingleValue:
        return <JavascriptClassExample multiple={false} />;
      case ExampleComponent.JavaScriptClassMultiValue:
        return <JavascriptClassExample multiple />;
      case ExampleComponent.JavaScriptFunctionSingleValue:
        return <JavascriptFunctionExample multiple={false} />;
      case ExampleComponent.JavaScriptFunctionMultiValue:
        return <JavascriptFunctionExample multiple />;
      case ExampleComponent.TypeScriptClassSingleValue:
        return <TypescriptClassExample multiple={false} />;
      case ExampleComponent.TypeScriptClassMultiValue:
        return <TypescriptClassExample multiple />;
      case ExampleComponent.TypeScriptFunctionSingleValue:
        return <TypescriptFunctionExample multiple={false} />;
      case ExampleComponent.TypeScriptFunctionMultiValue:
        return <TypescriptFunctionExample multiple />;
      default:
        throw new Error(
          "couldn't match example component in getExample() in App.tsx. egComponent was: ",
          egComponent,
        );
    }
  }

  setOpen(examplePickerOpen: boolean): void {
    this.setState({ examplePickerOpen });
  }

  setCurrentExample(
    callback: (prevState: ExampleComponent | null) => ExampleComponent | null,
  ): void {
    this.setState((state: Readonly<State>) => ({
      currentExample: callback(state.currentExample),
    }));
  }

  // todo: fix picker items being under text

  render(): JSX.Element {
    const { currentExample, examplePickerOpen, exampleComponents } = this.state;

    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <Text>Choose example:</Text>
          </View>

          <View style={{ flex: 1 }}>
            <DropDownPicker
              setValue={this.setCurrentExample}
              value={currentExample}
              items={exampleComponents}
              open={examplePickerOpen}
              setOpen={this.setOpen}
            />
          </View>
        </View>

        <View style={{ flex: 3 }}>
          <View style={{ flex: 1 }}>
            <Text>Example:</Text>
          </View>

          {App.getExample(currentExample)}
        </View>
      </View>
    );
  }
}
