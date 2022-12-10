import Icon from "react-native-vector-icons/AntDesign";
import { Pressable } from "react-native";
import EncryptedStorage from "react-native-encrypted-storage";
import { pages } from "../../contsants/constants";
import { useNavigation } from "@react-navigation/native";

export function Logout() {
  const navigation=useNavigation();
  const logout =async () => {
   await EncryptedStorage.clear()
    navigation.reset({index: 0, routes: [{name: pages.LOGIN}]});
  }
  return (
    <Pressable style={{padding:12}} onPress={logout}>
    <Icon size={24} name={"logout"}  />
    </Pressable>
  );
}
