import React from 'react';
import PropTypes from 'prop-types';
import {View, TextInput, StyleSheet, Platform} from 'react-native';
import Colors from '../../res/colors';

const CoinSearch = ({onChange}) => {
    const [query, setQuery] = React.useState('');

    const handleTextChange = (value) => {
        setQuery(value);
        if (onChange) {
            onChange(value);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Search coin"
                placeholderTextColor='#d5d7d8'
                style={[
                    styles.textInput,
                    Platform.OS === 'IOS' ? styles.textInputIOS : styles.textInputAndroid
                ]}
                value={query}
                onChangeText={handleTextChange}
            />
        </View>
    );
};

CoinSearch.propTypes = {
    name: PropTypes.string,
};

const styles = StyleSheet.create({
    container: {
    },
    textInput: {
        color: Colors.white,
        backgroundColor: Colors.charade,
        borderWidth: 1,
        paddingLeft: 16,
        height: 46,
    },
    textInputAndroid: {
        borderBottomWidth: 2,
        borderBottomColor: Colors.zircon
    },
    textInputIOS: {
        margin: 8,
        borderRadius: 8,
    }
});

export default CoinSearch;
