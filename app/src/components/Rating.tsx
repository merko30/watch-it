import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaskedView from '@react-native-community/masked-view';
import { Text } from '@/theme';

interface RatingProps {
  rating: string | number;
  size?: number;
  style?: StyleProp<ViewStyle>;
  maxVote?: number;
}

const styles = StyleSheet.create({
  container: { marginVertical: 8 },
  row: { flexDirection: 'row' },
  inactiveStars: {
    backgroundColor: 'gray',
  },
  activeStars: {
    backgroundColor: 'orange',
  },
});

const Rating = ({ rating, size = 18, maxVote = 5, style }: RatingProps) => {
  return (
    <View style={[styles.container, style]}>
      <MaskedView
        maskElement={
          <View style={styles.row}>
            {Array(maxVote)
              .fill(0)
              .map((_, i) => (
                <Icon key={i} name="star" size={size} color="gray" />
              ))}
          </View>
        }>
        <View
          style={[
            styles.inactiveStars,
            {
              height: size,
              width: size * maxVote,
            },
          ]}>
          <View
            style={[
              StyleSheet.absoluteFillObject,
              styles.activeStars,
              {
                width: size * (rating / 2),
                height: size,
              },
            ]}
          />
        </View>
      </MaskedView>
      <Text>
        {rating / 2} out of {maxVote}
      </Text>
    </View>
  );
};

export default Rating;
