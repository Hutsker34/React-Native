import React , { useState, useEffect} from 'react';
import { View } from 'react-native';
import Snowflake from './Snowflake'

const Snowflakes = () => {
  const [renderedComponents, setRenderedComponents] = useState([]);

  // Create an array for multiple snowflakes
  const snowflakes = Array.from({ length: 40 }, (_, index) => ({
    size: Math.random() * 12 + 6, 
    key: index,
    speed: Math.random() * 10 + 4,
  }));

  useEffect(() => {
    const renderWithDelay = async () => {
      for (const component of snowflakes) {
        await new Promise(resolve => setTimeout(resolve, Math.random() * 300)); // Рандомная задержка

        setRenderedComponents(prevComponents => [...prevComponents, component]);
      }
    };

    renderWithDelay();
  }, []);

  return (
    <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
      {renderedComponents.map(flake => (
        <Snowflake key={flake.key} size={flake.size} startX={flake.startX} speed={flake.speed}/>
      ))}
    </View>
  );
};

export default Snowflakes;