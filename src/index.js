import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Platform,
    TextInput,
    ViewPropTypes
} from 'react-native';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';

import PropTypes from 'prop-types';

// Icon
import Feather from 'react-native-vector-icons/Feather';
Feather.loadFont();

class DropDownPicker extends React.Component {
    constructor(props) {
        super(props);

        let choice;
        let items = [];
        let defaultValueIndex; // captures index of first defaultValue for initial scrolling
        if (! props.multiple) {
            if (props.defaultValue || props.defaultValue === 0) {
                choice = props.items.find(item => item.value === props.defaultValue);
            } else if (props.items.filter(item => item.hasOwnProperty('selected') && item.selected === true).length > 0) {
                choice = props.items.filter(item => item.hasOwnProperty('selected') && item.selected === true)[0];
            } else {
                choice = this.null();
            }
            defaultValueIndex = props.items.findIndex(item => item.value === props.defaultValue);
        } else {
            if (props.defaultValue && Array.isArray(props.defaultValue) && props.defaultValue.length > 0) {
                props.defaultValue.forEach((value, index) => {
                    items.push(
                        props.items.find(item => item.value === value)
                    )
                });
            } else if (props.items.filter(item => item.hasOwnProperty('selected') && item.selected === true).length > 0) {
                items = props.items.filter((item, index) => item.hasOwnProperty('selected') && item.selected === true);
            }
            defaultValueIndex = props.items.findIndex(item => item.value === props.defaultValue[0]);
        }

        this.state = {
            choice: props.multiple ? items : {
                label: choice.label,
                value: choice.value,
                icon: choice.icon
            },
            searchableText: null,
            isVisible: props.isVisible,
            props: {
                multiple: props.multiple,
                defaultValue: props.defaultValue,
                isVisible: props.isVisible
            },
            initialScroll: props?.autoScrollToDefaultValue,
            defaultValueIndex
        };
        this.dropdownCoordinates = [];
    }

    static getDerivedStateFromProps(props, state) {
        // Change default value (! multiple)
        if (! state.props.multiple && props.defaultValue !== state.props.defaultValue) {
            const { label, value, icon } = props.defaultValue === null ? {
                label: null,
                value: null,
                icon: () => {}
            } : props.items.find(item => item.value === props.defaultValue);
            return {
                choice: {
                    label, value, icon
                },
                props: {
                    ...state.props,
                    defaultValue: props.defaultValue
                }
            }
        }

        // Change default value (multiple)
        if (state.props.multiple && JSON.stringify(props.defaultValue) !== JSON.stringify(state.props.defaultValue)) {
            let items = [];
            if (props.defaultValue && Array.isArray(props.defaultValue) && props.defaultValue.length > 0) {
                props.defaultValue.forEach((value, index) => {
                    items.push(
                        props.items.find(item => item.value === value)
                    )
                });
            }

            return {
               choice: items,
               props: {
                   ...state.props,
                   defaultValue: props.defaultValue
               } 
            }
        }

        // Change visibility
        if (props.isVisible !== state.props.isVisible) {
            return {
                isVisible: props.isVisible,
                props: {
                    ...state.props,
                    isVisible: props.isVisible
                }
            }
        }

        // Change disability
        if (props.disabled !== state.props.disabled) {
            return {
                props: {
                    ...state.props,
                    disabled: props.disabled
                }
            }
        }

        return null;
    }

    componentDidMount() {
        this.props.controller(this);
    }

    componentDidUpdate() {
        // ScrollView scrollTo() can only be used after the ScrollView is rendered
        // Automatic scrolling to first defaultValue occurs on first render of dropdown ScrollView
        if (this.state.initialScroll && this.state.isVisible) {
            setTimeout(() => {
                this.scrollViewRef.scrollTo({
                    x: 0,
                    y: this.dropdownCoordinates[this.state.defaultValueIndex],
                    animated: true,
                });
                this.setState({initialScroll: false});
            }, 200);
        }
    }

    reset() {
        const item = this.props.multiple ? [] : this.null();
        this.props.onChangeItem(item, -1);
    }

    null() {
        return {
            label: null,
            value: null,
            icon: () => {}
        }
    }

    toggle() {
        this.setState({
            isVisible: ! this.state.isVisible,
        }, () => {
            const isVisible = this.state.isVisible;
            if (isVisible) {
        		this.open(false);
        	} else {
        		this.close(false);
        	}
        });
    }

