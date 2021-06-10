import React, { useEffect, useState} from 'react';
import { View, Text } from '../../components/Themed';
import Purchases from 'react-native-purchases';

const Paywall = () => {
    const [packages, setPackages] = useState([]);

    useEffect(() => {
        const fetchOfferings = async () => {
        try {
            const offerings = await Purchases.getOfferings();
            if (offerings.current !== null) {
                console.log(offerings.current)
            // Display current offering with offerings.current
            }
  
            } catch (e) {
             }
            }; 
            fetchOfferings();
    }, [])
    
    return (
        <View>
            <Text>Paywall</Text>
        </View>
    )
}

export default Paywall
