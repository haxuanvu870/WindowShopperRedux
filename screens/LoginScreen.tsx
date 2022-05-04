import React, { useState, useEffect } from 'react';
import {
    StatusBar, View, TouchableOpacity, Image, Text, TextInput,
    StyleSheet, Dimensions, ToastAndroid, BackHandler
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../assets/ic_windowshopper_transparent.png';
import BackButton from '../components/backButton/BackButton';
import PasswordForm from '../components/passwordForm/PasswordForm';
import RoundedButton from '../components/roundedButton/RoundedButton';
import { AuthUser } from '../types/AuthUser';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { setEmailAsValidated, setPasswordAsVisible, setSignInButtonAsEnabled, selectEmailIsValidated, selectPaswordIsValidated, selectPasswordVisibility, selectIsSignInButtonEnabled } from '../redux/slices/loginSlice';
import { login } from '../redux/slices/authSlice';

const { width } = Dimensions.get('screen')

interface IProps {
    navigation: any;
    route: any;
}

/**
 * @param {{ 
 * navigation: any,
 * route: any,
 * }} props 
 * @returns
 */

/**
 * LoginScreen existing users can use this screen to log back their accounts. Additionally,
 * new users can be directed to CreateAccountScreen to create an account.
 * This screen is passed React's navigation & route as props for navigating between screens 
 * and passing data.
 */
export const LoginScreen = (props: IProps) => {
    const { navigation } = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const isPasswordVisible = useSelector(selectPasswordVisibility)
    const isEmailValidated = useSelector(selectEmailIsValidated)
    const isPasswordValidated = useSelector(selectPaswordIsValidated)
    const isSignInButtonEnabled = useSelector(selectIsSignInButtonEnabled)

    const dispatch = useDispatch();

    useEffect(() => {
        const onBackPress = () => {
            navigation.navigate('Shop');
            return true
        };
        BackHandler.addEventListener('hardwareBackPress', onBackPress);
        return () => BackHandler.removeEventListener("hardwareBackPress", onBackPress)
    }, [])

    //Signs user in
    const signIn = async (email, password) => {
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                let uid = user.uid
                ToastAndroid.show("Welcome Back!", ToastAndroid.SHORT)
                const authUser: AuthUser = {
                    isAuthenticated: true,
                    email: email,
                    uid: uid,
                    username: user.displayName
                };
                dispatch(login(authUser))
                navigation.navigate('Shop');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                ToastAndroid.show("Incorrect Credentials", ToastAndroid.SHORT)
                dispatch(login(null))
            });
    }

    //Validates email address on text change
    const onEmailTextChange = (text) => {
        let emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (emailReg.test(text)) {
            dispatch(setEmailAsValidated(false))
            if (isPasswordValidated) {
                dispatch(setSignInButtonAsEnabled(true))
            }
        } else {
            dispatch(setEmailAsValidated(false))
            dispatch(setSignInButtonAsEnabled(false))
        }
        setEmail(text)
    }

    //Validates password on text change
    const onPasswordTextChange = (text) => {
        if (text.length < 5) {
            dispatch(setSignInButtonAsEnabled(false))
            dispatch(setEmailAsValidated(false))
        } else {
            dispatch(setEmailAsValidated(true))
            if (isEmailValidated) {
                dispatch(setSignInButtonAsEnabled(true))
            }
        }
        setPassword(text)
    }

    return (
        <View style={styles.container}>
            <View style={styles.toolBarContainer}  >
                <BackButton backArrowColor='white' onPress={() => navigation.navigate('Shop')} />
            </View>
            <View style={styles.innerContainer}>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={logo} />
                </View>
                <TextInput style={styles.textInput} keyboardType='email-address' placeholder='Email' autoCapitalize='none' keyboardType='email-address' onChangeText={(text) => onEmailTextChange(text)} />
                <PasswordForm isPasswordVisible={isPasswordVisible} placeholder={'Password'} value={password} onChange={onPasswordTextChange} setPasswordAsVisible={setPasswordAsVisible} />
                <RoundedButton enabled={isSignInButtonEnabled} buttonText='Sign In' buttonTextColor='black' buttonColor='white' onPress={() => signIn(email, password)} />
                <TouchableOpacity style={styles.createAccountButton} onPress={() => navigation.navigate('CreateAccount')} >
                    <Text style={styles.createAccountButtonText}>Create Account</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        height: '100%',
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#8f21fe',
        paddingTop: StatusBar.currentHeight
    },

    createAccountButton: {
        width: width - 120,
        height: 50,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: 90
    },

    createAccountButtonText: {
        fontSize: 12,
        textAlign: 'center',
        margin: 10,
        color: 'white',
    },

    innerContainer: {
        height: 600,
        width: width - 25,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'black',
        borderRadius: 30,
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
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },

    textInput: {
        color: '#414141',
        fontWeight: 'bold',
        width: width - 110,
        height: 50,
        fontSize: 14,
        borderRadius: 30,
        paddingLeft: 25,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },

    toolBarContainer: {
        flexDirection: 'row',
        display: 'flex',
        width: width,
        minHeight: 70,
        maxHeight: 70,
        marginLeft: 20,
        marginBottom: 10,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },


});

export default LoginScreen;