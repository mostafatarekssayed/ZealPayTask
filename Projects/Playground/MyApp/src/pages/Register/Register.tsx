import {View} from 'react-native';
import {
  Button,
  IconButton,
  Snackbar,
  Stack,
  TextInput,
} from '@react-native-material/core';
import Icon from 'react-native-vector-icons/Ionicons';
import {styles} from './Register.styles';
import {useState} from 'react';
import * as AuthService from '../../Services/AuthService';
import { pages } from "../../contsants/constants";

export function Register({navigation}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const register = async () => {
    try {
      let result = await AuthService.register(name, email, password);
      await AuthService.updateToken(result.data.token);
      navigation.reset({index: 0, routes: [{name: pages.USERS}]});
    } catch (e) {
      setIsError(true);
      setErrorMessage(e.response.data.error);
    }
  };
  return (
    <View style={styles.container}>
      <Stack spacing={5} style={{margin: 16}}>
        <TextInput
          label="Name"
          value={name}
          onChangeText={text => setName(text)}
          leading={props => <Icon name={'person'} />}
        />
        <TextInput
          label="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          leading={props => <Icon name={'mail'} />}
        />
        <TextInput
          label="password"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
          leading={props => <Icon name={'lock-closed'} />}
          trailing={props => (
            <IconButton icon={props => <Icon name={'eye'} />} />
          )}
        />
        <Button title={'Register'} onPress={register} />
      </Stack>
      {error ? (
        <Snackbar
          message={errorMessage}
          style={{position: 'absolute', start: 16, end: 16, bottom: 16}}
        />
      ) : null}
    </View>
  );
}
