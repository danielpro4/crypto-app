import React from 'react';
import PropTypes from 'prop-types';
import {createStackNavigator} from '@react-navigation/stack';
import CoinsScreen from '../../screens/CoinsScreen';
import CoinDetailScreen from '../../screens/CoinDetailScreen';
import Colors from '../../res/colors';

const Stack = createStackNavigator();

function CoinsStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: Colors.blackPearl,
                    shadowColor: Colors.blackPearl,
                },
                headerTintColor: Colors.white,
            }}>
            <Stack.Screen name="Coins" component={CoinsScreen} />
            <Stack.Screen name="CoinDetail" component={CoinDetailScreen} />
        </Stack.Navigator>
    );
}

CoinsStack.propTypes = {
    name: PropTypes.string,
};

export default CoinsStack;
