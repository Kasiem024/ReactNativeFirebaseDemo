'use strict';

// Importing core React Native components
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, Pressable, Keyboard } from 'react-native'

// Importing Firebase Authentication library
// Initialize Firebase Authenication
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, GithubAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult } from "firebase/auth";
const auth = getAuth();

import { CommonActions } from '@react-navigation/native';

const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const googleSignIn = () => {
        const providerGoogle = new GoogleAuthProvider();

        signInWithPopup(auth, providerGoogle)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;

            }).catch((error) => {
                alert(error.message);

                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
            });
    }

    const githubSignIn = () => {
        const providerGithub = new GithubAuthProvider();

        signInWithPopup(auth, providerGithub)
            .then((result) => {
                // This gives you a GitHub Access Token. You can use it to access the GitHub API.
                const credential = GithubAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;

                // The signed-in user info.
                const user = result.user;

            }).catch((error) => {
                alert(error.message);

                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GithubAuthProvider.credentialFromError(error);
            });
    }

    // Create a new user with an email and password
    // using the Firebase SDK
    const handleSignUp = () => {

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                Keyboard.dismiss();
            })
            .catch((error) => {
                alert(error.message);
            });
    }

    // Sign in a user with an email and password
    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                Keyboard.dismiss();
            })
            .catch((error) => {
                alert(error.message);
            });
    }

    // Handle users changing their state
    // This is called when the user is signed in or out
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User

            console.log('User is signed in: ', user.email);
            console.log(user);

            // Navigate to the HomeScreen and delete stack history
            navigation.dispatch(
                CommonActions.reset({
                    routes: [
                        {
                            name: 'Home',
                        },
                    ],
                })
            );

        } else {
            console.log('User is signed out');
        }
    });

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior='padding'
        >
            {/* KeyboardAvoidingView prevents keyboard from covering elements */}

            <View style={styles.inputContainer}>
                <TextInput
                    placeholder='Email'
                    autoComplete='email'
                    keyboardType='email-address'
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder='Password'
                    autoComplete='password'
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
            </View>

            <View style={styles.buttonContainer}>
                <Pressable
                    onPress={handleLogin}
                    style={styles.button}
                >
                    <Text style={[styles.buttonText]}>Login</Text>
                </Pressable>
                <Pressable
                    onPress={handleSignUp}
                    style={[styles.button, styles.buttonOutline]}
                >
                    <Text style={[styles.buttonOutlineText]}>Register</Text>
                </Pressable>
                <Pressable
                    onPress={googleSignIn}
                    style={[styles.button, styles.buttonOutline]}
                >
                    <Text style={[styles.buttonOutlineText]}>Google</Text>
                </Pressable>
                <Pressable
                    onPress={githubSignIn}
                    style={[styles.button, styles.buttonOutline]}
                >
                    <Text style={[styles.buttonOutlineText]}>Github</Text>
                </Pressable>
            </View>

        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainer: {
        width: '80%',
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginBottom: 5,
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: '#0066ff',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#0066ff',
        borderWidth: 2,
    },
    buttonOutlineText: {
        color: '#0066ff',
        fontWeight: '700',
        fontSize: 16,
    },
})