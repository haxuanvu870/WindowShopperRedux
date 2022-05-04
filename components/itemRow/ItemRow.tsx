import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Item } from '../../types/Item';

interface IProps {
    item: Item;
    navigation: any;
}

const ItemRow = (props: IProps) => {
    const { item } = props;
    const { navigation } = props;

    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.push('ItemDetails', { selectedItem: item })}>

            <Image style={styles.thumbnail} source={{ uri: item.image }} />

            <View style={styles.detailsContainer}>
                <Text numberOfLines={1} style={styles.title}>{item.title}</Text>
                <Text numberOfLines={1} style={styles.subtext}>${item.price}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({

    container: {
        flexDirection: 'column',
        height: 310,
        width: 200,
        elevation: 6,
        marginLeft: 5,
        marginBottom: 5,
        borderRadius: 7,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },

    detailsContainer: {
        flexDirection: 'column',
        height: 60,
        width: '100%',
        backgroundColor: '#1f1f1f',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },

    subtext: {
        fontSize: 10,
        flex: 1,
        width: '100%',
        color: 'white',
        textAlign: 'center',
        justifyContent: 'center',
    },

    thumbnail: {
        flexGrow: 1,
        minWidth: '100%',
        maxWidth: '100%',
        borderRadius: 2,
    },

    title: {
        fontSize: 14,
        width: '100%',
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        justifyContent: 'center',
        marginTop: 14
    },

});

export default ItemRow;