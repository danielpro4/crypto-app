import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    Image,
    StyleSheet,
    SectionList,
    FlatList,
} from 'react-native';
import Colors from '../res/colors';
import Http from '../libs/http';
import CoinMarketItem from '../components/coinDetail/CoinMarketItem';

const CoinDetailScreen = ({navigation, route}) => {
    const [coin, setCoin] = React.useState(null);
    const [markets, setMarkets] = React.useState([]);

    React.useEffect(() => {
        const {coin: _coin} = route.params;
        navigation.setOptions({title: _coin.symbol});
        setCoin(_coin);
    }, [navigation, route, setCoin]);

    React.useEffect(() => {
        const {coin: _coin} = route.params;
        const execute = async (coinId) => {
            const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`;
            const data = await Http.getInstance().get(url);
            setMarkets(data);
        };

        execute(_coin.id);
        return () => {
            //TODO:
        };
    }, [route]);

    const getSymbolIcon = (name) => {
        if (name) {
            const symbol = name.toLowerCase().replace(' ', '-');
            return `https://c1.coinlore.com/img/25x25/${symbol}.png`;
        }
    };

    const getSections = (_coin) => {
        if (_coin) {
            return [
                {
                    title: 'Market cap',
                    data: [_coin.market_cap_usd],
                },
                {
                    title: 'Volumen 24h',
                    data: [_coin.volume24],
                },
                {
                    title: 'Change 24',
                    data: [_coin.percent_change_24h],
                },
            ];
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.subHeader}>
                <Image
                    style={styles.iconImage}
                    source={{uri: getSymbolIcon(coin?.name)}}
                />
                <Text style={styles.titleText}>{coin?.name}</Text>
            </View>
            <SectionList
                style={styles.section}
                keyExtractor={(item) => item}
                sections={getSections(coin)}
                renderSectionHeader={({section}) => (
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionText}>{section.title}</Text>
                    </View>
                )}
                renderItem={({item}) => (
                    <View style={styles.sectionItem}>
                        <Text style={styles.itemText}>{item}</Text>
                    </View>
                )}
            />
            <Text style={styles.marketTitle}>Markets</Text>
            <FlatList
                style={styles.list}
                horizontal={true}
                data={markets}
                renderItem={({item}) => <CoinMarketItem coin={item} />}
            />
        </View>
    );
};

CoinDetailScreen.propTypes = {
    name: PropTypes.string,
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.charade,
        flex: 1,
    },
    section: {
        maxHeight: 200,
    },
    marketTitle: {
        padding: 8,
        fontWeight: 'bold',
        fontSize: 16,
        color: Colors.white,
    },
    list: {
        maxHeight: 70,
        paddingLeft: 16,
    },
    subHeader: {
        backgroundColor: 'rgba(0,0,0,0.1)',
        padding: 16,
        flexDirection: 'row',
    },
    iconImage: {
        width: 25,
        height: 25,
    },
    titleText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    sectionHeader: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        padding: 8,
    },
    sectionItem: {
        padding: 8,
    },
    itemText: {
        fontSize: 14,
        color: Colors.white,
        padding: 8,
    },
    sectionText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.white,
    },
});

export default CoinDetailScreen;
