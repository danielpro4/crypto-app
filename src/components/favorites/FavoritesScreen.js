import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, FlatList} from "react-native";
import FavoritesEmptyState from "./FavoritesEmptyState";
import Colors from '../../res/colors'
import Storage from "../../libs/storage";
import CoinsItem from "../../components/coins/CoinsItem";

const FavoritesScreen = ({navigation}) => {
    const [items, setItems] = React.useState([])
    React.useEffect(() => {
        const execute = async () => {
            try {
                const allKeys = await Storage.instance.getAllKeys()
                const keys = allKeys.filter(key => key.includes('favorite-'))
                const favs = await Storage.instance.multiGet(keys);
                const favorites = favs.map(([_, value]) => JSON.parse(value))

                setItems(favorites);
            } catch (error) {
                console.log('Get favorite error:', error)
            }
            
            navigation.addListener('focus', execute)
        }
        execute()
        return () => {
            navigation.removeListener('focus')
        }
    }, [navigation, setItems])

    const handlePress = (coin) => {
        navigation.navigate('CoinDetail', {coin})
    }

    return (
        <View style={styles.container}>
            {items?.length === 0
                ? <FavoritesEmptyState/>
                : null}
            {items?.length > 0
                ? <FlatList data={items}
                            renderItem={({item}) =>
                                <CoinsItem coin={item}
                                           onPress={() => handlePress(item)}/>
                            }
                />
                : null}
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