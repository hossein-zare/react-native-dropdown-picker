import React, { Component } from 'react';
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

class PickerDropDown extends Component {
    constructor(props) {
        super(props);

        let choice;

        if (props.defaultNull) {
            choice = {
                label: null,
                value: null
            }
        } else if (props.defaultValue) {
            choice = props.items.find(item => item.value === props.defaultValue)
        } else if (props.items.filter(item => item.hasOwnProperty('selected') && item.selected === true).length > 0) {
            choice = props.items.filter(item => item.hasOwnProperty('selected') && item.selected === true)[0];
        } else {
            choice = props.items[props.defaultIndex ?? 0];
        }
        
        this.state = {
            choice: {
                label: choice.label,
                value: choice.value
            },
            visible: false
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

        // onChangeItem callback
        this.props.onChangeItem(item, index);
    }

    render() {
        const { defaultNull, placeholder, disabled = false } = this.props;
        const label = defaultNull && this.state.choice.label === null ? (placeholder) : this.state.choice.label;
        return (
            <View style={{...this.props.style}}>
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
                }]}>
                    <ScrollView style={{width: '100%'}}>
                        {
                            this.props.items.map((item, index) => (
                                <TouchableOpacity key={index} onPress={() => this.select(item, index)} style={{...styles.dropDownItem, ...this.props.itemStyle}}>
                                    <Text style={this.props.labelStyle}>{item.label}</Text>
                                </TouchableOpacity>
                            ))
                        }
                    </ScrollView>
                </View>
            </View>
        );
    }
}

PickerDropDown.defaultProps = {
    placeholder: 'Select...',
    dropDownMaxHeight: 150,
    onChangeItem: () => {},
};

PickerDropDown.propTypes = {
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
        width: '100%',
        zIndex: 5001
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

export default PickerDropDown;
