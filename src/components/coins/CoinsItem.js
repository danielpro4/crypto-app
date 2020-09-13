import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet, Image, Platform, Pressable} from 'react-native';
import Colors from '../../res/colors';

const CoinsItem = ({coin, onPress}) => {
    const getImageArrow = () => {
        if (coin.percent_change_1h > 0) {
            return require('../../assets/arrow_up.png');
        } else {
            return require('../../assets/arrow_down.png');
        }
    };

    return (
        <Pressable style={styles.container} onPress={onPress}>
            <View style={styles.row}>
                <Text style={styles.symbolText}>{coin.symbol}</Text>
                <Text style={styles.nameText}>{coin.name}</Text>
                <Text style={styles.priceText}>{`$ ${coin.price_usd}`}</Text>
            </View>

            <View style={styles.row}>
                <Text style={styles.percentText}>{coin.percent_change_1h}</Text>
                <Image style={styles.imageIcon} source={getImageArrow()}/>
            </View>
        </Pressable>
    );
};

CoinsItem.propTypes = {
    coin: PropTypes.object,
    onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderColor: Colors.zircon,
        borderBottomWidth: 1,
        marginLeft: Platform.OS === 'ios' ? 16 : 0,
        marginRight: Platform.OS === 'ios' ? 16 : 0,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    symbolText: {
        color: Colors.white,
        fontWeight: 'bold',
        fontSize: 16,
        marginRight: 12,
    },
    nameText: {
        color: Colors.white,
    },
    percentText: {
        color: Colors.white,
        fontSize: 12,
        marginRight: 16,
    },
    priceText: {
        color: Colors.white,
        fontSize: 14,
        marginRight: 16,
    },
    imageIcon: {
        width: 22,
        height: 22,
    },
});

export default CoinsItem;
