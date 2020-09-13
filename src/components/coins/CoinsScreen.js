import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import Http from '../../libs/http';
import CoinsItem from './CoinsItem';
import Colors from '../../res/colors';
import CoinSearch from './CoinSearch';

const API_URL = 'https://api.coinlore.net/api/tickers/?start=100&limit=100';

function CoinsScreen({navigation}) {
    const [loading, setLoading] = React.useState(false);
    const [coins, setCoins] = React.useState([]);
    const [allCoins, setAllCoins] = React.useState([]);
    React.useEffect(() => {
        setLoading(true);
        const execute = async () => {
            const response = await Http.getInstance().get(API_URL);
            const data = response.data;
            setCoins(data);
            setAllCoins(data);
            setLoading(false);
        };
        execute();

        return () => {
            // TODO:
        };
    }, [setCoins, setLoading, setAllCoins]);

    const handlePress = (coin) => {
        navigation.navigate('CoinDetail', {coin});
    };

    const handleSearch = (value) => {
        const coinsFiltered = allCoins.filter((coin) => {
            return coin.name.toLowerCase().includes(value.toLowerCase()) || coin.symbol.toLowerCase().includes(value.toLowerCase())
        });

        setCoins(coinsFiltered);
    };

    return (
        <View style={styles.container}>
            <CoinSearch onChange={handleSearch}/>
            {loading ? <ActivityIndicator color="#222" size="small"/> : null}
            <FlatList
                data={coins}
                renderItem={({item}) => {
                    return <CoinsItem coin={item} onPress={() => handlePress(item)}/>;
                }}
            />
        </View>
    );
}

CoinsScreen.propTypes = {
    name: PropTypes.string,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.blackPearl,
    },
    titleText: {
        textAlign: 'center',
        color: '#232323',
        padding: 10,
    },
});

export default CoinsScreen;
