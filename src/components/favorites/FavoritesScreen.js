import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet} from "react-native";
import FavoritesEmptyState from "./FavoritesEmptyState";
import Colors from '../../res/colors'

const FavoritesScreen = () => {
    return (
        <View style={styles.container}>
            <FavoritesEmptyState/>
        </View>
    );
};

FavoritesScreen.propTypes = {
    name: PropTypes.any
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.charade,
        justifyContent: 'center',
        flex: 1
    }
})

export default FavoritesScreen;