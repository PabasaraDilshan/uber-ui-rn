import {Image, SafeAreaView, Text, View} from 'react-native';
import React from 'react';
import NavOptions from '../components/NavOptions';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_API_KEY} from '@env';
import {useDispatch, useSelector} from 'react-redux';
import {selectOrigin, setDestination, setOrigin} from '../slicer/navSlice';
import NavFavourites from '../components/NavFavourites';
const HomeScreen = () => {
  const dispatch = useDispatch();
  const origin = useSelector(selectOrigin);
  return (
    <SafeAreaView className="h-full">
      <View className="p-5">
        <Image
          style={{width: 100, height: 100, resizeMode: 'contain'}}
          source={{
            uri: 'https://links.papareact.com/gzs',
          }}
        />
        <GooglePlacesAutocomplete
          nearbyPlacesAPI="GooglePlacesSearch"
          minLength={2}
          enablePoweredByContainer={false}
          fetchDetails={true}
          onPress={(data, details = null) => {
            // console.log({data});
            // console.log(details);
            dispatch(
              setOrigin({
                location: details?.geometry.location,
                description: data.description,
              }),
            );
            dispatch(setDestination(null));
          }}
          styles={{
            container: {
              flex: 0,
            },
            textInput: {
              fontSize: 18,
            },
          }}
          debounce={400}
          placeholder="Where From?"
          query={{
            language: 'en',
            key: GOOGLE_MAPS_API_KEY,
          }}
        />
        <NavOptions />
        <NavFavourites />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

// const styles = StyleSheet.create({});
