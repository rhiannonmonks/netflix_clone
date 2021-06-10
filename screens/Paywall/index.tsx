import React, { useEffect, useState} from 'react';
import { View, Text } from '../../components/Themed';
import Purchases, { PurchasesPackage } from 'react-native-purchases';
import { FlatList } from 'react-native';
import PackageItem from '../../components/PackageItem';

const Paywall = () => {
    const [packages, setPackages] = useState<PurchasesPackage[]>([]);

    useEffect(() => {
        const fetchOfferings = async () => {
        try {
            const offerings = await Purchases.getOfferings();
            console.log(offerings.current)
            if (offerings.current !== null) {
                setPackages(offerings.current.availablePackages);
            // Display current offering with offerings.current
            }
  
            } catch (e) {
             }
            }; 
            fetchOfferings();
    }, [])
    
    return (
        <View>
            <FlatList
            data={packages}
            renderItem={({item}) => <PackageItem purchasePackage={item}/>}
            />
        </View>
    )
}

export default Paywall
