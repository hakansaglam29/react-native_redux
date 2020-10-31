import axios from 'axios'
import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, FlatList } from 'react-native';
import {useDispatch} from 'react-redux'

import { RestaurantItem } from '../components'

const Restaurants = (props) => {
    const [list, setList] = useState([]);
    const dispatch = useDispatch();

    const fetchData = () => {
        axios.get(
            'https://opentable.herokuapp.com/api/restaurants',
            {
                params: {
                    "state": "IL"
                }
            }
        )
            .then(response => setList(response.data.restaurants))
            .catch(error => console.log(error))
    }

    useEffect(() => fetchData(), []);

    const renderList = ({ item }) => <RestaurantItem 
                                    item={item}
                                    onAddFavotite={()=> dispatch({
                                        type: 'ADD_TO_FAVORITE',
                                        payload: {selectedRestaurant:item}
                                    })}
                                        />

    return (
        <SafeAreaView>
            <View>
                <Text style={{ fontSize: 25, textAlign: 'center', fontWeight: 'bold' }}>Restaurants</Text>
                <FlatList
                    keyExtractor={(_, index) => index.toString()}
                    data={list}
                    renderItem={renderList}
                />
            </View>
        </SafeAreaView>
    )
}

export { Restaurants }