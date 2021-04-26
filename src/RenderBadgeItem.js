import React, {
    memo, useCallback, useMemo
} from 'react';

import {
    TouchableOpacity,
    View,
    Text,
} from 'react-native';

import Styles from './assets/styles';

function RenderBadge({
    label,
    value,
    textStyle,
    badgeStyle,
    badgeTextStyle,
    badgeDotStyle,
    getBadgeColor,
    getBadgeDotColor,
    showBadgeDot,
    onPress
}) {
    /**
     * onPress.
     */
    const __onPress = useCallback(() => onPress(value), [onPress, value]);

    /**
     * The badge style.
     * @returns {object}
     */
    const _badgeStyle = useMemo(() => ([
        Styles.badgeStyle,
        ...[badgeStyle].flat(), {
            backgroundColor: getBadgeColor(value)
        }
    ]), [badgeStyle, getBadgeColor]);

    /**
     * The badge dot style.
     * @return {object}
     */
    const _badgeDotStyle = useMemo(() => ([
        Styles.badgeDotStyle,
        ...[badgeDotStyle].flat(), {
            backgroundColor: getBadgeDotColor(value)
        }
    ]), [badgeDotStyle, getBadgeDotColor]);

    /**
     * The badge text style.
     * @returns {object}
     */
    const _badgeTextStyle = useMemo(() => ([
        ...[textStyle].flat(),
        ...[badgeTextStyle].flat()
    ]), [textStyle, badgeTextStyle]);

    return (
        <TouchableOpacity style={_badgeStyle} onPress={__onPress}>
            {showBadgeDot && <View style={_badgeDotStyle} />}
            <Text style={_badgeTextStyle}>{label}</Text>
        </TouchableOpacity>
    );
}

const areEqual = (nextProps, prevProps) => {
    if (nextProps.label !== prevProps.label)
        return false;
    if (nextProps.value !== prevProps.value)
        return false;
    if (nextProps.showBadgeDot !== prevProps.showBadgeDot)
        return false;

    return true;
}

export default memo(RenderBadge, areEqual);