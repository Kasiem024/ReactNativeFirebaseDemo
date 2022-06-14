'use strict';

import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'

import * as Notifications from 'expo-notifications';

import { CommonActions } from '@react-navigation/native';

import { getAuth } from "firebase/auth";
const auth = getAuth();

const HomeScreen = ({ navigation }) => {

    const [user, setUser] = useState(auth.currentUser);
    const [token, setToken] = useState(null);

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            setUser(user);
            // console.log(user);
            setToken(registerForPushNotificationsAsync());
            
            const subscription = Notifications.addNotificationReceivedListener(notification => {
                console.log(notification);
            });
            return () => subscription.remove();
        });
    }, []);

    const registerForPushNotificationsAsync = async () => {
        let token;

        // Checking to see if the user has permission to send push notifications
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync(); // Request permission to send push notifications
            finalStatus = status;
        }

        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }

        // Get the token that uniquely identifies this device
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);

        // Android sometimes doesn't show notifications
        // Handling that by setting importance to max
        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        return token;
    }

    // Signs out the user and navigates to the LoginScreen
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

    const sendNotification = async () => {
        let token = (await Notifications.getExpoPushTokenAsync()).data
        console.log('Sending notification...' + token);
        fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                to: token,
                title: 'Hello World',
                body: 'This is a test notification' + user.email,
            })
        }).then(res => {
            return res.json();
        }).then(res => {
            // console.log(res);
            fetch('https://exp.host/--/api/v2/push/getReceipts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ids: [res.data.id],
                })
            }).then(res => {
                return res.json();
            }
            ).then(res => {
                // console.log(res);
            }
            ).catch(err => {
                console.log(err);
            })
        }).catch(err => {
            console.log(err);
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
            <Pressable
                onPress={sendNotification}
                style={styles.button}
            >
                <Text style={[styles.buttonText]}>Send notification</Text>
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