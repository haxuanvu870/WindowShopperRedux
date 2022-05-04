import React, { Dispatch, SetStateAction } from 'react';
import { Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface IProps {
    content: string;
    selectedHandler: Dispatch<SetStateAction<string>>;
    selectedItem: string;
}

/**
 * @param {{ 
 * content: string,
 * selectedHandler: Dispatch<SetStateAction<string>>,
 * selectedItem: string
 * }} props 
 * @returns
 */

/**
 * RadioBubble is a component to be used as a radio button. This is used in
 * ItemDetailsScreen to select the size or quantity of a retail item.
 * This component is passed content as string for specifying the text in the buttons.
 * Additionally, a handler for updating the state is passed for updating the state.
 * selectedItem is passed as a string to reference the currently selected item
 */
const RadioBubble = (props: IProps) => {
    const { content, selectedHandler, selectedItem } = props;

    //Uses the selectedHandler prop to update the state associated to handler
    const onSelected = () => {
        selectedHandler(content)
    }

    return (
        <TouchableOpacity
            style={content === selectedItem ? styles.selectedContainer : styles.unselectedContainer}
            onPress={onSelected}
        >
            <Text style={content === selectedItem ? styles.selectedText : styles.unselectedText}>{content}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    selectedContainer: {
        height: 50,
        width: 50,
        borderRadius: 30,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 6
    },

    selectedText: {
        fontSize: 15,
        fontWeight: 'bold',
        textTransform: 'capitalize',
        color: 'white',
        justifyContent: 'center',
    },

    unselectedContainer: {
        height: 50,
        width: 50,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },

    unselectedText: {
        fontSize: 15,
        fontWeight: 'bold',
        textTransform: 'capitalize',
        color: 'black',
    },

});

export default RadioBubble;