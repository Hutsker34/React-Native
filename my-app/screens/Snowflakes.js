import React from 'react';
import { View } from 'react-native';
import Snowflake from './Snowflake'

const Snowflakes = () => {
  // Create an array for multiple snowflakes
  const snowflakes = Array.from({ length: 20 }, (_, index) => ({
    size: Math.random() * 20 + 10, // Random size between 10 and 30
    startX: Math.random() * 300, // Random start position
    key: index,
  }));

  return (
    <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
      {snowflakes.map(flake => (
        <Snowflake key={flake.key} size={flake.size} startX={flake.startX} />
      ))}
    </View>
  );
};

export default Snowflakes;