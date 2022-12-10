import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {pages} from '../contsants/constants';
import {Login} from '../pages/Login/Login';
import {Register} from '../pages/Register/Register';
import {Users} from '../pages/Users/Users';
import {UserDetail} from '../pages/UserDetail/UserDetail';
import {AddLocation} from '../pages/AddLocation/AddLocation';
import {UserModify} from '../pages/UserMofidy/UserModify';
import { Logout } from "../components/Logout/Logout";


const Stack = createStackNavigator();
export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={pages.LOGIN} >
        <Stack.Screen name={pages.LOGIN} component={Login} />
        <Stack.Screen name={pages.REGISTER} component={Register} />
        <Stack.Screen name={pages.USERS} component={Users} options={{ headerRight: () => (<Logout />) }}/>
        <Stack.Screen name={pages.USER_Details} component={UserDetail} />
        <Stack.Screen name={pages.USER_MODIFY} component={UserModify} />
        <Stack.Screen name={pages.ADD_LOCATION} component={AddLocation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
