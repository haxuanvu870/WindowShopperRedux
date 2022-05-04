import React, { useEffect } from 'react';
import { StatusBar, View, Text, TouchableOpacity, StyleSheet, Dimensions, ImageBackground, ToastAndroid, BackHandler } from 'react-native';
import { StackActions } from '@react-navigation/native';
import RadioBubbleSelection from '../components/radioButtonSelection/RadioButtonSelection';
import BackButton from '../components/backButton/BackButton';
import RoundedButton from '../components/roundedButton/RoundedButton';
import PriceBubble from '../components/priceBubble/PriceBubble';
import { Item } from '../types/Item';
import { AuthUser } from '../types/AuthUser';
import { useDispatch, useSelector } from 'react-redux';
import {
    setSelectedSize, setSelectedQuantity,
    selectSelectedSize, selectSelectedQuantity
} from '../redux/slices/itemDetailsSlice'
import { selectUser } from '../redux/slices/authSlice'
import { FirebaseDatabase } from '../util/Constants';
import { getDatabase, ref, set } from "firebase/database";

const { width } = Dimensions.get('screen')

type IProps = {
    navigation: any;
    route: any;
    selectedItem?: Item;
}

/**
 * @param {{ 
 * navigation: any,
 * route: any,
 * selectedItem: Item
 * }} props 
 * @returns
 */

/**
 * ItemDetailsScreen displays the selected retail item's details, sizes, price & reviews.
 * This screen is passed React's navigation & route as props for navigating between screens 
 * and passing data. This screen is also passed the selectedItem from ShopScreen 
 */
export const ItemDetailsScreen = (props: IProps) => {
    const { navigation } = props;
    const { selectedItem } = props.route.params
    const selectedSize = useSelector(selectSelectedSize)
    const selectedQuantity = useSelector(selectSelectedQuantity)
    const user: AuthUser = useSelector(selectUser)
    const dispatch = useDispatch();
    const popAction = StackActions.pop(1);

    const KEY_USERS = FirebaseDatabase.usersKey;
    const KEY_CART = FirebaseDatabase.cartKey;

    useEffect(() => {
        dispatch(setSelectedSize('S'))
        dispatch(setSelectedQuantity('1'))
        const onBackPress = () => {
            navigation.dispatch(popAction)
            return true
        };
        BackHandler.addEventListener('hardwareBackPress', onBackPress);
        return () => BackHandler.removeEventListener("hardwareBackPress", onBackPress)
    }, [])

    //Handles when a size button is selected
    const selectedSizeHandler = (value) => {
        dispatch(setSelectedSize(value))
    }

    //Handles when a quantity button is selected
    const selectedQuantityHandler = (value) => {
        dispatch(setSelectedQuantity(value))
    }

    //Post selectedItem to signed in user's cart
    const addItemToCart = async (selectedItem, selectedSize, selectedQuantity) => {
        try {
            const USER_ID = user.uid
            const ITEM_ID = selectedItem.id
            const cartPath = KEY_USERS + USER_ID + KEY_CART

            const db = getDatabase();
            set(ref(db, cartPath + ITEM_ID), {
                id: selectedItem.id,
                title: selectedItem.title,
                size: selectedSize,
                price: selectedItem.price,
                thumbnail: selectedItem.image,
                quantity: Number(selectedQuantity)
            });
            ToastAndroid.show(`${selectedItem.title} Added To Cart`, ToastAndroid.SHORT)
        } catch (e) {
            console.log(e);
        }
    }

    //Converts selectedItem's price to String
    let priceString = '$' + String(selectedItem.price)
    let reviewText: string = 'Reviews'

    return (
        <View style={styles.container}>
            <View style={styles.toolBarContainer}  >
                <BackButton backArrowColor='black' onPress={() => navigation.dispatch(popAction)} />
            </View>

            <View style={styles.imageContainer}>
                <ImageBackground resizeMode='contain' style={styles.image} source={{ uri: selectedItem.image }}>
                    <PriceBubble price={priceString} />
                </ImageBackground>
            </View>

            <View style={styles.titleContainer}>
                <Text style={styles.title}>{selectedItem.title}</Text>
                <TouchableOpacity style={styles.reviewButton} onPress={() => navigation.push('Reviews', { selectedItem: selectedItem })}>
                    <Text style={styles.reviewButtonText}>{reviewText}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionText}>{selectedItem.summary}</Text>
            </View>

            <View style={styles.radioButtonsContainer}>
                <RadioBubbleSelection contentType={'Sizes'} selectedSize={selectedSize} selectedSizeHandler={selectedSizeHandler} selectedQuantity={selectedQuantity} selectedQuantityHandler={selectedQuantityHandler} />
                <RadioBubbleSelection contentType={'Quantity'} selectedSize={selectedSize} selectedSizeHandler={selectedSizeHandler} selectedQuantity={selectedQuantity} selectedQuantityHandler={selectedQuantityHandler} />
            </View>

            <View style={styles.addToCartButtonContainer} >
                <RoundedButton enabled={true} buttonText='Add To Cart' buttonTextColor='white' buttonColor='black' onPress={user ? () => addItemToCart(selectedItem, selectedSize, selectedQuantity) : () => navigation.navigate('Login')} />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    addToCartButtonContainer: {
        flexDirection: 'column',
        width: '100%',
        height: 60,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: -30,
    },

    container: {
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
        justifyContent: 'flex-start',
        alignContent: 'center',
        paddingTop: StatusBar.currentHeight
    },

    descriptionContainer: {
        flex: 1,
        width: width,
        minHeight: 60,
        maxHeight: 60,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
    },

    descriptionText: {
        fontSize: 15,
        color: 'black',
        width: width - 20,
        lineHeight: 20,
        paddingHorizontal: 10,
    },

    image: {
        height: '100%',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },

    imageContainer: {
        flex: 1,
        maxHeight: 320,
        flexDirection: 'column',
    },

    innerContainer: {
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        backgroundColor: 'white'
    },

    radioButtonsContainer: {
        flexDirection: 'column',
        width: width,
        minHeight: 150,
        maxHeight: 150,
        justifyContent: 'flex-start',
    },

    reviewButton: {
        width: 100,
        height: 40,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginLeft: 30,
    },

    reviewButtonText: {
        fontSize: 14,
        height: 45,
        textAlign: 'center',
        margin: 5,
        color: '#8f21fe',
        textDecorationLine: 'underline'
    },

    reviews: {
        fontSize: 16,
        color: 'black',
        justifyContent: 'flex-end',
        marginTop: 3,
        marginLeft: 60,
    },

    searchBarContainer: {
        flexDirection: 'row',
        flex: 1,
        minHeight: 70,
        maxHeight: 70,
        backgroundColor: '#A846A0',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },

    title: {
        fontSize: 18,
        height: 23,
        width: 190,
        fontWeight: 'bold',
        color: 'black',
        justifyContent: 'flex-start',
        marginTop: 2,
        marginLeft: 40,
    },

    titleContainer: {
        flexDirection: 'row',
        height: 23,
        width: '100%',
        justifyContent: 'flex-start',
    },

    toolBarContainer: {
        flexDirection: 'row',
        display: 'flex',
        width: width,
        minHeight: 70,
        maxHeight: 70,
        elevation: 6,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

})

export default ItemDetailsScreen;