'use strict';

// Importing core React Native components
import React, { useState } from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, Pressable } from 'react-native'

// Importing Firebase Authentication library
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const LoginScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Create a new user with an email and password
    // using the Firebase SDK
    const handleSignUp = () => {

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                alert(error.message);
            });
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior='padding'
        >
            {/* KeyboardAvoidingView prevents keyboard from covering elements */}

            <View style={styles.inputContainer}>
                <TextInput
                    placeholder='Email'
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder='Password'
                    value={password}
                    onChangeText={text => setPassword(text)}
                    style={styles.input}
                    secureTextEntry
                />
            </View>

            <View style={styles.buttonContainer}>
                <Pressable
                    onPress={() => { }}
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