import {Button, Flex, Text} from '@react-native-material/core';
import Icon from 'react-native-vector-icons/AntDesign';
import {View} from 'react-native';
import {styles} from './UserItem.styles';
import {UserItemModel} from '../../models/UserItemModel';

interface UserItemProps {
  user: UserItemModel;
  editUserHandler: () => void;
  deleteUserHandler: () => void;
}

export function UserItem({
  user,
  editUserHandler,
  deleteUserHandler,
}: UserItemProps) {
  return (
    <View style={styles.container}>
      <Flex>
        <Text variant="h6">{user.name} </Text>

        <Text variant="subtitle2">{user.description||`no description for user ${user.email} `}</Text>
      </Flex>
      <Flex direction={'row-reverse'}>
        <Button
          style={styles.button}
          color={'error'}
          title={'Delete'}
          onPress={deleteUserHandler}
          trailing={<Icon size={30} color={'white'} name={'delete'} />}
        />
        <Button
          style={styles.button}
          color={'primary'}
          title={'Edit'}
          onPress={editUserHandler}
          trailing={<Icon size={30} color={'white'} name={'edit'} />}
        />
      </Flex>
    </View>
  );
}
