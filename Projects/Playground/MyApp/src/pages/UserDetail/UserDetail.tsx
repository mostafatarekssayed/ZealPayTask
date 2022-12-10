import {useMutation, useQuery, useQueryClient} from 'react-query';
import * as LocationService from '../../Services/LocationService';
import {ActivityIndicator, ScrollView, View} from 'react-native';
import {LocationList} from '../../components/LocationList/LocationList';

import {Button, Flex, Text} from '@react-native-material/core';
import Icon from 'react-native-vector-icons/AntDesign';
import {LISTLOCATION} from '../../contsants/constants';
import {LocationModel} from '../../models/LocationModel';

export function UserDetail({route}) {
  const queryClient = useQueryClient();
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

  const addLocationMutation = useMutation(
    ({email, data}: {email: string; data: LocationModel}) =>
      LocationService.addLocationToUser(email, data.lat, data.lng, data.name),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(
          `${LISTLOCATION}${route.params ? route.params.email : ''}`,
        );
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
      },
    },
  );
  const deleteLocationHandler = id => {
    deleteLocationMutation.mutate(id);
  };
  const addlocationHandler = (data: LocationModel) => {
    addLocationMutation.mutate({email:route.params.email, data});
  };
  return (
    <View style={{padding: 16}}>
      <Flex>
        <Text variant="h6">{route.params.name} </Text>

        <Text variant="subtitle2">{route.params.email}</Text>
      </Flex>
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
    </View>
  );
}
