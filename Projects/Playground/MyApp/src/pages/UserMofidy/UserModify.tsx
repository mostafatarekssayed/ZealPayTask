import {ActivityIndicator, ScrollView, View} from 'react-native';
import {styles} from '../Register/Register.styles';
import {Button, Stack, Text, TextInput} from '@react-native-material/core';
import Icon from 'react-native-vector-icons/Ionicons';
import {LocationModel} from '../../models/LocationModel';
import * as LocationService from '../../Services/LocationService';
import * as UserService from '../../Services/UserService';
import {LocationList} from '../../components/LocationList/LocationList';
import {useState} from 'react';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {UserInfo} from '../../models/UserInfo';
import {LISTLOCATION, LISTUSERS, pages} from '../../contsants/constants';
export function UserModify({route, navigation}) {
  const [userLocation, setUserLocation] = useState<LocationModel[]>([]);
  const [userEmail, setUserEmail] = useState(
    route.params ? route.params.email : '',
  );

  const [userName, setUserName] = useState(
    route.params ? route.params.name : '',
  );
  let addlocationHandler: any;
  let submitHandler: any;
  const mutation = useMutation((data: UserInfo) => submitHandler(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(LISTUSERS);
    },
  });
  const addLocationMutation = useMutation(
    ({email, data}: {email: string; data: LocationModel}) =>
      LocationService.addLocationToUser(email, data.lat, data.lng, data.name),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(
          `${LISTLOCATION}${route.params ? route.params.email : ''}`,
        );
        queryClient.invalidateQueries(LISTLOCATION);
      },
    },
  );
  const deleteLocationMutation = useMutation(
    (id: string) => LocationService.deleteLocation(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(
          `${LISTLOCATION}${route.params ? route.params.email : ''}`,
        );
        queryClient.invalidateQueries(LISTLOCATION);
      },
    },
  );
  const deleteLocationHandler = id => {
    deleteLocationMutation.mutate(id);
  };

  const {data, isLoading} = useQuery(
    `${LISTLOCATION}${route.params ? route.params.email : ''}`,
    () => {
      if (route.params) {
        return LocationService.listUserLocation(route.params.email);
      } else {
        return {data: {locations: []}};
      }
    },
  );

  if (route.params) {
    let email: string = route.params.email;
    addlocationHandler = (data: LocationModel) => {
      addLocationMutation.mutate({email, data});
    };
    submitHandler = (data: UserInfo) => {
      return UserService.patchUser(data.name, data.email, data.locations);
    };
    // getUserLocations.mutate(email);
  } else {
    addlocationHandler = (location: LocationModel) => {
      // setUserLocation([...userLocation, data]);
      data.data.locations.push(location);
    };
    submitHandler = (data: UserInfo) => {
      return UserService.addUser(data.name, data.email, data.locations);
    };
  }

  const queryClient = useQueryClient();
  const submit = async () => {
    mutation.mutate({
      name: userName,
      email: userEmail,
      locations: data ? data.data.locations : [],
    });
    await queryClient.invalidateQueries(LISTUSERS);
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <Stack spacing={5} style={{margin: 16}}>
        <TextInput
          label="Name"
          value={userName}
          onChangeText={setUserName}
          leading={_ => <Icon name={'person'} />}
        />
        <TextInput
          value={userEmail}
          onChangeText={setUserEmail}
          label="Email"
          leading={_ => <Icon name={'mail'} />}
        />
      </Stack>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <ScrollView>
          <LocationList
            locations={data.data.locations}
            addLocationHandler={addlocationHandler}
            deleteLocationHandler={deleteLocationHandler}
          />
        </ScrollView>
      )}
      <Button title={'Submit'} onPress={submit} />
    </View>
  );
}
