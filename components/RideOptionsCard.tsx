import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Icon} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParamList} from '../App';
import {Image} from '@rneui/base';
import {useSelector} from 'react-redux';
import {selectTravelTimeInformation} from '../slicer/navSlice';

const data = [
  {
    id: 'Uber-X-123',
    title: 'Uber X',
    multiplier: 1,
    image: 'https://links.papareact.com/3pn',
  },
  {
    id: 'Uber-XL-456',
    title: 'Uber XL',
    multiplier: 1.2,
    image: 'https://links.papareact.com/5w8',
  },
  {
    id: 'Uber-LUX-789',
    title: 'UberX',
    multiplier: 1.75,
    image: 'https://links.papareact.com/7pf',
  },
];

const SURGE_CHARGE_RATE = 1.5;
export default function RideOptionsCard() {
  const [selected, setSelected] = useState<any>(null);
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const travelTimeInformation = useSelector(selectTravelTimeInformation);
  return (
    <SafeAreaView className="bg-white flex-grow">
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('NavigateCard');
          }}
          className="absolute z-50 top-3 left-5 p-3 rounded-full">
          <Icon name="chevron-left" type="fontawesome" />
        </TouchableOpacity>
        <Text className="text-center py-5 text-xl">
          Select a Ride - {travelTimeInformation?.distance.text}
        </Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item: {id, title, multiplier, image}, item}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setSelected(item);
              }}
              className={`flex-row justify-between items-center px-10 ${
                id === selected?.id && 'bg-gray-200'
              }`}>
              <Image
                style={{width: 80, height: 80, resizeMode: 'contain'}}
                source={{uri: image}}
              />
              <View className="ml-6">
                <Text className="text-xl font-semibold">{title}</Text>
                <Text>{travelTimeInformation?.duration.text}</Text>
              </View>
              <Text className="text-xl">
                {new Intl.NumberFormat('en-gb', {
                  style: 'currency',
                  currency: 'GBP',
                }).format(
                  (travelTimeInformation?.duration.value *
                    SURGE_CHARGE_RATE *
                    multiplier) /
                    100,
                )}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
      <View>
        <TouchableOpacity
          disabled={!selected}
          className={`bg-black py-3 m-3 ${!selected && 'bg-gray-300'}`}>
          <Text className="text-center text-white text-xl">
            Choose {selected?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
