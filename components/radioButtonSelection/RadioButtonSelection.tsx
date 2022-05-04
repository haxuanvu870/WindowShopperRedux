import React, { Dispatch, SetStateAction } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import RadioBubble from '../radioBubble/RadioBubble';

const { width } = Dimensions.get('screen')

interface IProps {
    contentType: string;
    selectedSizeHandler: Dispatch<SetStateAction<string>>;
    selectedQuantityHandler: Dispatch<SetStateAction<string>>;
    selectedSize: string;
    selectedQuantity: string
}

/**
 * @param {{ 
 * contentType: string,
 * selectedSizeHandler: Dispatch<SetStateAction<string>>,
 * selectedQuantityHandler: Dispatch<SetStateAction<string>>
 * selectedSize: string,
 * selectedQuantity: string
 * }} props 
 * @returns
 */

/**
 * RadioBubbleSelection is a container for the RadioBubble component.This is used in
 * ItemDetailsScreen to select the size or quantity of a retail item.
 */
const RadioBubbleSelection = (props: IProps) => {
    const { contentType, selectedSizeHandler, selectedQuantityHandler, selectedSize, selectedQuantity } = props;

    return (
        <View style={styles.container}>
            <Text style={styles.title} >{contentType}: </Text>
            <View style={styles.buttonContainer}>
                <RadioBubble
                    content={contentType === 'Sizes' ? 'S' : '1'}
                    selectedItem={contentType === 'Sizes' ? selectedSize : selectedQuantity}
                    selectedHandler={contentType === 'Sizes' ? selectedSizeHandler : selectedQuantityHandler}
                />
                <RadioBubble
                    content={contentType === 'Sizes' ? 'M' : '2'}
                    selectedItem={contentType === 'Sizes' ? selectedSize : selectedQuantity}
                    selectedHandler={contentType === 'Sizes' ? selectedSizeHandler : selectedQuantityHandler}
                />
                <RadioBubble
                    content={contentType === 'Sizes' ? 'L' : '3'}
                    selectedItem={contentType === 'Sizes' ? selectedSize : selectedQuantity}
                    selectedHandler={contentType === 'Sizes' ? selectedSizeHandler : selectedQuantityHandler}
                />
                <RadioBubble
                    content={contentType === 'Sizes' ? 'XL' : '4'}
                    selectedItem={contentType === 'Sizes' ? selectedSize : selectedQuantity}
                    selectedHandler={contentType === 'Sizes' ? selectedSizeHandler : selectedQuantityHandler}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        flex: 1,
        width: width,
        minHeight: 60,
        maxHeight: 70,
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonContainer: {
        flexDirection: 'row',
        flex: 1,
        minHeight: 70,
        maxHeight: 70,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginRight: 120
    },

    title: {
        fontSize: 18,
        flex: 1,
        fontWeight: 'bold',
        color: 'black',
        justifyContent: 'center',
        marginLeft: 60,
    },

});

export default RadioBubbleSelection;