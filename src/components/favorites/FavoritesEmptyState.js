import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet} from "react-native";

const FavoritesEmptyState = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>You don´t have any favorite yet</Text>
        </View>
    );
};

FavoritesEmptyState.propTypes = {
    name: PropTypes.any
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center'
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        alignSelf: 'center'
    }
})

export default FavoritesEmptyState;