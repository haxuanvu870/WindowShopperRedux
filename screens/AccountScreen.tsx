import React, { useEffect } from 'react';
import { StatusBar, View, Image, Text, StyleSheet, Dimensions } from 'react-native';
import logo from '../assets/ic_windowshopper_transparent.png'
import RoundedButton from '../components/roundedButton/RoundedButton';
import { Account } from '../types/Account';
import { AuthUser } from '../types/AuthUser';
import { getAuth, signOut } from "firebase/auth";
import 'firebase/database';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from "firebase/database";
import firebaseConfig from '../service/Firebase';
import { FirebaseDatabase } from "../util/Constants";
import { login, selectUser } from '../redux/slices/authSlice';
import { setIsLoading, setAccount, selectAccount, selectIsLoading } from '../redux/slices/accountSlice';
import { useDispatch, useSelector } from 'react-redux';

const { width } = Dimensions.get('screen')

interface IProps {
    navigation: any;
    route: any;
}

export const AccountScreen = (props: IProps) => {
    const { navigation } = props;
    const isLoading = useSelector(selectIsLoading)
    const account: Account = useSelector(selectAccount)
    const user: AuthUser = useSelector(selectUser)
    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            getAccountInfo();
        } else {
            navigation.navigate("Login")
        }
    }, [user])

    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);

    const getAccountInfo = async () => {
        dispatch(setIsLoading(true))
        let KEY_USERS = FirebaseDatabase.usersKey;
        let USER_ID = user.uid
        let usersPath = KEY_USERS + USER_ID
        let reviewRef = ref(db, usersPath)
        try {
            onValue(reviewRef, (snapshot) => {
                const data = snapshot.val();
    
                let account: Account = {
                    username: data.username,
                    email: data.email,
                    password: data.password,
                }
                dispatch(setAccount(account))
                dispatch(setIsLoading(false))
            });
        } catch (e) {
            console.log(e);
            dispatch(setAccount(null))
            dispatch(setIsLoading(false))
        }
    }

    const signOutUser = async () => {
        try {
            await signOut(getAuth());
            dispatch(setAccount(null))
            navigation.navigate('Shop');
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <View style={styles.container}>
            {!isLoading ? (
                <>
                    <View style={styles.banner}>
                        <View style={styles.logoContainer}>
                            <Image style={styles.logo} source={logo} />
                        </View>
                    </View>

                    <View style={styles.accountContainer}>

                        <View style={styles.accountDetailsContainer}>
                            <Text style={styles.greeting} >Welcome back, {account.username}</Text>
                            <Text style={styles.email} >{account.email}</Text>
                        </View>

                        <View style={styles.buttonContainer} >
                            <RoundedButton enabled={true} buttonText='Sign Out' buttonTextColor='white' buttonColor='black' onPress={() => signOutUser()} />
                        </View>
                    </View>
                </>
            ) : (
                <View style={styles.container} />
            )
            }
        </View>
    );
}

const styles = StyleSheet.create({

    accountContainer: {
        height: 300,
        width: width - 25,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },

    accountDetailsContainer: {
        flex: 1,
        minHeight: 70,
        maxHeight: 70,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 30
    },

    banner: {
        height: 300,
        width: width - 25,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: 50
    },

    buttonContainer: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 80,
    },

    container: {
        height: '100%',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#8f21fe',
        paddingTop: StatusBar.currentHeight
    },

    email: {
        width: '100%',
        height: 25,
        fontSize: 15,
        color: 'black',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },

    greeting: {
        fontSize: 20,
        height: 30,
        width: '100%',
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },

    logo: {
        flex: 1,
        minHeight: 80,
        maxHeight: 80,
        resizeMode: 'contain'
    },

    logoContainer: {
        height: 180,
        width: 180,
        borderRadius: 120,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#8f21fe',
    },

})

export default AccountScreen;