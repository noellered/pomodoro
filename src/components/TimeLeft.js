import React from 'react';
import { View, Text, Pressable } from 'react-native';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import tailwind from 'tailwind-rn';

momentDurationFormatSetup(moment);

const TimeLeft = ({ timeLeft, timerLabel, startStopButtonTitle, handleStartStop, handleTimerReset}) => {
    
    const formattedTimeLeft = moment.duration(timeLeft, 's').format('mm:ss', {trim: false});

    return(
        <View style={styles.container}>
            <Text style={styles.sectionHeader}>{timerLabel} Time!</Text>
            <View style={styles.timeGroup}>
                <Text style={styles.timer}>{formattedTimeLeft}</Text>
            </View>
            <View style={styles.flexRowCenter}>
                <Pressable onPress={handleStartStop} style={styles.pressablePrimary}>
                    <Text style={styles.buttonTextPrimary}>{startStopButtonTitle}</Text>
                </Pressable>
                <Pressable onPress={handleTimerReset} style={styles.pressableSecondary}>
                    <Text style={styles.buttonTextSecondary}>Reset</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = {
    container: tailwind('w-1/2 justify-center h-1/2'),
    buttonTextPrimary: tailwind('text-white uppercase font-bold text-center py-1'),
    buttonTextSecondary: tailwind('text-indigo-500 uppercase font-bold py-1'),
    pressablePrimary: tailwind('bg-indigo-500 mr-2 p-3 rounded-md w-1/2'),
    pressableSecondary: tailwind('p-3 rounded-md ml-2'),
    sectionHeader: tailwind('text-indigo-400 text-center text-xl font-bold'),
    flexRowCenter: tailwind('flex flex-row justify-center'),
    timeGroup: tailwind('border-2 py-6 border-indigo-500 my-5'),
    timer: tailwind('text-4xl text-indigo-500 text-center font-bold'),
}

export default TimeLeft;