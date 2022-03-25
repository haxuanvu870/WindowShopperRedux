import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface IProps {
    price: string;
}

const PriceBubble = (props: IProps) => {
    const { price } = props;

    return (
        <TouchableOpacity style={styles.container} >
            <Text style={styles.priceText}>{price}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 30,
        width: 70,
        borderRadius: 30,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 6
    },

    priceText: {
        fontSize: 13,
        fontWeight: 'bold',
        textTransform: 'capitalize',
        color: 'white',
        justifyContent: 'center',
    },

});

export default PriceBubble;