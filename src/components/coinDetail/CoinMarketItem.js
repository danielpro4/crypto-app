import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet} from 'react-native';
import Colors from '../../res/colors';

const CoinMarketItem = ({coin}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.nameText}>{coin.name}</Text>
            <Text style={styles.priceText}>{coin.price_usd}</Text>
        </View>
    );
};

CoinMarketItem.propTypes = {
    coin: PropTypes.object,
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderColor: Colors.zircon,
        borderWidth: 1,
        padding: 16,
        marginRight: 8,
        alignItems: 'center',
    },
    nameText: {
        fontWeight: 'bold',
        color: Colors.white,
    },
    priceText: {
        color: Colors.white,
    },
});

export default CoinMarketItem;
