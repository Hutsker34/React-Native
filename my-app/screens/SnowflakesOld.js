import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions, Animated } from 'react-native';

const windowDim = Dimensions.get('window');
const maxw = windowDim.width;
const maxh = windowDim.height;
const snowflakesChar = ["❄", "❅", "❆"]; // Unicode snowflakes

const Snowflake = ({ style }) => {
  return <Animated.Text style={style}>❄</Animated.Text>;
};

const Snowflakes = () => {
  const [flakes, setFlakes] = useState([]);

  useEffect(() => {
    // Add initial set of flakes
    for (let i = 0; i < 5; i++) {
      addFlake();
    }

    const interval = setInterval(() => {
      moveFlakes();
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const addFlake = () => {
    const size = Math.random() * 12 + 8; // Random size between 16 and 40
    const x = new Animated.Value(Math.random() * maxw); // Random initial x position
    const y = new Animated.Value(-50); // Start above the screen
    const speed = Math.random() * 10 + 4;

    // Add the new flake to the array of flakes
    setFlakes(flakes => [
      ...flakes,
      { x, y, size, speed }
      
    ]);
    
  };


  const moveFlakes = () => {
    setFlakes(flakes => flakes.map(flake => {
      // Vertical movement
      const newY = flake.y._value + flake.speed; // Add the vertical speed to the y position
  
      // Horizontal movement: sway back and forth
      const sway = 10 * Math.sin(Date.now() / 1000); // This creates a simple back and forth motion
      const newX = flake.x._value + sway;
  
      // Update Animated Values
      flake.y.setValue(newY);
      flake.x.setValue(newX);
  
      // Reset flake to top if it goes below the screen
      if (newY > maxh) {
        flake.y.setValue(-50);
        flake.x.setValue(Math.random() * maxw);
      }
  
      return flake;
    }));
  };

  return (
    <View style={{ height: maxh, width: maxw, position: 'absolute', top: 0 ,pointerEvents: 'none', zIndex: -1}}>
      {flakes.map((flake, index) => (
        <Snowflake key={index} style={{
          color: 'white',
          fontSize: flake.size,
          position: 'absolute',
          left: flake.x,
          top: flake.y,
          pointerEvents: 'none', 
          zIndex: -1
        }} />
      ))}
    </View>
  );
};

export default Snowflakes;