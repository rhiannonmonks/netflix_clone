import React, { useEffect, useState} from 'react'
import { Pressable, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Storage } from 'aws-amplify';

import { Movie } from '../../src/models';
import styles from './styles';
import Purchases from 'react-native-purchases';
import { ENTITLEMENT_ID } from '../../src/config';

const MovieItem = ({ movie }: {movie: Movie}) => {
    const navigation = useNavigation();
    const [imageUrl, setImageUrl] = useState('');

    const onMoviePress = async () => {
        //check if user is PRO
        try {
            const purchaserInfo = await Purchases.getPurchaserInfo();
            if(typeof purchaserInfo
            .entitlements
            .active[ENTITLEMENT_ID] !== "undefined") {
            //if so, redirect to details screen
            navigation.navigate('MovieDetailsScreen', { id: movie.id })
        } else {
            navigation.navigate('Paywall')
        }
    } catch (e) {
        // Error fecthing purchase info
    }

}

    useEffect(() => {  
        if (movie.poster.startsWith('http')) {
            setImageUrl(movie.poster);
            return;
        }

        Storage.get(movie.poster).then(setImageUrl)
    }, [])

    return (
        <Pressable onPress={onMoviePress}>
            <Image style={styles.image} source={{ uri: imageUrl }} />
        </Pressable>
    )
}

export default MovieItem

