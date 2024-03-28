import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

export default function App() {
  // Componente Rhombus para renderizar el rombo
  const Rhombus = () => {
    // Valor compartido para la animación de la posición del rombo
    const offset = useSharedValue(0);

    // Estilo animado para el rombo
    const animatedStyles = useAnimatedStyle(() => ({
      transform: [{ translateX: offset.value * 200 }, { rotateZ: `${offset.value * 360}deg` }]
    }));

    // Función para manejar el botón de movimiento
    const handleMoveButtonPress = () => {
      // Actualiza el valor compartido para iniciar la animación
      offset.value = withSpring(Math.random());
    };

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.rhombus, animatedStyles]} />
        <Button title="Move Rhombus" onPress={handleMoveButtonPress} />
      </View>
    );
  };

  // Componente para los valores compartidos
  function SharedValues() {
    // Valor compartido para la animación del ancho
    const randomWidth = useSharedValue(10);

    // Configuración de la animación
    const config = {
      duration: 500,
    };

    // Estilo animado para el componente Animated.View
    const myStyle = useAnimatedStyle(() => ({
      width: withTiming(randomWidth.value, config)
    }));

    return (
      <>
        <Text style={styles.title}>Shared Values</Text>
        <Animated.View style={[styles.animationContainer, myStyle]} />
        <Button
          title="Toggle Width"
          onPress={() => {
            randomWidth.value = Math.random() * 350;
          }}
        />
      </>
    );
  }

  // Componente para la caja animada
  function Box() {
    // Valor compartido para la animación del desplazamiento horizontal
    const offset = useSharedValue(0);

    // Estilo animado para el desplazamiento de la caja
    const animatedStyles = useAnimatedStyle(() => ({
      transform: [{ translateX: offset.value * 300 }]
    }));

    return (
      <>
        <Text style={styles.title}>Default Spring</Text>
        <Animated.View style={[styles.box, animatedStyles]} />
        <Button
          onPress={() => (offset.value = withSpring(Math.random()))}
          title="Move"
        />
      </>
    );
  }

  return (
    <View style={styles.container}>
      <SharedValues />
      <Box />
      <Rhombus />
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 70,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 70,
  },
  animationContainer: {
    height: 30,
    backgroundColor: '#F0F',
    marginBottom: 10,
  },
  box: {
    height: 100,
    width: 100,
    backgroundColor: 'purple',
    borderRadius: 10,
    marginBottom: 20,
  },
  rhombus: {
    width: 100,
    height: 100,
    backgroundColor: 'black',
    transform: [{ rotate: '45deg' }], // Rotar el rombo 45 grados
  },
});

