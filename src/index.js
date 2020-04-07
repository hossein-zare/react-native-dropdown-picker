import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import PropTypes from 'prop-types';

// Icon
import Feather from 'react-native-vector-icons/Feather';

class DropDownPicker extends React.Component {
    constructor(props) {
        super(props);

        let choice;

        if (props.defaultNull || (props.hasOwnProperty('defaultValue') && props.defaultValue === null)) {
            choice = {
                label: null,
                value: null
            }
        } else if (props.defaultValue) {
            choice = props.items.find(item => item.value === props.defaultValue)
        } else if (props.items.filter(item => item.hasOwnProperty('selected') && item.selected === true).length > 0) {
            choice = props.items.filter(item => item.hasOwnProperty('selected') && item.selected === true)[0];
        } else if (props.items.length > 0) {
            choice = props.items[props.defaultIndex ?? 0];
        } else {
            choice = {
                label: null,
                value: null
            }
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

    render() {
        const { defaultNull, placeholder, disabled } = this.props;
        const label = (defaultNull) && this.state.choice.label === null ? (placeholder) : this.state.choice.label;
        return (
            <View style={[this.props.style]}>
                <TouchableOpacity disabled={disabled} onPress={() => this.toggle()} activeOpacity={1} style={{flexDirection: 'row'}}>
                    <View style={[styles.dropDown, styles.dropDownDisplay, this.state.visible && styles.noBottomLeftRadius]}>
                        <Text style={[this.props.labelStyle, {
                            opacity: disabled ? 0.5 : 1
                        }]}>{label}</Text>
                    </View>
                    <View style={[styles.dropDown, styles.arrow, this.state.visible && styles.noBottomRightRadius]}>
                        <View style={{
                            opacity: disabled ? 0.5 : 1
                        }}>
                        {
                            ! this.state.visible ? <Feather name="chevron-down" size={15} /> : <Feather name="chevron-up" size={15} />
                        }
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={[styles.dropDown, styles.dropDownBox, ! this.state.visible && styles.hidden, {
                    maxHeight: this.props.dropDownMaxHeight,
                    zIndex: this.props.zIndex
                }]}>
                    <ScrollView style={{width: '100%'}}>
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
    itemStyle: {},
    labelStyle: {},
    activeItemStyle: {},
    activeLabelStyle: {},
    zIndex: 5000,
    disabled: false,
    onChangeItem: () => {},
};

DropDownPicker.propTypes = {
    items: PropTypes.array.isRequired,
    style: PropTypes.object,
    itemStyle: PropTypes.object,
    labelStyle: PropTypes.object,
    dropDownMaxHeight: PropTypes.number,
    defaultNull: PropTypes.bool,
    defaultIndex: PropTypes.number,
    defaultValue: PropTypes.any,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    onChangeItem: PropTypes.func
};

const styles = StyleSheet.create({
    arrow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        height: 40,
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
        borderBottomWidth: 2,
        borderBottomColor: '#dfdfdf',
    },
    dropDownDisplay: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        height: 40,
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
        top: 39,
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
    noBottomLeftRadius: {
        borderBottomLeftRadius: 0,
    },
    noBottomRightRadius: {
        borderBottomRightRadius: 0,
    }
});

export default DropDownPicker;
