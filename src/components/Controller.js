import React from 'react';
import { View, Text } from 'react-native';
import tailwind from 'tailwind-rn';

const Controller = ({length}) => {

    return(
        <View>
            <Text style={tailwind('text-lg font-bold text-blue-500 p-3')}>{length}</Text>
        </View>
    )
}

export default Controller;