    resetItems(items, defaultValue = null) {
        this.setPropState({
            items
        }, () => {
            if (defaultValue) {
                if (this.state.props.multiple) {
                    this.reset();

                    (async () => {
                        for (const value of defaultValue) {
                            await new Promise((resolve, reject) => {
                                resolve(
                                    this.select(items.find(item => item.value === value))
                                );
                            });
                        }
                    })();
                } else {
                    this.select(
                        items.find(item => item.value === defaultValue)
                    );
                }
            } else {
                this.reset();
            }
        });
    }

    addItem(item) {
        const items = [...this.props.items, item];
        this.setPropState({
            items
        });
    }

    addItems(array) {
        const items = [...this.props.items, ...array];
        this.setPropState({
            items
        });
    }

    removeItem(value, {changeDefaultValue = true} = {}) {
        const items = [...this.props.items].filter(item => item.value !== value);
        this.setPropState({
            items
        }, () => {
            if (changeDefaultValue) {
                if (this.state.props.multiple) {
                    this.state.choice.forEach(item => {
                        if (item.value === value) {
                            this.select(item);
                        }
                    });
                } else {
                    if (this.state.choice.value === value) {
                        this.reset();
                    }
                }
            }
        });
    }

    setPropState(data, callback = () => {}) {
        this.props.onChangeList(data.items, callback);
    }

    isOpen() {
        return this.state.isVisible;
    }

    open(setState = true) {
        this.setState({
            ...(setState && {isVisible: true})
        }, () => this.props.onOpen());
    }

    close(setState = true) {
        this.setState({
            ...(setState && {isVisible: false}),
            searchableText: null
        }, () => this.props.onClose());
    }

    selectItem(defaultValue) {
        if (this.state.props.multiple) {
            (async () => {
                for (const value of defaultValue) {
                    const item = this.props.items.find(item => item.value === value);
                    if (item) {
                        await new Promise((resolve, reject) => {
                            resolve(
                                this.select(item)
                            );
                        });
                    }
                }
            })();
        } else {
            const item = this.props.items.find(item => item.value === defaultValue);
            if (item)
                this.select(item);
        }
    }

    select(item) {
        const { multiple } = this.state.props;
        if (! multiple) {
            this.setState({
                choice: {
                    label: item.label,
                    value: item.value,
                    icon: item.icon
                },
                isVisible: false,
                props: {
                    ...this.state.props,
                    isVisible: false
                },
                searchableText: null
            });

            const index = this.props.items.findIndex(i => i.value === item.value);

            // onChangeItem callback
            this.props.onChangeItem(item, index);
        } else {
            let choice = [...this.state.choice];
            const exists = choice.findIndex(i => i.label === item.label && i.value === item.value);

            if (exists > -1 && choice.length > this.props.min) {
                choice = choice.filter(i => i.label !== item.label && i.value !== item.value);
            } else if (exists === -1 && choice.length < this.props.max) {
                choice.push(item);
            }

            this.setState({
                choice
            });

            // onChangeItem callback
            this.props.onChangeItem(choice.map(i => i.value));
        }

        // onClose callback (! multiple)
        if (! multiple)
            this.props.onClose();
    }

    getLayout(layout) {
        this.setState({
            top: layout.height - 1
        });
    }

    getItems() {
        if (this.state.searchableText) {
            const text = this.state.searchableText.toLowerCase();

            return this.props.items.filter((item) => {
                return item.label && (item.label.toLowerCase()).indexOf(text) > -1;
            });
        }

        return this.props.items;
    }

    getNumberOfItems() {
        return this.props.multipleText.replace('%d', this.state.choice.length);
    }

    isSelected(item) {
      return this.state.choice.findIndex(a => a.value === item.value) > -1;
    }

    getLabel(item, selected = false) {
        let len;
        let label;

        if (typeof item === 'object') {
            len = item.label.length;
            label = item.label.substr(0, selected ? this.props.selectedLabelLength : this.props.labelLength);
        } else if (item !== null && typeof item !== 'undefined') {
            len = item.length;
            label = item.substr(0, selected ? this.props.selectedLabelLength : this.props.labelLength);
        } else {
            return item;
        }
        
        let len2 = label.length;
        return label + (len !== len2 ? '...' : '');
    }

