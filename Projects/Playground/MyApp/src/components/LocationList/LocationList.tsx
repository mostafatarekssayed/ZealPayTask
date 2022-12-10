import {
  Button,
  IconButton,
  Stack,
  Text,
  TextInput,
} from '@react-native-material/core';
import Icon from 'react-native-vector-icons/Ionicons';
import {FlatList, Modal, ScrollView, View} from 'react-native';
import {LocationModel} from '../../models/LocationModel';
import {LocationItem} from '../LocationItem/LocationItem';
import {useState} from 'react';
interface LocationListProps {
  locations: LocationModel[];
  addLocationHandler: (data: LocationModel) => void;
  deleteLocationHandler: (id: string) => void;
}
export function LocationList({
  locations,
  addLocationHandler,
  deleteLocationHandler,
}: LocationListProps) {
  const [openModel, setOpenModel] = useState(false);
  const [locationName, setLocationName] = useState('');
  const [locationLat, setLocationLat] = useState('');
  const [locationLng, setLocationLng] = useState('');
  const openinputModel = () => {
    setOpenModel(true);
  };
  const addLocation = () => {
    addLocationHandler({
      name: locationName,
      lat: Number(locationLat),
      lng: Number(locationLng),
    });
    setOpenModel(false);
  };
  return (
    <View>
      <Text variant={'h6'}>Locations</Text>
      <Button
        variant={'text'}
        leading={_ => <Icon size={24} name={'add'} />}
        onPress={openinputModel}
        title={'Add location'}
      />
      {locations.length == 0 ? (
        <Text>No locations</Text>
      ) : (
        locations.map((item: LocationModel) => (
          <LocationItem
            key={`loaction_${item.id}`}
            location={item}
            deleteLocationHandler={() => {
              if (item.id != null) {
                deleteLocationHandler(item.id);
              }
            }}
          />
        ))
      )}

      <Modal visible={openModel}>
        <View style={{flex: 1}}>
          <Stack spacing={5} style={{margin: 16}}>
            <TextInput
              label="Name"
              value={locationName}
              onChangeText={setLocationName}
              leading={_ => <Icon name={'location'} />}
            />
            <TextInput
              label="lat"
              keyboardType={'decimal-pad'}
              value={String(locationLat)}
              onChangeText={setLocationLat}
              leading={_ => <Icon name={'location'} />}
            />
            <TextInput
              label="lng"
              keyboardType={'decimal-pad'}
              value={String(locationLng)}
              onChangeText={setLocationLng}
              leading={_ => <Icon name={'location'} />}
            />
            <Button title={'Add'} onPress={addLocation} />
          </Stack>
        </View>
      </Modal>
    </View>
  );
}
