import React from 'react';
import { View, Text, Pressable, Alert } from 'react-native';
import Purchases, { PurchasesPackage } from 'react-native-purchases';
import { useNavigation } from '@react-navigation/native';
import { ENTITLEMENT_ID } from '../../src/config';
import styles from './styles';

interface PackageItemProps {
    purchasePackage: PurchasesPackage,
}

const PackageItem = ({ purchasePackage }: PackageItemProps) => {
  const {
    product: { title, description, price_string },
  } = purchasePackage;

  const navigation = useNavigation();

  const onSelection = async () => {
    try {
        const purchaseMade = await Purchases.purchasePackage(purchasePackage);
        if (typeof purchaseMade
        .purchaserInfo
        .entitlements
        .active[ENTITLEMENT_ID] !== "undefined") {
        navigation.goBack();
        }
         } catch (e) {
         if (!e.userCancelled) {
             console.error(e);
         }
    }
  };

  return (
    <Pressable onPress={onSelection} style={styles.container}>
      <View style={styles.left}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.terms}>{description}</Text>
      </View>
      <Text style={styles.title}>{price_string}</Text>
    </Pressable>
  );
};

export default PackageItem;