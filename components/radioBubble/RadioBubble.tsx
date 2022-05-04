import React, { Dispatch, SetStateAction } from 'react';
import { Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface IProps {
    content: string;
    selectedHandler: Dispatch<SetStateAction<string>>;
    selectedItem: string;
}

const RadioBubble = (props: IProps) => {
    const { content, selectedHandler, selectedItem } = props;

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