    render() {
        this.props.controller(this);
        const { multiple, disabled } = this.state.props;
        const { placeholder, scrollViewProps, searchTextInputProps } = this.props;
        const isPlaceholderActive = this.state.choice.label === null;
        const label = isPlaceholderActive ? (placeholder) : this.getLabel(this.state.choice?.label, true);
        const placeholderStyle = isPlaceholderActive && this.props.placeholderStyle;
        const opacity = disabled ? 0.5 : 1;
        const items = this.getItems();

        return (
            <View style={[this.props.containerStyle, {

              ...(Platform.OS !== 'android' && {
                  zIndex: this.props.zIndex
              })

            }]}>
                <TouchableOpacity
                    onLayout={(event) => this.getLayout(event.nativeEvent.layout)}
                    disabled={disabled}
                    onPress={() => this.toggle()}
                    activeOpacity={1}
                    style={[
                        styles.dropDown,
                        this.state.isVisible && styles.noBottomRadius, {
                            flexDirection: 'row', flex: 1
                        },
                        this.props.style,
                    ]}
                >

                        {this.state.choice.icon && ! multiple && this.state.choice.icon()}
                        <Text style={[
                            this.props.labelStyle,
                            placeholderStyle, {opacity, flex: 1}, {
                                marginLeft: (this.props.labelStyle.hasOwnProperty('textAlign') && this.props.labelStyle.textAlign === 'left') || ! this.props.labelStyle.hasOwnProperty('textAlign') ? 5 : 0,
                                marginRight: (this.props.labelStyle.hasOwnProperty('textAlign') && this.props.labelStyle.textAlign === 'right') ? 5 : 0,
                            },
                            this.state.choice.label !== null && this.props.selectedLabelStyle,
                            this.state.choice.icon && {marginLeft: 5}
                        ]}>
                            {multiple ? (
                                this.state.choice.length > 0 ? this.getNumberOfItems() : placeholder
                            ) : label}
                        </Text>

                    {this.props.showArrow && (
                        <View style={[styles.arrow]}>
                            <View style={[this.props.arrowStyle, {opacity}]}>
                            {
                                ! this.state.isVisible ? (
                                    this.props.customArrowDown(this.props.arrowSize, this.props.arrowColor)
                                ) : (
                                    this.props.customArrowUp(this.props.arrowSize, this.props.arrowColor)
                                )
                            }
                            </View>
                        </View>
                    )}
                </TouchableOpacity>
                <View style={[
                    styles.dropDown,
                    styles.dropDownBox,
                    this.props.dropDownStyle,
                    ! this.state.isVisible && styles.hidden, {
                        top: this.state.top,
                        maxHeight: this.props.dropDownMaxHeight,
                        zIndex: this.props.zIndex
                    }
                ]}>
                    {
                      this.props.searchable && (
                        <View style={{width: '100%', flexDirection: 'row'}}>
                            <TextInput
                                style={[styles.input, this.props.searchableStyle]}
                                defaultValue={this.state.searchableText}
                                placeholder={this.props.searchablePlaceholder}
                                placeholderTextColor={this.props.searchablePlaceholderTextColor}
                                {...searchTextInputProps}
                                onChangeText={ (text) => {
                                    this.setState({
                                        searchableText: text
                                    })
                                    if(searchTextInputProps.onChangeText) searchTextInputProps.onChangeText(text);
                                }}
                            />
                        </View>
                      )
                    }

                    <ScrollView
                        style={{width: '100%'}}
                        nestedScrollEnabled={true}
                        ref={ref => {
                            this.scrollViewRef = ref;
                        }}
                        {...scrollViewProps}>
                        {items.length > 0 ? items.map((item, index) => (
                            <View
                                key={index}
                                onLayout={event => {
                                    const layout = event.nativeEvent.layout;
                                    this.dropdownCoordinates[index] = layout.y;
                                }}
                            >
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => this.select(item)}
                                    style={[styles.dropDownItem, this.props.itemStyle, (
                                        this.state.choice.value === item.value && this.props.activeItemStyle
                                    ), {
                                        opacity: item?.disabled || false === true ? 0.3 : 1,
                                        alignItems: 'center',
                                        ...(
                                            multiple ? {
                                                justifyContent: 'space-between',
                                                ...(this.isSelected(item) && this.props.activeItemStyle)
                                            } : {
                                                
                                            }
                                        )
                                    }]}
                                    disabled={item?.disabled || false === true}
                                >
                                    <View style={{
                                        flexDirection: this.props.itemStyle?.flexDirection ?? 'row',
                                        ...(this.props.itemStyle.hasOwnProperty('justifyContent') && {
                                            justifyContent: this.props.itemStyle.justifyContent
                                        }),
                                        alignContent: 'center'
                                    }}>
                                        {item.icon && item.icon()}
                                        <Text style={[
                                            this.props.labelStyle, 
                                                multiple ?
                                                (this.isSelected(item) && this.props.activeLabelStyle) : (this.state.choice.value === item.value && this.props.activeLabelStyle)
                                            , {
                                            ...(item.icon && {
                                                marginHorizontal: 5
                                            })
                                        }]}>
                                            {this.getLabel(item)}
                                        </Text>
                                    </View>

                                    {
                                        this.state.props.multiple && this.state.choice.findIndex(i => i.label === item.label && i.value === item.value) > -1 && (
                                            this.props.customTickIcon()
                                        )
                                    }
                                </TouchableOpacity>
                            </View>
                        )) : (
                            <View style={styles.notFound}>
                                {this.props.searchableError()}
                            </View>
                        )}
                    </ScrollView>
                </View>
            </View>
        );
    }
}

