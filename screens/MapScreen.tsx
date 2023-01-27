import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import GMapView from '../components/GMapView';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import NavigateCard from '../components/NavigateCard';
import RideOptionsCard from '../components/RideOptionsCard';
import {Icon} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';
const MapStack = createNativeStackNavigator();
export type MapStackParamList = {
  [name: string]: {id: number} | undefined;
};

export default function MapScreen() {
  const navigation = useNavigation<any>();
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('HomeScreen');
        }}
        className="bg-gray-100 absolute top-10 left-8 z-50 p-3 rounded-full shadow-lg">
        <Icon name="menu" />
      </TouchableOpacity>
      <View className="h-1/2">
        <GMapView />
      </View>
      <View className="h-1/2">
        <MapStack.Navigator>
          <MapStack.Screen
            name="NavigateCard"
            component={NavigateCard}
            options={{headerShown: false}}
          />
          <MapStack.Screen
            name="RideOptionsCard"
            component={RideOptionsCard}
            options={{headerShown: false}}
          />
        </MapStack.Navigator>
      </View>
    </View>
  );
}
