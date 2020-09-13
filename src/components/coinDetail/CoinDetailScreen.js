import React from 'react';
import PropTypes from 'prop-types';
import {
    View,
    Text,
    Image,
    StyleSheet,
    SectionList,
    FlatList,
    Pressable,
    Alert
} from 'react-native';
import Colors from '../../res/colors';
import Http from '../../libs/http';
import CoinMarketItem from './CoinMarketItem';
import Storage from '../../libs/storage'

const CoinDetailScreen = ({navigation, route}) => {
    const [isFavorite, setIsFavorite] = React.useState(false);
    const [coin, setCoin] = React.useState(null);
    const [markets, setMarkets] = React.useState([]);

    React.useEffect(() => {
        const {coin: _coin} = route.params;
        navigation.setOptions({title: _coin.symbol});
        setCoin(_coin);

        const execute = async () => {
            await getFavorite()
        }

        execute()
        return () => {
            // TODO:
        }
    }, [navigation, route, setCoin, getFavorite]);

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

    const getFavorite = async () => {
        try {
            const key = `favorite-${coin.id}`;
            const favString = await Storage.instance.get(key)

            if (favString !== null) {
                setIsFavorite(true)
            }
        } catch (error) {
            console.log('Error:', error)
        }
    }

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

    const addFavorite = async () => {
        const value = JSON.stringify(coin);
        const key = `favorite-${coin.id}`;
        const stored = await Storage.instance.store(key, value);

        if (stored) {
            setIsFavorite(true)
        }
    }

    const removeFavorite = async () => {
        Alert.alert('Remove Favorite', 'Are youm sure ?', [
            {
                text: 'Cancel',
                onPress: async () => {
                },
                style: 'cancel',
            },
            {
                text: 'Remove',
                onPress: async () => {
                    const key = `favorite-${coin.id}`;
                    await Storage.instance.remove(key)
                    setIsFavorite(false)
                },
                style: 'remove',
            }
        ]);
    }

    const handleFavoriteToggle = () => {
        if (isFavorite) {
            removeFavorite()
        } else {
            addFavorite()
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.subHeader}>
                <View style={styles.row}>
                    <Image
                        style={styles.iconImage}
                        source={{uri: getSymbolIcon(coin?.name)}}
                    />
                    <Text style={styles.titleText}>{coin?.name}</Text>
                </View>
                <Pressable
                    onPress={handleFavoriteToggle}
                    style={[
                        styles.btnFavorite,
                        isFavorite ? styles.btnFavoriteRemove : styles.btnFavoriteAdd
                    ]}>
                    <Text
                        style={styles.btnFavoriteText}>
                        {isFavorite ? 'Remove Favorite' : 'Add Favorite'}</Text>
                </Pressable>
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
                renderItem={({item}) => <CoinMarketItem coin={item}/>}
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
    row: {
        flexDirection: 'row'
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
        justifyContent: 'space-between'
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
    btnFavoriteText: {
        color: Colors.white
    },
    btnFavorite: {
        padding: 8,
        borderRadius: 8,
        marginLeft: 15
    },
    btnFavoriteAdd: {
        backgroundColor: Colors.picton,
    },
    btnFavoriteRemove: {
        backgroundColor: Colors.carmine,
    }
});

export default CoinDetailScreen;
