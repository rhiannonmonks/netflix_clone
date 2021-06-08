import React, { useEffect, useState } from 'react'
import { Image, FlatList, Pressable } from 'react-native';
import { Text } from '../../components/Themed';
import { Storage } from 'aws-amplify';

import styles from './styles';
import { Category, Movie } from '../../src/models';
import { DataStore } from '@aws-amplify/datastore';
import movie from '../../assets/data/movie';
import MovieItem from '../MovieItem';

interface HomeCategoryProps {
    category: Category
}

const HomeCategory = (props: HomeCategoryProps) => {
    const { category } = props;

    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const fetchMovies = async () => {
            const result = (await DataStore.query(Movie))
            .filter((movie) => movie.categoryID === category.id) 
            setMovies(result);
        }
        fetchMovies();
    }, [])


    Storage.list('') 
    .then(result => console.log(result))

    return (
        <>
            <Text style={styles.title}>{category.title}</Text>
            <FlatList
                data={movies}
                renderItem={({item}) => <MovieItem movie={item} />}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </>
    );
}

export default HomeCategory;
