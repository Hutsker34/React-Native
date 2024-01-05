import { View, StyleSheet, Text, Dimensions } from 'react-native';
import React, { useEffect } from 'react';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, withSequence } from 'react-native-reanimated';

const Snowflake = () => {
  // Window dimensions for calculating movement
  const windowDim = Dimensions.get('window');
  const maxw = windowDim.width;
  const maxh = windowDim.height;

  // Position values
  const x = useSharedValue(Math.random() * maxw); // Random initial x position
  const y = useSharedValue(-50); // Start position off-screen

  // Define the animated styles
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: x.value }, { translateY: y.value }],
      position: 'absolute',
    };
  });

  useEffect(() => {
    // Vertical motion (falling down)
    y.value = withRepeat(withTiming(maxh + 50, { duration: 10000 }), -1, true); // Adjust timing for speed

    // Horizontal sway motion (side to side)
    const duration = 3000; // Duration of one sway movement
    x.value = withRepeat(
      withSequence(
        withTiming(x.value - 30, { duration }), // Move left
        withTiming(x.value + 30, { duration }) // Move right
      ),
      -1, // Repeat indefinitely
      true // Yoyo effect: go back and forth
    );
  }, []);

  return (
    <Animated.View style={[styles.snowflake, animatedStyles]}>
      <Text style={styles.text}>
        ❄
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  snowflake: {
    // Define the size, color, and other styles for your snowflake
    color: 'white',
  },
  text: {
    color: 'white',
    fontSize: 24, // or any other size
  },
});

export default Snowflake;