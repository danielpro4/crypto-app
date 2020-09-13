import React from 'react';
import {Image} from 'react-native'
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import CoinsStack from './src/components/coins/CoinsStack';
import Colors from './src/res/colors'

const Tabs = createBottomTabNavigator()

const App = () => {
    return (
        <>
            <NavigationContainer>
                <Tabs.Navigator
                    tabBarOptions={{
                        tintColor: "#fefefe",
                        style: {
                            backgroundColor: Colors.blackPearl
                        }
                    }}
                >
                    <Tabs.Screen
                        name='coins'
                        component={CoinsStack}
                        options={{
                            tabBarIcon: ({color, size}) => {
                                return <Image
                                    style={{tintColor: color, width: size, height: size}}
                                    source={require('./src/assets/bank.png')}
                                />
                            }
                        }}
                    />
                </Tabs.Navigator>

            </NavigationContainer>
        </>
    );
};

export default App;
