import React, { useState, useEffect } from 'react';
import { StatusBar, View, Image, TouchableOpacity, Text, TextInput, StyleSheet, Dimensions, BackHandler, ToastAndroid } from 'react-native';
import { StackActions } from '@react-navigation/native';
import back from '../assets/ic_back.png'
import PasswordForm from '../components/passwordForm/PasswordForm';
import { Account } from '../types/Account';
import {
    setEmailAsValidated, setPasswordAsValidated, selectConfirmPaswordIsValidated,
    setConfirmPasswordAsValidated, selectPaswordIsValidated, setPasswordAsVisible,
    setConfirmPasswordAsVisible, setSignUpButtonAsEnabled, selectIsSignUpButtonEnabled,
    selectPasswordVisibility, selectConfirmPasswordVisibility, selectEmailIsValidated
} from '../redux/slices/createAccountSlice';
import { useDispatch, useSelector } from 'react-redux';
import { FirebaseDatabase } from '../util/Constants';
import firebaseConfig from '../service/Firebase';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, update } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { login } from '../redux/slices/authSlice';
import { AuthUser } from '../types/AuthUser';


const { width } = Dimensions.get('screen')

interface IProps {
    navigation: any;
    route: any;
}

export const CreateAccountScreen = (props: IProps) => {
    const { navigation } = props;
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const isEmailValidated = useSelector(selectEmailIsValidated)
    const isPasswordValidated = useSelector(selectPaswordIsValidated)
    const isConfirmPasswordValidated = useSelector(selectConfirmPaswordIsValidated)
    const isPasswordVisible = useSelector(selectPasswordVisibility)
    const isConfirmPasswordVisible = useSelector(selectConfirmPasswordVisibility)
    const isSignUpButtonEnabled = useSelector(selectIsSignUpButtonEnabled)

    const dispatch = useDispatch();

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getDatabase(app);
    const popAction = StackActions.pop(1);

    useEffect(() => {
        const onBackPress = () => {
            navigation.dispatch(popAction)
            return true
        };
        BackHandler.addEventListener('hardwareBackPress', onBackPress);
        return () => BackHandler.removeEventListener("hardwareBackPress", onBackPress)
    }, [])

    const onEmailTextChange = (text) => {
        let emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (emailReg.test(text)) {
            dispatch(setEmailAsValidated(true))
            if (isPasswordValidated && isConfirmPasswordValidated) {
                dispatch(setSignUpButtonAsEnabled(true))
            }
        } else {
            dispatch(setEmailAsValidated(false))
            dispatch(setSignUpButtonAsEnabled(false))
        }
        setEmail(text)
    }

    const onPasswordTextChange = (text) => {
        if (text.length < 6) {
            dispatch(setPasswordAsValidated(false))
        } else {
            dispatch(setPasswordAsValidated(true))
            if (isEmailValidated && isConfirmPasswordValidated) {
                dispatch(setSignUpButtonAsEnabled(true))
            }
        }
        setPassword(text)
    }

    const onConfirmPasswordTextChange = (text) => {
        if (text.length < 6 || password.length < 6) {
            dispatch(setSignUpButtonAsEnabled(false))
            dispatch(setConfirmPasswordAsValidated(false))
        } else {
            dispatch(setConfirmPasswordAsValidated(true))
            if (isEmailValidated && isPasswordValidated) {
                dispatch(setSignUpButtonAsEnabled(true))
            }
        }
        setConfirmPassword(text)
    }

    const createAccount = async (email, password) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
                .then(() => {
                    saveUserAccountToFirebase(email, password, username, auth.currentUser.uid)
                        .catch(error => {
                            console.log('Error encountered while saving account info to Firebase: ', error);
                        })
                    ToastAndroid.show("Successfully Created Account", ToastAndroid.SHORT)
                    const authUser: AuthUser = {
                        isAuthenticated: true,
                        email: email,
                        uid: auth.currentUser.uid,
                        username: username
                    };
                    dispatch(login(authUser))
                    navigation.navigate('Shop');
                })
                .catch(error => {
                    console.log('Failed while creating new account: ', error);
                    ToastAndroid.show("Failed To Create Account", ToastAndroid.SHORT)
                });
            await updateProfile(auth.currentUser, { displayName: username }).catch(
                (err) => console.log(err)
            );


        } catch (e) {
            console.log(e);
        }
    }

    const saveUserAccountToFirebase = async (email, password, username, uid) => {
        let KEY_USERS = FirebaseDatabase.usersKey;

        const account: Account = {
            email: email,
            username: username,
            password: password,
        };

        let USER_ID = uid
        let usersPath = KEY_USERS + USER_ID

        const updates = {};
        updates[usersPath] = account;

        return update(ref(db), updates);
    }

    return (
        <View style={styles.container}>
            <View style={styles.toolBarContainer}  >
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.dispatch(popAction)}>
                    <Image style={styles.backIcon} source={back} />
                </TouchableOpacity>
            </View>
            <TextInput style={{ ...styles.textInput, marginBottom: 40, marginTop: 40 }} placeholder='Username' onChangeText={(text) => setUserName(text)} />
            <TextInput style={{ ...styles.textInput, marginBottom: 40 }} keyboardType='email-address' placeholder='Email' autoCapitalize='none' keyboardType='email-address' onChangeText={(text) => onEmailTextChange(text)} />
            <PasswordForm isPasswordVisible={isPasswordVisible} placeholder={'Password'} value={password} onChange={onPasswordTextChange} setPasswordAsVisible={setPasswordAsVisible} />
            <Text style={styles.passwordRequirementText}>Password must be 6 characters long</Text>
            <PasswordForm isPasswordVisible={isConfirmPasswordVisible} placeholder={'Confirm Password'} value={confirmPassword} onChange={onConfirmPasswordTextChange} setPasswordAsVisible={setConfirmPasswordAsVisible} />
            <TouchableOpacity style={isSignUpButtonEnabled ? styles.enabledButton : styles.disabledButton} disabled={!isSignUpButtonEnabled} onPress={() => createAccount(email, password)} >
                <Text style={isSignUpButtonEnabled ? styles.enabledButtonText : styles.disabledButtonText} >Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({

    backButton: {
        flexDirection: 'row',
        height: 50,
        width: 50,
        borderRadius: 25,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginRight: 15
    },

    backIcon: {
        flexGrow: 1,
        height: 35,
        width: 35,
        tintColor: 'white',
        resizeMode: 'contain',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 0
    },

    buttonContainer: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        marginTop: 20,
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

    enabledButton: {
        width: width - 120,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40
    },

    enabledButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10,
        color: 'black',
    },

    disabledButton: {
        width: width - 120,
        height: 50,
        backgroundColor: '#8b8b8b',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40
    },

    disabledButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: 10,
        color: '#c7c7c7',
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

    passwordRequirementText: {
        fontSize: 12,
        textAlign: 'left',
        margin: 10,
        color: 'white',
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

export default CreateAccountScreen;