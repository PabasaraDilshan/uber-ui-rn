import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_API_KEY} from '@env';
import {useDispatch} from 'react-redux';
import {setDestination} from '../slicer/navSlice';
import {useNavigation} from '@react-navigation/native';
import {MapStackParamList} from '../screens/MapScreen';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import NavFavourites from './NavFavourites';
import {Icon} from '@rneui/themed';

export default function NavigateCard() {
  const dispatch = useDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<MapStackParamList>>();
  return (
    <SafeAreaView className="bg-white flex-1">
      <Text className="text-center py-5 text-xl">Good Morning, Sonny</Text>
      <View className="border-t border-gray-200 flex-shrink">
        <GooglePlacesAutocomplete
          placeholder="Where to?"
          nearbyPlacesAPI="GooglePlacesSearch"
          styles={ioInputBoxStyles}
          minLength={2}
          onPress={(data, details = null) => {
            dispatch(
              setDestination({
                location: details?.geometry.location,
                description: data.description,
              }),
            );
            navigation.navigate('RideOptionsCard');
          }}
          fetchDetails
          query={{
            language: 'en',
            key: GOOGLE_MAPS_API_KEY,
          }}
          debounce={400}
        />
        <NavFavourites />
      </View>
      <View className="flex-row bg-white justify-evenly mt-auto border-t border-gray-100">
        <TouchableOpacity
          onPress={() => navigation.navigate('RideOptionsCard')}
          className="flex flex-row justify-between bg-black py-3 px-4 w-24 rounded-full">
          <Icon name="car" type="font-awesome" color="white" size={16} />
          <Text className="text-white text-center">Rides</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex flex-row justify-between py-3 px-4 w-24 rounded-full">
          <Icon
            name="fast-food-outline"
            type="ionicon"
            color="black"
            size={16}
          />
          <Text className="text-black text-center">Eats</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const ioInputBoxStyles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingTop: 20,
    flex: 0,
  },
  textInput: {
    backgroundColor: '#DDDDDF',
    borderRadius: 0,
    fontSize: 18,
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
});