DropDownPicker.defaultProps = {
    placeholder: 'Select an item',
    dropDownMaxHeight: 150,
    style: {},
    dropDownStyle: {},
    containerStyle: {},
    itemStyle: {},
    labelStyle: {},
    selectedLabelStyle: {},
    placeholderStyle: {},
    activeItemStyle: {},
    activeLabelStyle: {},
    arrowStyle: {},
    arrowColor: '#000',
    showArrow: true,
    arrowSize: 15,
    customArrowUp: (size, color) => <Feather name="chevron-up" size={size} color={color} />,
    customArrowDown: (size, color) => <Feather name="chevron-down" size={size} color={color} />,
    customTickIcon: () => <Feather name="check" size={15} />,
    zIndex: 5000,
    disabled: false,
    searchable: false,
    searchablePlaceholder: 'Search for an item',
    searchableError: () => <Text>Not Found</Text>,
    searchableStyle: {},
    searchablePlaceholderTextColor: 'gray',
    isVisible: false,
    autoScrollToDefaultValue: false,
    multiple: false,
    multipleText: '%d items have been selected',
    min: 0,
    max: 10000000,
    selectedLabelLength: 1000,
    labelLength: 1000,
    scrollViewProps: {},
    searchTextInputProps: {},
    controller: () => {},
    onOpen: () => {},
    onClose: () => {},
    onChangeItem: () => {},
    onChangeList: () => {},
};

DropDownPicker.propTypes = {
    items: PropTypes.array.isRequired,
    defaultValue: PropTypes.any,
    placeholder: PropTypes.string,
    dropDownMaxHeight: PropTypes.number,
    style: ViewPropTypes.style,
    dropDownStyle: ViewPropTypes.style,
    containerStyle: ViewPropTypes.style,
    itemStyle: ViewPropTypes.style,
    labelStyle: Text.propTypes.style,
    selectedLabelStyle: Text.propTypes.style,
    placeholderStyle: Text.propTypes.style,
    activeItemStyle: ViewPropTypes.style,
    activeLabelStyle: Text.propTypes.style,
    showArrow: PropTypes.bool,
    arrowStyle: ViewPropTypes.style,
    arrowColor: PropTypes.string,
    arrowSize: PropTypes.number,
    customArrowUp: PropTypes.func,
    customArrowDown: PropTypes.func,
    customTickIcon: PropTypes.func,
    zIndex: PropTypes.number,
    disabled: PropTypes.bool,
    searchable: PropTypes.bool,
    searchablePlaceholder: PropTypes.string,
    searchableError: PropTypes.func,
    searchableStyle: Text.propTypes.style,
    searchablePlaceholderTextColor: PropTypes.string,
    isVisible: PropTypes.bool,
    autoScrollToDefaultValue: PropTypes.bool,
    multiple: PropTypes.bool,
    multipleText: PropTypes.string,
    min: PropTypes.number,
    max: PropTypes.number,
    selectedLabelLength: PropTypes.number,
    labelLength: PropTypes.number,
    scrollViewProps: PropTypes.object,
    searchTextInputProps: PropTypes.object,
    controller: PropTypes.func,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    onChangeItem: PropTypes.func,
    onChangeList: PropTypes.func,
};

const styles = StyleSheet.create({
    arrow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
    },
    dropDown: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#fff',
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
        borderWidth: 1,
        borderColor: '#dfdfdf',
        alignItems: 'center'
    },
    dropDownBox: {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        width: '100%'
    },
    dropDownItem: {
        paddingVertical: 8,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    input: {
      flex: 1,
      borderColor: '#dfdfdf',
      borderBottomWidth: 1,
      paddingHorizontal: 0,
      paddingVertical: 8,
      marginBottom: 10,
    },
    hidden: {
        position: 'relative',
        display: 'none',
        borderWidth: 0
    },
    noBottomRadius: {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    notFound: {
        marginVertical: 10,
        marginBottom: 15,
        alignItems: 'center'
    }
});

export default DropDownPicker;
