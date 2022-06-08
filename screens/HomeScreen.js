'use strict';

import React, { useState } from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'

import { CommonActions } from '@react-navigation/native';

import { getAuth } from "firebase/auth";
const auth = getAuth();

const HomeScreen = ({ navigation }) => {

    const [user, setUser] = useState(auth.currentUser);

    const handleSignOut = () => {
        auth.signOut()
            .then(() => {
                setUser(null);

                navigation.dispatch(
                    CommonActions.reset({
                        routes: [
                            {
                                name: 'Login',
                            },
                        ],
                    })
                );
            })
            .catch((error) => {
                alert(error.message);
            });
    }

    return (
        <View style={styles.container}>
            <Text>Email: {user?.email}</Text>
            <Pressable
                onPress={handleSignOut}
                style={styles.button}
            >
                <Text style={[styles.buttonText]}>Sign Out</Text>
            </Pressable>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
})