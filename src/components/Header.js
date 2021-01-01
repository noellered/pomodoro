import React from 'react';
import { View, Text } from 'react-native';
import tailwind from 'tailwind-rn';

const MyHeader = () => {
    return(
        <View style={tailwind('bg-gray-400 w-full pt-11 pb-4')}>
            <Text style={tailwind('text-center text-white font-bold text-lg')}>Efficiency Timer</Text>
        </View>
    )
}

export default MyHeader;