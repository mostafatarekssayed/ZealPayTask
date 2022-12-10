import {UserItem} from '../../components/UserItem/UserItem';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import { LISTLOCATION, LISTUSERS, pages } from "../../contsants/constants";
import {listUsers, deleteUser} from '../../Services/UserService';
import {UserItemModel} from '../../models/UserItemModel';
import {ActivityIndicator, ScrollView, View} from 'react-native';
import { Button, Flex, Pressable, Text } from "@react-native-material/core";
import Icon from 'react-native-vector-icons/Ionicons';
import {LocationModel} from '../../models/LocationModel';
import { listLocations } from "../../Services/LocationService";
import { usersStyles } from "./Users.styles";

export function Users({navigation}) {
  const {data, isLoading} = useQuery({
    queryKey: LISTUSERS,
    queryFn: listUsers,
    enabled: true,
  });
  const locationsData = useQuery({
    queryKey: LISTLOCATION,
    queryFn: listLocations,
    enabled: true,
  });

  const queryClient = useQueryClient();
  const deleteMutation = useMutation((email: string) => deleteUser(email), {
    onSuccess: () => {
      queryClient.invalidateQueries(LISTUSERS);
    },
  });
  const editUserHandler = (email: string, name: string) => {
    return () => {
      navigation.navigate(`${pages.USER_MODIFY}`, {email, name});
    };
  };
  const deleteUserHandler = (email: string) => {
    return async () => {
      await deleteMutation.mutate(email);
    };
  };
  const addNewUser = () => {
    navigation.navigate(pages.USER_MODIFY);
  };
  const gotoDetails = (email, name) => {
    navigation.navigate(pages.USER_Details, {name, email});
  };
  const Users = () => {
    if (data && data.data.users.length) {
      console.log('data is', data);
      return data.data.users.map((user: UserItemModel) => (
        <Pressable  onPress={() => gotoDetails(user.email, user.name)} key={`pressable_${user.id}`}>
          <UserItem
            key={`userItem_${user.id}`}
            user={user}
            editUserHandler={editUserHandler(user.email, user.name)}
            deleteUserHandler={deleteUserHandler(user.email)}
          />
        </Pressable>
      ));
    } else {
      return <Text> No current users</Text>;
    }
  };

  return (
    <View>
      <Button
        variant={'text'}
        title={'Add new User'}
        onPress={addNewUser}
        leading={_ => <Icon size={24} name={'add'} />}
      />
      <Flex content={"end"} justify={"end"}  direction={"column"} >


      {locationsData.data?<Text style={usersStyles.countText} variant={"h6"} >
        Locations# {locationsData.data.data.locations.length}
      </Text>:<></>}
      {data?<Text style={usersStyles.countText} variant={"h6"} >
        Users# {data.data.users.length}
      </Text>:<></>}
      </Flex>
      <ScrollView contentContainerStyle={{paddingVertical: 64}}>
        {isLoading ? <ActivityIndicator /> : <Users />}
      </ScrollView>
    </View>
  );
}
