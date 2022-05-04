import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import 'firebase/database';

const { width } = Dimensions.get('screen')

interface IProps {
    buttonText: string;
    buttonTextColor: string;
    buttonColor: string
    enabled: boolean;
    onPress: () => void;
}

/**
 * @param {{ 
 * buttonText: string,
 * buttonTextColor: string,
 * buttonColor: string,
 * enabled: boolean,
 * onPress: () => void
 * }} props 
 * @returns
 */

/**
 * RoundedButton creates a rounded button component.
 * This component receives props for modifying the appearance of the component.
 */
export const RoundedButton = (props: IProps) => {
    const { buttonText, buttonTextColor, buttonColor, enabled, onPress } = props;

    return (
        <TouchableOpacity style={enabled ? {...styles.enabledButton, backgroundColor: buttonColor} : styles.disabledButton} disabled={!enabled} onPress={onPress} >
            <Text style={enabled ? {...styles.enabledButtonText, color: buttonTextColor,} : styles.disabledButtonText}>{buttonText}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({

    disabledButton: {
        width: width - 120,
        height: 50,
        backgroundColor: '#8b8b8b',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40
    },

    disabledButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10,
        color: '#c7c7c7',
    },

    enabledButton: {
        width: width - 120,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40
    },

    enabledButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10,
    },

});

export default RoundedButton;