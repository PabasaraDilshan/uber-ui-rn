import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {Icon} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParamList} from '../App';
import {useSelector} from 'react-redux';
import {selectOrigin} from '../slicer/navSlice';
const data = [
  {
    id: '12',
    title: 'Get a ride',
    image: 'https://links.papareact.com/3pn',
    screen: 'MapScreen',
  },
  {
    id: '456',
    title: 'Order food',
    image: 'https://links.papareact.com/28w',
    screen: 'EatsScreen',
  },
];
export default function NavOptions() {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const origin = useSelector(selectOrigin);
  return (
    <FlatList
      data={data}
      horizontal
      keyExtractor={item => item.id}
      renderItem={({item}) => {
        return (
          <TouchableOpacity
            disabled={!origin}
            onPress={() => {
              navigation.navigate(item.screen);
            }}
            className="p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40">
            {/* <Text>{item.title}</Text> */}
            <View className={!origin ? 'opacity-40' : ''}>
              <Image
                source={{uri: item.image}}
                style={{width: 120, height: 120, resizeMode: 'cover'}}
              />
              <Text className="mt-2 text-lg font-semibold">{item.title}</Text>
              <View className="p-2 rounded-full mt-4 w-10 bg-black">
                <Icon color="white" name="arrowright" type="antdesign" />
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
}
