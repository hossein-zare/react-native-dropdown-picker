import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Platform
} from 'react-native';
import PropTypes from 'prop-types';

// Icon
import Feather from 'react-native-vector-icons/Feather';

class DropDownPicker extends React.Component {
    constructor(props) {
        super(props);

        let choice;

        if (props.defaultNull || (props.hasOwnProperty('defaultValue') && props.defaultValue === null)) {
            choice = this.null();
        } else if (props.defaultValue) {
            choice = props.items.find(item => item.value === props.defaultValue);
        } else if (props.items.filter(item => item.hasOwnProperty('selected') && item.selected === true).length > 0) {
            choice = props.items.filter(item => item.hasOwnProperty('selected') && item.selected === true)[0];
        } else if (props.items.length > 0) {
            choice = props.items[props.defaultIndex ?? 0];
        } else {
            choice = this.null();
        }
        
        this.state = {
            choice: {
                label: choice.label,
                value: choice.value
            },
            visible: false,
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (props.defaultNull === true) {
            return {
                choice: {
                    label: null,
                    value: null
                },
                visible: props.disabled ? false : state.visible,
            };
        }

        return null;
    }

    null() {
        return {
            label: null,
            value: null
        }
    }

    toggle() {
        this.setState({
            visible: ! this.state.visible
        });
    }

    select(item, index) {
        this.setState({
            choice: {
                label: item.label,
                value: item.value
            },
            visible: false
        });

        this.props.defaultNull = false;

        // onChangeItem callback
        this.props.onChangeItem(item, index);
    }

    getLayout(layout) {
        this.setState({
            top: layout.height - 1
        });
    }

    render() {
        const { defaultNull, placeholder, disabled } = this.props;
        const isPlaceholderActive = (defaultNull) && this.state.choice.label === null;
        const label = isPlaceholderActive ? (placeholder) : this.state.choice.label;
        const placeholderStyle = isPlaceholderActive && this.props.placeholderStyle;
        const opacity = disabled ? 0.5 : 1;
        return (
            <View style={[this.props.containerStyle, {
                ...Platform.select({
                    ios: {
                      zIndex: this.props.zIndex 
                    }
                })
            }]}>
                <TouchableOpacity onLayout={(event) => { this.getLayout(event.nativeEvent.layout) }} disabled={disabled} onPress={() => this.toggle()} activeOpacity={1} style={[styles.dropDown, this.props.style, this.state.visible && styles.noBottomRadius, {flexDirection: 'row', flex: 1}]}>
                    <View style={[styles.dropDownDisplay]}>
                        <Text style={[this.props.labelStyle, placeholderStyle, {opacity}]}>{label}</Text>
                    </View>
                    {this.props.showArrow && (
                        <View style={[styles.arrow]}>
                            <View style={[this.props.arrowStyle, {opacity}]}>
                            {
                                ! this.state.visible ? (
                                    this.props.customArrowUp ?? <Feather name="chevron-down" size={this.props.arrowSize} color={this.props.arrowColor} />
                                ) : (
                                    this.props.customArrowDown ?? <Feather name="chevron-up" size={this.props.arrowSize} color={this.props.arrowColor} />
                                )
                            }
                            </View>
                        </View>
                    )}
                </TouchableOpacity>
                <View style={[styles.dropDown, styles.dropDownBox, this.props.dropDownStyle, ! this.state.visible && styles.hidden, {
                    top: this.state.top,
                    maxHeight: this.props.dropDownMaxHeight,
                    zIndex: this.props.zIndex
                }]}>
                    <ScrollView style={{width: '100%', zIndex: this.props.zIndex}} nestedScrollEnabled={true}>
                        {
                            this.props.items.map((item, index) => (
                                <TouchableOpacity key={index} onPress={() => this.select(item, index)} style={[styles.dropDownItem, this.props.itemStyle, (
                                    this.state.choice.value === item.value && this.props.activeItemStyle
                                )]}>
                                    <Text style={[this.props.labelStyle, 
                                        this.state.choice.value === item.value && this.props.activeLabelStyle
                                    ]}>{item.label}</Text>
                                </TouchableOpacity>
                            ))
                        }
                    </ScrollView>
                </View>
            </View>
        );
    }
}

DropDownPicker.defaultProps = {
    defaultNull: false,
    placeholder: 'Select an item',
    dropDownMaxHeight: 150,
    style: {},
    dropDownStyle: {},
    containerStyle: {},
    itemStyle: {},
    labelStyle: {},
    placeholderStyle: {},
    activeItemStyle: {},
    activeLabelStyle: {},
    arrowStyle: {},
    arrowColor: '#000',
    showArrow: true,
    arrowSize: 15,
    customArrowUp: null,
    customArrowDown: null,
    zIndex: 5000,
    disabled: false,
    onChangeItem: () => {},
};

DropDownPicker.propTypes = {
    items: PropTypes.array.isRequired,
    defaultIndex: PropTypes.number,
    defaultValue: PropTypes.any,
    defaultNull: PropTypes.bool,
    placeholder: PropTypes.string,
    dropDownMaxHeight: PropTypes.number,
    style: PropTypes.object,
    dropDownStyle: PropTypes.object,
    containerStyle: PropTypes.object,
    itemStyle: PropTypes.object,
    labelStyle: PropTypes.object,
    activeItemStyle: PropTypes.object,
    activeLabelStyle: PropTypes.object,
    showArrow: PropTypes.bool,
    arrowStyle: PropTypes.object,
    arrowColor: PropTypes.string,
    arrowSize: PropTypes.number,
    customArrowUp: PropTypes.any,
    customArrowDown: PropTypes.any,
    zIndex: PropTypes.number,
    disabled: PropTypes.bool,
    onChangeItem: PropTypes.func
};

const styles = StyleSheet.create({
    arrow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
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
    },
    dropDownDisplay: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        flexGrow: 1
    },
    dropDownBox: {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        position: 'absolute',
        width: '100%'
    },
    dropDownItem: {
        paddingVertical: 8,
        width: '100%',
        justifyContent: 'center'
    },
    hidden: {
        position: 'relative',
        display: 'none'
    },
    noBottomRadius: {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    }
});

export default DropDownPicker;