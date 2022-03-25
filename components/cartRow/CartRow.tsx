import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { CartItem } from '../../types/CartItem';
import close from '../../assets/ic_close.png';
import 'firebase/database';
import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";
import firebaseConfig from '../../service/Firebase';

const { width } = Dimensions.get('screen');

interface IProps {
    item: CartItem;
    removeFromCart: (id, quantity) => void;
    navigation: any;
}

const CartRow = (props: IProps) => {
    const { item } = props;
    const { navigation } = props;
    const { removeFromCart } = props;

    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);

    let name: string = item.title
    let imgUrl: string = item.thumbnail
    let quantity = item.quantity
    let price = item.price

    return (
        <View style={styles.container}>
            <Image style={styles.thumbnail} source={{ uri: imgUrl }} />

            <View style={styles.innerContainer}>
                <View style={styles.headerContainer} >
                    <Text style={styles.title}>{name}</Text>
                    <TouchableOpacity style={styles.deleteButton} onPress={() => removeFromCart(item.id, item.quantity)}>
                        <Image style={styles.deleteIcon} source={close} />
                    </TouchableOpacity>
                </View>
                <View style={styles.footerContainer} >
                    <Text style={styles.subtext}>Qty: {quantity}</Text>
                    <Text style={styles.subtext}>${price}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        height: 130,
        width: width - 10,
        alignItems: 'center',
        backgroundColor: 'white',
        elevation: 6,
        marginBottom: 5,
        borderRadius: 5,
        borderLeftWidth: 0.5,
        borderLeftColor: '#999999',
        borderTopWidth: 0.5,
        borderTopColor: '#999999',
        borderBottomWidth: 0.5,
        borderBottomColor: '#999999',
    },

    deleteButton: {
        flexDirection: 'row',
        height: 30,
        width: 30,
        backgroundColor: 'black',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },

    deleteIcon: {
        flexGrow: 1,
        height: 12,
        width: 12,
        resizeMode: 'contain',
        justifyContent: 'center',
        alignItems: 'center',
        tintColor: 'white',
        marginLeft: 0
    },

    innerContainer: {
        flexDirection: 'column',
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },

    headerContainer: {
        flexDirection: 'row',
        flex: 1,
        minHeight: 30,
        maxHeight: 30,
        width: '100%',
        justifyContent: 'space-between',
        marginTop: 10,
    },

    footerContainer: {
        flexDirection: 'row',
        flex: 1,
        minHeight: 30,
        maxHeight: 30,
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 60
    },

    ratingsContainer: {
        flexDirection: 'row',
        height: 20,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },

    rating: {
        fontSize: 13,
        height: 23,
        width: '100%',
        marginBottom: 4,
        marginLeft: 10,
        color: 'black',
        textAlign: 'center',
        justifyContent: 'flex-start',
    },

    subtitles: {
        fontSize: 16,
        marginLeft: 20,
        marginBottom: 5,
        marginTop: 3,
        color: '#999999',
        justifyContent: 'center',
    },

    star: {
        height: 12,
        width: 12,
        marginTop: 4
    },

    thumbnail: {
        height: 115,
        width: 125,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        resizeMode: 'contain',
    },

    subtext: {
        fontSize: 18,
        height: '100%',
        color: 'black',
        marginRight: 10,
        marginBottom: 10,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },

    title: {
        fontSize: 18,
        height: '100%',
        fontWeight: 'bold',
        color: 'black',
        marginLeft: 0,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },

    titleContainer: {
        flexDirection: 'row',
        width: '100%',
        height: 25,
        justifyContent: 'flex-start',
    },

});

export default CartRow;

