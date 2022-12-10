import {KeyboardAvoidingView, View} from 'react-native';
import {styles} from './Login.styles';
import {
  Stack,
  IconButton,
  TextInput,
  Button,
  Text, Snackbar,
} from "@react-native-material/core";
import Icon from 'react-native-vector-icons/Ionicons';
import { AdminKey, pages } from "../../contsants/constants";
import * as AuthService from "../../Services/AuthService";
import { useEffect, useState } from "react";
import EncryptedStorage from "react-native-encrypted-storage";
import { updateToken } from "../../Services/AuthService";

export function Login({navigation}) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const register = () => {
    navigation.navigate(pages.REGISTER);
  };

  useEffect( ()=>{
   ( async ()=>{
      let token = await EncryptedStorage.getItem(AdminKey)
     if(token){
       await updateToken(token);
       navigation.reset({index: 0, routes: [{name: pages.USERS}]});
     }
    })();
  },[])

  const login = async () => {
    try {
      let result = await AuthService.login(email, password);
      await AuthService.updateToken(result.data.token);
      navigation.reset({index: 0, routes: [{name: pages.USERS}]});
    } catch (e) {
      setIsError(true);
      setErrorMessage(e.response.data.error);
    }
  };
  return (
    <View style={styles.container}>
      <KeyboardAvoidingView>
        <Stack spacing={15}>
          <TextInput
            placeholder={'write your email'}
            value={email}
            onChangeText={setEmail}
            leading={props => <Icon size={24} name={'person'} />}
          />
          <TextInput
            placeholder={'write your passwrod'}
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
            leading={props => <Icon size={24} name={'lock-closed'} />}
            trailing={props => (
              <IconButton
                icon={props => <Icon size={16} name={'eye'} />}

              />
            )}
          />
          <Button title={'Login'} onPress={login} />
        </Stack>
        <Text style={styles.register_text} onPress={register}>
          Register
        </Text>
      </KeyboardAvoidingView>
      {error ? (
        <Snackbar
          message={errorMessage}
          style={{position: 'absolute', start: 16, end: 16, bottom: 16}}
        />
      ) : null}
    </View>
  );
}
