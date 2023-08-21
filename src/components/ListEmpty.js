import React, { memo } from 'react';

import { Text, View } from 'react-native';

/**
 *
 * @param root0
 * @param root0.loading
 * @param root0.message
 * @param root0.ActivityIndicatorComponent
 * @param root0.listMessageContainerStyle
 * @param root0.listMessageTextStyle
 */
function ListEmpty({
  loading,
  message,
  ActivityIndicatorComponent,
  listMessageContainerStyle,
  listMessageTextStyle,
}) {
  return (
    <View style={listMessageContainerStyle}>
      {loading ? (
        <ActivityIndicatorComponent />
      ) : (
        <Text style={listMessageTextStyle}>{message}</Text>
      )}
    </View>
  );
}

export default memo(ListEmpty);
