import {View} from 'react-native';
import {styles} from '../UserItem/UserItem.styles';
import {Button, Flex, Text} from '@react-native-material/core';
import Icon from 'react-native-vector-icons/AntDesign';
import {LocationModel} from '../../models/LocationModel';
interface LocationItemProps {
  location: LocationModel;
  deleteLocationHandler: () => void;
}
export function LocationItem({
  location,
  deleteLocationHandler,
}: LocationItemProps) {
  return (
    <View style={styles.container}>
      <Flex>
        <Text variant="h6">{location.name} </Text>

        <Text variant="subtitle2">
          {location.lng}/{location.lat}{' '}
        </Text>
      </Flex>
      <Flex direction={'row-reverse'}>
        <Button
          style={styles.button}
          color={'error'}
          title={'Delete'}
          onPress={deleteLocationHandler}
          trailing={<Icon size={30} color={'white'} name={'delete'} />}
        />
      </Flex>
    </View>
  );
}
