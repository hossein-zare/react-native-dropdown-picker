import React, { memo, useCallback, useMemo } from 'react';

import { Text, TouchableOpacity, View } from 'react-native';

import { RTL_DIRECTION, RTL_STYLE } from '../constants';

/**
 *
 * @param root0
 * @param root0.rtl
 * @param root0.label
 * @param root0.props
 * @param root0.value
 * @param root0.textStyle
 * @param root0.badgeStyle
 * @param root0.badgeTextStyle
 * @param root0.badgeDotStyle
 * @param root0.getBadgeColor
 * @param root0.getBadgeDotColor
 * @param root0.showBadgeDot
 * @param root0.onPress
 * @param root0.THEME
 */
function RenderBadge({
  rtl,
  label,
  props,
  value,
  textStyle,
  badgeStyle,
  badgeTextStyle,
  badgeDotStyle,
  getBadgeColor,
  getBadgeDotColor,
  showBadgeDot,
  onPress,
  THEME,
}) {
  /**
   * onPress.
   */
  const __onPress = useCallback(() => onPress(value), [onPress, value]);

  /**
   * The badge style.
   * @returns {object}
   */
  const _badgeStyle = useMemo(
    () => [
      RTL_DIRECTION(rtl, THEME.badgeStyle),
      ...[badgeStyle].flat(),
      {
        backgroundColor: getBadgeColor(value),
      },
    ],
    [THEME, rtl, badgeStyle, getBadgeColor],
  );

  /**
   * The badge dot style.
   * @returns {object}
   */
  const _badgeDotStyle = useMemo(
    () => [
      RTL_STYLE(rtl, THEME.badgeDotStyle),
      ...[badgeDotStyle].flat(),
      {
        backgroundColor: getBadgeDotColor(value),
      },
    ],
    [THEME, rtl, badgeDotStyle, getBadgeDotColor],
  );

  /**
   * The badge text style.
   * @returns {object}
   */
  const _badgeTextStyle = useMemo(
    () => [...[textStyle].flat(), ...[badgeTextStyle].flat()],
    [textStyle, badgeTextStyle],
  );

  return (
    <TouchableOpacity style={_badgeStyle} {...props} onPress={__onPress}>
      {showBadgeDot && <View style={_badgeDotStyle} />}
      <Text style={_badgeTextStyle}>{label}</Text>
    </TouchableOpacity>
  );
}

const areEqual = (nextProps, prevProps) => {
  if (nextProps.label !== prevProps.label) return false;
  if (nextProps.value !== prevProps.value) return false;
  if (nextProps.showBadgeDot !== prevProps.showBadgeDot) return false;
  if (nextProps.rtl !== prevProps.rtl) return false;
  if (nextProps.theme !== prevProps.theme) return false;

  return true;
};

export default memo(RenderBadge, areEqual);
