import React, { useEffect } from 'react';
import { StatusBar, View, FlatList, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import CartRow from '../components/cartRow/CartRow';
import { CartItem } from '../types/CartItem';
import { AuthUser } from '../types/AuthUser';
import 'firebase/database';
import { getDatabase, ref, set, get, child } from "firebase/database";
import { FirebaseDatabase } from "../util/Constants";
import { useDispatch, useSelector } from 'react-redux';
import {
    selectIsLoading, selectCart, setIsLoading,
    setCart, removeFromCart
} from '../redux/slices/cartSlice';
import { selectUser } from '../redux/slices/authSlice';

const { width } = Dimensions.get('screen')

interface IProps {
    navigation: any;
    route: any;
}

export const CartScreen = (props: IProps) => {
    const { navigation } = props;

    const isLoading = useSelector(selectIsLoading)
    const cartItems = useSelector(selectCart)
    const user: AuthUser = useSelector(selectUser)
    const dispatch = useDispatch();

    const KEY_USERS = FirebaseDatabase.usersKey;
    const KEY_CART = FirebaseDatabase.cartKey;

    useEffect(() => {
        if (user) {
            dispatch(setIsLoading(true))
            getCartItems();
        } else {
            navigation.navigate("Login")
        }
    }, [user])

    const getCartItems = async () => {
        dispatch(setIsLoading(true))
        let cartList: CartItem[] = [];
        try {
            const USER_ID = user.uid;
            const cartPath = KEY_USERS + USER_ID + KEY_CART

            const cartRef = ref(getDatabase());
            get(child(cartRef, cartPath)).then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    if (data != null) {
                        for (const key of Object.keys(data)) {
                            const it: CartItem = data[key];

                            const item: CartItem = {
                                id: it.id,
                                title: it.title,
                                size: it.size,
                                price: it.price,
                                quantity: it.quantity,
                                thumbnail: it.thumbnail,
                            }
                            cartList.push(item)
                        }
                    }
                    dispatch(setCart(cartList))
                }
            }).catch((error) => {
                console.error(error);
            });
            dispatch(setIsLoading(false))
        } catch (e) {
            console.log(e);
            dispatch(setCart(cartList))
            dispatch(setIsLoading(false))
        }
    }

    const removeItem = async (item) => {
        dispatch(removeFromCart(item.id))
        updateCart(item)
    }

    const updateCart = async (item) => {
        try {
            const USER_ID = user.uid;
            const ITEM_ID = item.id;
            const cartPath = KEY_USERS + USER_ID + KEY_CART

            const db = getDatabase();
            set(ref(db, cartPath + ITEM_ID),
                null
            );
        } catch (e) {
            console.log(e);
        }
    }

    let totalPrice = cartItems.map((item) => item.price * item.quantity).reduce((prev, curr) => prev + curr, 0).toFixed(2);
    let priceString = String(totalPrice);
    let totalItems = cartItems.map((item) => item.quantity).reduce((prev, curr) => prev + curr, 0);

    return (
        <View style={styles.container}>
            {!isLoading ? (
                <>
                    <View style={styles.scrollViewContainer} >
                        {cartItems.length > 0 &&
                            <FlatList
                                data={cartItems}
                                renderItem={({ item, index }) => <CartRow item={item} navigation={navigation} removeItem={removeItem} />}
                            />
                        }
                    </View>
                    <View style={styles.checkoutContainer}>
                        <Text style={styles.checkOutText}>Items: {totalItems}</Text>
                        <Text style={styles.checkOutText}>Amount: ${priceString}</Text>

                        <View style={styles.checkOutButtonContainer} >
                            <TouchableOpacity style={styles.button} onPress={null} >
                                <Text style={styles.buttonText}>Checkout</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </>
            ) : (
                <View style={styles.container} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        width: width - 40,
        height: 50,
        backgroundColor: 'black',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },

    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10,
        color: 'white',
    },

    container: {
        height: '100%',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f2f2f2',
        paddingTop: StatusBar.currentHeight
    },

    checkoutContainer: {
        height: 190,
        width: '100%',
        flexDirection: 'column',
        elevation: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderTopWidth: 1.1,
        borderTopColor: '#999999',
        borderLeftWidth: 1.1,
        borderLeftColor: '#999999',
        borderRightWidth: 1.1,
        borderRightColor: '#999999',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        backgroundColor: 'white',
        paddingTop: StatusBar.currentHeight
    },

    checkOutButtonContainer: {
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    checkOutInnerContainer: {
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: 'white'
    },

    checkOutText: {
        fontSize: 18,
        width: 190,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'right',
        marginBottom: 10,
        marginRight: 30
    },

    image: {
        flex: 1,
        minHeight: 220,
        maxHeight: 220,
        resizeMode: 'contain'
    },

    imageContainer: {
        height: 150,
        width: '100%',
        flexDirection: 'column',
        elevation: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderTopWidth: 1.1,
        borderTopColor: '#999999',
        borderLeftWidth: 1.1,
        borderLeftColor: '#999999',
        borderRightWidth: 1.1,
        borderRightColor: '#999999',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        backgroundColor: 'white',
        paddingTop: StatusBar.currentHeight
    },

    innerContainer: {
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: 'white'
    },

    scrollViewContainer: {
        flex: 1,
    },

    toolBarContainer: {
        flexDirection: 'row',
        width: width,
        minHeight: 70,
        maxHeight: 70,
        elevation: 6,
        marginBottom: 10,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },

    title: {
        fontSize: 18,
        width: 190,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        paddingTop: 3
    },
})

export default CartScreen;