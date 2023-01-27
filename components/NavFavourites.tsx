import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {Icon} from '@rneui/themed';

const data = [
  {
    id: '123',
    icon: 'home',
    location: 'Home',
    destination: 'Code Street, London, UK',
  },
  {
    id: '12',
    icon: 'briefcase',
    location: 'Work',
    destination: 'London Eye, London, UK',
  },
];
export default function NavFavourites() {
  return (
    <FlatList
      data={data}
      ItemSeparatorComponent={() => <View className="bg-gray-200 h-0.5" />}
      keyExtractor={item => item.id}
      renderItem={({item: {location, icon, destination}}) => {
        return (
          <TouchableOpacity className="flex-row items-center p-5">
            <View className="mr-4 rounded-full bg-gray-300 p-3">
              <Icon name={icon} type="ionicon" color="white" size={18} />
            </View>
            <View>
              <Text className="font-semibold text-lg">{location}</Text>
              <Text className="text-gray-500">{destination}</Text>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
}
