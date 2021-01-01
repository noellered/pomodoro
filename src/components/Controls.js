import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { View, Text, Vibration, Pressable } from 'react-native';
import Controller from './Controller';
import TimeLeft from './TimeLeft';
import tailwind from 'tailwind-rn';


const Controls = () => {
    
    const [breakLength, setBreakLength] = useState(300) // 5 min in seconds
    const [workLength, setWorkLength] = useState(1500) // 25 min in seconds
    const [currentSessionType, setCurrentSessionType] = useState('Work'); // 'work' or 'break'
    const [intervalId, setIntervalId] = useState(null);
    const [timeLeft, setTimeLeft] = useState(workLength);

    useEffect(()=>{
        setTimeLeft(workLength)
    }, [workLength])

    useEffect(()=>{
        if(timeLeft <= 0){
            //vibrate
            Vibration.vibrate(1000)
            //pause timer
            clearInterval(intervalId)
            //handle switch
            handleSwitch();
        }
    }, [timeLeft])

    const handleSwitch = () => {
        // if work time
        if(currentSessionType == 'Work'){
            // switch to break
            setCurrentSessionType('Break');
            //start new interval
            setIntervalId(null)
            // set time left to breakLength
            return setTimeLeft(breakLength);
        } 
        // if break
        else if(currentSessionType == 'Break'){
            // switch to work
            setCurrentSessionType('Work');
            //start new interval
            setIntervalId(null)
            // set time left to workLength
            return setTimeLeft(workLength);
        }
    }

    const isRunning = intervalId !== null;

    const handleStartStop = () => {
        if(isRunning){
            //if time is running when button is pressed, stop the timer and clear interval
            if(intervalId){
                clearInterval(intervalId);
            }
            setIntervalId(null);
        } else {
            //if timer is stopped when button is pressed then start running
            //decrement timeLeft by 1 every second (1000ms)
            const newIntervalId = setInterval(() => {
                setTimeLeft(prevTimeLeft => {
                    const newTimeLeft = prevTimeLeft - 1;
                    if(newTimeLeft >= 0){
                        return newTimeLeft;
                    }
                })
            }, 1000); 
            setIntervalId(newIntervalId)
        }
    }


    const handleTimerReset = () => {
        // clear timeout intervall
        clearInterval(intervalId)
        // set interval id to null
        setIntervalId(null)
        // set session type to work
        setCurrentSessionType('Work')
        // reset session length to 25 min
        setWorkLength(25 * 60)
        // reset break length to 5 mins
        setBreakLength(5 * 60)
        // set timer to work length 25 mins
        setTimeLeft(25 * 60)
    }


    const handleDecrement = (type) => {
        switch(type) {
            case 'Break':
                let newLength = breakLength - 60;

                if (newLength > 0){
                    setBreakLength(newLength)
                }
                break;
            case 'Work':
                newLength = workLength - 60;
                if (newLength > 0){
                    setWorkLength(newLength)
                }
                break;
            default:
                setBreakLength(300);
                setWorkLength(1500);
        }
    }

    const handleIncrement = (type) => {
        switch(type) {
            case 'Break':
                let newLength = breakLength + 60;
                if (newLength <= (60 * 60)){ //limit to 60 mins
                    setBreakLength(newLength)
                }
                break;
            case 'Work':
                newLength = workLength + 60;
                if (newLength <= (60 * 60)){ //limit to 60 mins
                    setWorkLength(newLength)
                }
                break;
            default:
                setBreakLength(300);
                setWorkLength(1500);
        }
    }

    const breakLengthInMins = moment.duration(breakLength, 's').asMinutes();
    const workLengthInMins = moment.duration(workLength, 's').asMinutes();


    return(
        <View style={styles.container}>
            <TimeLeft 
                handleStartStop={handleStartStop}
                timerLabel={currentSessionType} 
                intervalId={intervalId}
                startStopButtonTitle={isRunning ? 'Stop' : 'Start'}
                timeLeft={timeLeft}
                handleTimerReset={handleTimerReset}
            />
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionHeader}>Time Adjustments</Text>
                <View style={styles.flexRowCenter}>
                    <View style={styles.flexCenter}>
                        <Text style={styles.length}>Break Length:</Text>
                        <Controller length={breakLengthInMins}/>
                        <View style={styles.timeGroup}>
                            <Pressable onPress={() => handleDecrement('Break')} style={styles.pressable}>
                                <Text style={styles.buttonText}>-</Text>
                            </Pressable>
                            <Pressable onPress={() => handleIncrement('Break')} style={styles.pressable}>
                                <Text style={styles.buttonText}>+</Text>
                            </Pressable>
                        </View>
                    </View>

                    <View style={styles.flexCenter}>
                        <Text style={styles.length}>Work Length:</Text>
                        <Controller length={workLengthInMins}/>
                        <View style={styles.timeGroup}>
                            <Pressable onPress={() => handleDecrement('Work')} style={styles.pressable}>
                                <Text style={styles.buttonText}>-</Text>
                            </Pressable>
                            <Pressable onPress={() => handleIncrement('Work')} style={styles.pressable}>
                                <Text style={styles.buttonText}>+</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
            
        </View>
    )
}


const styles = {
    container: tailwind('container flex items-center w-full  py-10'),
    buttonText: tailwind('text-center text-lg font-bold text-white p-1'),
    pressable: tailwind('w-10 mx-1 bg-blue-500 rounded-md'),
    sectionHeader: tailwind('text-indigo-400 text-center text-xl font-bold mt-3'),
    flexRowCenter: tailwind('flex flex-row px-5 justify-center'),
    flexCenter: tailwind('flex items-center p-5'),
    timeGroup: tailwind('flex flex-row'),
    length: tailwind('text-gray-600 pt-2'),
    sectionContainer: tailwind('w-full mt-5 flex items-center p-10')
}

export default Controls;