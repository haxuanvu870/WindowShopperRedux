import React, { useState, useEffect } from 'react';
import { StatusBar, View, FlatList, StyleSheet, BackHandler } from 'react-native';
import { Item } from '../types/Item';
import ItemRow from '../components/itemRow/ItemRow'
import AnimationView from '../components/animationView/AnimationView';
import 'firebase/database';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from "firebase/database";
import { FirebaseDatabase } from '../util/Constants';
import firebaseConfig from '../service/Firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLoading, selectIsLoading, setItems, selectItems } from '../redux/slices/shopSlice'

interface IProps {
    navigation: any;
    route: any;
}

export const ShopScreen = (props: IProps) => {
    const { navigation } = props;

    useEffect(() => {
        getClothes();
    }, [])

    const isLoading = useSelector(selectIsLoading)
    const items = useSelector(selectItems)
    const dispatch = useDispatch();

    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);

    useEffect(() => {
        const onBackPress = () => {
            BackHandler.exitApp()
            return true
        };
        BackHandler.addEventListener('hardwareBackPress', onBackPress);
        return () => BackHandler.removeEventListener("hardwareBackPress", onBackPress)
    }, [])

    const getClothes = async () => {
        const inventoryRef = ref(db, FirebaseDatabase.inventoryKey);
        let itemList: Item[] = [];
        dispatch(setIsLoading(true))
        try {
            onValue(inventoryRef, (snapshot) => {
                const data = snapshot.val();
                for (const key of Object.keys(data)) {
                    const it: Item = data[key];

                    let item: Item = {
                        id: it.id,
                        title: it.title,
                        summary: it.summary,
                        image: it.image,
                        price: it.price,
                    }
                    itemList.push(item)
                }
                dispatch(setItems(itemList))
                dispatch(setIsLoading(false))
            });
        } catch (e) {
            console.log(e);
            dispatch(setItems(itemList))
            dispatch(setIsLoading(false))
        }
    }

    const renderItem = ({ item }) => {
        return (
            <View key={item.id}>
                <ItemRow item={item} navigation={navigation} />
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {!isLoading ? (
                <View style={styles.scrollViewContainer} >
                    {items.length > 0 &&
                        <FlatList
                            horizontal={false}
                            data={items}
                            numColumns={2}
                            renderItem={renderItem}
                        />
                    }
                </View>) : (
                <View style={styles.container}>
                    <View style={styles.innerContainer}>
                        <AnimationView option={1} />
                    </View>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
        paddingTop: StatusBar.currentHeight
    },

    innerContainer: {
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },

    scrollViewContainer: {
        height: '100%',
        width: '100%'
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

export default ShopScreen;