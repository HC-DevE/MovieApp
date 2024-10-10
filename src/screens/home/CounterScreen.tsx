import React, { useState } from 'react';
// import type {PropsWithChildren} from 'react';
import {
    SafeAreaView,
    // ScrollView,
    // StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View,
} from 'react-native';

import {
    Colors,
    // DebugInstructions,
    // Header,
    // LearnMoreLinks,
    // ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
// import {Button} from './src/components/Button';



const CounterScreen: React.FC = () => {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
        flex: 1,
    };

    const [counter, setCounter] = useState(0);

    return (
        <SafeAreaView style={backgroundStyle}>
            <View style={styles.container}>
                <Text style={styles.title}>Counter App</Text>
                <View style={styles.counterContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => setCounter((curr) => curr - 1)}>
                        <Text style={styles.buttonText}>Decrement</Text>
                    </TouchableOpacity>
                    <Text style={styles.counterText}>{counter}</Text>
                    <TouchableOpacity style={styles.button} onPress={() => setCounter((curr) => curr + 1)}>
                        <Text style={styles.buttonText}>Increment</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => setCounter(0)}>
                        <Text style={styles.buttonText}>Reset</Text>
                    </TouchableOpacity>
                    {/* <Button title="Increment" onPress={() => setCounter((curr) => curr + 1)} />
          <Text style={styles.counterText}>{counter}</Text>
          <Button title="Decrement" onPress={() => setCounter((curr) => curr - 1)} />
          <Button title="Reset" onPress={() => setCounter(0)} /> */}
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
    },
    counterContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    counterText: {
        fontSize: 24,
    },
    button: {
        padding: 10,
        backgroundColor: '#4682B4',
        margin: 10,
    },
    buttonText: {
        color: 'white',
    },
});

export default CounterScreen;
